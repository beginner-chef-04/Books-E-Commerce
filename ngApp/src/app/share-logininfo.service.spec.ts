import { TestBed, inject } from '@angular/core/testing';

import { ShareLogininfoService } from './share-logininfo.service';

describe('ShareLogininfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareLogininfoService]
    });
  });

  it('should be created', inject([ShareLogininfoService], (service: ShareLogininfoService) => {
    expect(service).toBeTruthy();
  }));
});
