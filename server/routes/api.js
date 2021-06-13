const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const mysql = require('mysql');

var K = null;

var mysqlconnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'books_search',
});

mysqlconnection.connect(function(err){
  if(err){
  console.error('Error connecting ..'+ err.stack);
  return;
  }
  else
  console.log('connected with id : '+ mysqlconnection.threadId);
});

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  console.log('Logged In Token Verification : '+payload.subject);
  req.userid = payload.subject;
  next()
}

router.post('/events', (req,res) => {
  console.log('Giving Result !!');
  var sql = "select name,book_name,author1,author2,edition,photo,price from `search_books`" + " where branch like '"+req.body.branch+"' and subject like '"+req.body.subject+"' and price<='"+req.body.highprice+"' and price>='"+req.body.lowprice+"';";
  mysqlconnection.query(sql,(err,rows,fields)=>{
    if(err)console.log(err);
    /*console.log(rows);*/
   /* let events = [
      {
        "_id": "1",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }]*/
    res.send(rows)
    console.log('Normal Search result Given !!');
  })

})

router.post('/specialsearch', verifyToken, (req, res) => {
  console.log('Giving Result !!');
  //console.log(req.body);
  var sql = "select name,book_name,author1,author2,edition,photo,price,subject,branch from `search_books`" + " where branch like '"+req.body.branch+"' and subject like '"+req.body.subject+"' and price<='"+req.body.highprice+"' and price>='"+req.body.lowprice+"' and name!='"+req.body.username+"';";
  mysqlconnection.query(sql,(err,rows,fields)=>{
    if(err)console.log(err);
  //console.log(rows);
   /* let events = [
      {
        "_id": "1",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }]*/
    res.send(rows)
    console.log('Special Search result Given !!');
  })
})

router.post('/specialbuy', verifyToken, (req, res) => {
  console.log('Buying Book !!');
  //console.log(req.body);

  var sql1 = "delete from `search_books`" + " where name='"+req.body.bookdetails.name+"' and book_name='"+req.body.bookdetails.book_name+"' and author1='"+req.body.bookdetails.author1+"' and edition='"+req.body.bookdetails.edition+"' and branch='"+req.body.bookdetails.branch+"' and subject='"+req.body.bookdetails.subject+"' and price='"+req.body.bookdetails.price+"';";
  mysqlconnection.query(sql1,(err,rows,fields)=>{
    if(err)console.log(err);
    else{
      console.log('removed from search table !!');   
    }
  })
  
  var sql2 = "update `book_details`" + " set `sold_status`='1'" + " where name='"+req.body.bookdetails.name+"' and book_name='"+req.body.bookdetails.book_name+"' and author1='"+req.body.bookdetails.author1+"' and edition='"+req.body.bookdetails.edition+"' and branch='"+req.body.bookdetails.branch+"' and subject='"+req.body.bookdetails.subject+"' and price='"+req.body.bookdetails.price+"';";
  mysqlconnection.query(sql2,(err,rows,fields)=>{
    if(err)console.log(err);
    else{
      console.log('Sold Status Updated !!');
    }    
  })
 // Example UPDATE `user_details` SET `balance`=`balance`-'500' WHERE name='raj'
  var sql3 = "update `user_details`" + " set `balance`=`balance`-'"+req.body.bookdetails.price+"' where name='"+req.body.username+"';";
  mysqlconnection.query(sql3,(err,rows,fields)=>{
    if(err)console.log(err);
    else{
      console.log(req.body.username +' Balance Decremented!!');
    }
  })

  var sql4 = "update `user_details`" + " set `balance`=`balance`+'"+req.body.bookdetails.price+"' where name='"+req.body.bookdetails.name+"';";
  mysqlconnection.query(sql4,(err,rows,fields)=>{
    if(err)console.log(err);
    else{
      console.log(req.body.bookdetails.name +' Balance Incremented!!');
    }
  })

  
  var sql5 = "insert into `books_bought`" + " values ('"+req.body.username+"','"+req.body.bookdetails.name+"','"+req.body.bookdetails.book_name+"');";
   mysqlconnection.query(sql5,(err,rows,fields)=>{
    if(err){
      console.log(err);
    }
    else{

      var sql_balance_return = "select balance from `user_details`" + " where name='"+req.body.username+"';";
      mysqlconnection.query(sql_balance_return,(err1,result,fields)=>{
        if(err1)console.log(err1);
        else{
          console.log('Entered in Books Bought Table !!');
          response = {bought: 'Book Bought!!', balance_return: result[0].balance};
          res.send(response)
          console.log('Transaction Complete, Book Bought !!');
        }
      })

    }
  })

})

router.post('/register', (req, res) => {
  let userData = req.body

  var sql_check = "select name from `login_user`"+ " where name='"+req.body.username+"';";
  mysqlconnection.query(sql_check,(err,rows,fields)=>{
    if(!rows.length){
      console.log('resistered account added to db');
          var sql1 = "insert into `login_user`"+ "values('"+req.body.username+"','"+req.body.password+"') ;";
        mysqlconnection.query(sql1,(err,rows,fields)=>{

        })

        var sql2 = "insert into `user_details`"+ "values('"+req.body.username+"','"+req.body.email+"','"+500+"','"+req.body.address+"') ;";
        mysqlconnection.query(sql2,(err,rows,fields)=>{
            if(!err){
              let payload = {subject: req.body.username}
              let token = jwt.sign(payload, 'secretKey')
              console.log('Secret Token Generated :');
              console.log({token});
              res.status(200).send({token})
            }
            else
            console.log('Error Hai : '+err);
        })
    }
    else{
      console.log('Registered Account Name Already Exist');

      already_exist = {already_exist: 'Username Already Exists !!'};
      console.log('b');
      console.log({already_exist});
      console.log(already_exist);
      console.log('b');
      res.send(already_exist);
    }
  })



})

router.post('/key', (req,res) => {
  var Ya = req.body.Ya
  var q = 11;
  var a = 4;
  console.log('Variable q and a  : '+q+' '+a);
  var Xb = Math.floor(Math.random()*10)+1;  //random bet. 1 to 10
  console.log('Random Xa generated : '+ Xb);
  var Yb = (a**Xb)%q;
  console.log('Yb ' +Yb);
  console.log('Ya Sent By Client ' +Ya);

  K = (Ya**Xb)%q;
  console.log('Generated Key K ' + K);
 
  res.status(200).send({Yb})

})

router.post('/login', (req, res) => {
  let userData = req.body

  var sql = "select * from `login_user` where name='"+userData.username+"';";
  var sql2 = "select * from `user_details` where name='"+userData.username+"';";

  mysqlconnection.query(sql,(err,user,fields)=>{
    if (err) {
      console.log(err)    
    }
    else {
      if (!user.length) {
        invalid_username = {invalid_username: 'Invalid Email'};
        res.send(invalid_username)
      } 
      else {
          if ( user[0].pwd !== userData.password) {
            invalid_password = {invalid_password: 'Invalid Password'};
            res.send(invalid_password)
          }
          else {
              mysqlconnection.query(sql2,(err2,user2,fields2)=>{
                if(user2.length){

                var balance = user2[0].balance
                }
                let payload = {subject: user[0].name}
                let token = jwt.sign(payload, 'secretKey')
                let username = user[0].name
                console.log('Login Username : '+username);
                console.log('Current Balance : '+user2[0].balance);                
                /*console.log(username);
                console.log({token,username});
                
                */
               console.log('Secret Token : '+token);
              
              
              
              
              
               //username+='pqrstuvwxyz';
               //Encryption Of Data

              //Username Encrpytion
               var split_username = username.split("");
               //console.log('split_username ' +split_username);
               split_username = split_username.map(function(x){return  x.charCodeAt(0)+K;});
               //console.log('split_username ' +split_username);
               var upperlimit = 122+K;
               var it;
                for (it=0;it<split_username.length;it++) {
                  if (split_username[it]>=123 && split_username[it]<=upperlimit) {
                    split_username[it]-=K;
                  } 
                }
               //console.log('split_username after for ' +split_username);
               split_username = String.fromCharCode.apply(null,split_username);
               console.log('Encrypted Username ' +split_username);

              //Balance Encryption
              var split_balance = balance.toString();
              split_balance = split_balance.split("");
              //console.log('split_balance ' +split_balance);//
              split_balance = split_balance.map(function(x){return  x.charCodeAt(0)+K;});
              //console.log('split_balance ' +split_balance);//
              
              var upperlimit = 122+K;
              var it;
               for (it=0;it<split_balance.length;it++) {
                 if (split_balance[it]>=123 && split_balance[it]<=upperlimit) {
                  split_balance[it]-=K;
                 } 
               }
               //console.log('split_balance after for ' +split_balance);//
               split_balance = String.fromCharCode.apply(null,split_balance);
               console.log('Encrypted Balance ' +split_balance);

              //Token Encryption
              var split_token = token.split("");
              split_token = split_token.map(function(x){return  x.charCodeAt(0)+K;});
              var upperlimit = 122+K;
              var it;
               for (it=0;it<split_token.length;it++) {
                 if (split_token[it]>=123 && split_token[it]<=upperlimit) {
                  split_token[it]-=K;
                 } 
               }
               split_token = String.fromCharCode.apply(null,split_token);
               console.log('Encrypted Token ' +split_token);

/*
              //Username Decrpytion
              var split_username = split_username.split("");
              //console.log('split_username ' +split_username);
              split_username = split_username.map(function(x){return  x.charCodeAt(0)-K;});
              //console.log('split_username ' +split_username);
              var lowerlimit = 123-(2*K);
              var upperlimit = 122-K;
              var it;
               for (it=0;it<split_username.length;it++) {
                 if (split_username[it]>=lowerlimit && split_username[it]<=upperlimit) {
                   split_username[it]+=K;
                 } 
               }
              //console.log('split_username after for ' +split_username);
              split_username = String.fromCharCode.apply(null,split_username);
              //console.log('Decrypted Username ' +split_username);


              //Balance Decrpytion
              var split_balance = split_balance.split("");
              //console.log('split_username ' +split_username);
              split_balance = split_balance.map(function(x){return  x.charCodeAt(0)-K;});
              //console.log('split_username ' +split_username);
              var lowerlimit = 123-(2*K);
              var upperlimit = 122-K;
              var it;
               for (it=0;it<split_balance.length;it++) {
                 if (split_balance[it]>=lowerlimit && split_balance[it]<=upperlimit) {
                  split_balance[it]+=K;
                 } 
               }
              //console.log('split_username after for ' +split_username);
              split_balance = String.fromCharCode.apply(null,split_balance);
              //console.log('Decrypted Balance ' +split_balance);


              //Token Decrpytion
              var split_token = split_token.split("");
              //console.log('split_username ' +split_username);
              split_token = split_token.map(function(x){return  x.charCodeAt(0)-K;});
              //console.log('split_username ' +split_username);
              var lowerlimit = 123-(2*K);
              var upperlimit = 122-K;
              var it;
               for (it=0;it<split_token.length;it++) {
                 if (split_token[it]>=lowerlimit && split_token[it]<=upperlimit) {
                  split_token[it]+=K;
                 } 
               }
              //console.log('split_username after for ' +split_username);
              split_token = String.fromCharCode.apply(null,split_token);
              //console.log('Decrypted Token ' +split_token);              

*/


              res.status(200).send({token,username,balance,split_username,split_balance,split_token})


              })


          }
      }
    }

  })


})


router.post('/specialupload', verifyToken,(req, res) => {
  let userData = req.body

  /*console.log(userData);*/
  console.log('Uploading...');
  
  var sql_bookdetails = "insert into `book_details`"+ " values('"+req.body.username+"','"+req.body.book_name+"','"+0+"','"+req.body.author1+"','"+req.body.author2+"','"+req.body.edition+"','"+req.body.price+"','"+req.body.subject+"','"+req.body.branch+"') ;";

  mysqlconnection.query(sql_bookdetails,(err,rows,fields)=>{
    if(err)console.log(err);
    
  })

  var sql_searchbooks = "insert into `search_books`"+ " values('"+req.body.username+"','"+req.body.book_name+"','"+req.body.author1+"','"+req.body.author2+"','"+req.body.edition+"','"+req.body.image_url+"','"+req.body.price+"','"+req.body.subject+"','"+req.body.branch+"') ;";

  mysqlconnection.query(sql_searchbooks,(err,rows,fields)=>{
    if(err)console.log(err);
    ok = {ok: 'Uploaded!!'};
    console.log('Uploaded!!');
    
    res.send(ok);

    
  })  


})


router.post('/specialviewprofilenotsold', verifyToken,(req, res) => {
  //console.log(req.body);
  //console.log('Inside View Profile 1...');

  var sql = "select * from `book_details`"+ " where name='"+req.body.username+"' and sold_status='0';";

  mysqlconnection.query(sql,(err,rows,fields)=>{
    if(err)console.log(err);
    //console.log(rows);//'View 1 fetched !!');
    res.send(rows);
  })  
})

router.post('/specialviewprofilesold', verifyToken,(req, res) => {

  //console.log(req.body);
  //console.log('Inside View Profile 2...');

  var sql = "select * from `book_details`"+ " where name='"+req.body.username+"' and sold_status='1';";

  mysqlconnection.query(sql,(err,rows,fields)=>{
    if(err)console.log(err);
    //console.log(rows);//'View 2 fetched !!');
    res.send(rows);
  })  
})

router.post('/specialviewprofilebought', verifyToken,(req, res) => {
  //console.log(req.body);
  //console.log('Inside View Profile 3...');
  //Example SELECT * FROM `book_details` WHERE `name`=any(select book_owner from `books_bought` where name='ridham') and `book_name`=any(select book_name from `books_bought` where name='ridham') 
  var sql = "select * from `book_details`"+ " where name=any(select book_owner from `books_bought` where name='"+req.body.username+"') and book_name=any(select book_name from `books_bought` where name='"+req.body.username+"');";

  mysqlconnection.query(sql,(err,rows,fields)=>{
    if(err)console.log(err);
    else{  
      //console.log(rows);
          
      console.log(rows);//'View 3 fetched !!');
      res.send(rows);

    }
  })  
})

router.post('/specialviewprofile', verifyToken,(req, res) => {
  //console.log(req.body);
  //console.log('Inside View Profile 3...');
  //Example SELECT * FROM `book_details` WHERE `name`=any(select book_owner from `books_bought` where name='ridham') and `book_name`=any(select book_name from `books_bought` where name='ridham') 
  var sql = "select * from `user_details`"+ " where name='"+req.body.username+"';";

  mysqlconnection.query(sql,(err,rows,fields)=>{
    if(err)console.log(err);
    else{  
      //console.log(rows);
          
      console.log('Profile Details Row Result : '+rows[0]);//'View 3 fetched !!');
      res.send(rows);

    }
  })  
})


module.exports = router;