import { TestBed } from '@angular/core/testing';

import { GetUserIdService } from './get-user-id.service';

describe('GetUserIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUserIdService = TestBed.get(GetUserIdService);
    expect(service).toBeTruthy();
  });
});
