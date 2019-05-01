import { TestBed } from '@angular/core/testing';

import { AuthStore } from './auth-store.service';

describe('AuthStore', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthStore = TestBed.get(AuthStore);
    expect(service).toBeTruthy();
  });
});
