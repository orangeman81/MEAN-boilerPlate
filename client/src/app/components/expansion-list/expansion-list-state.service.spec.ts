import { TestBed } from '@angular/core/testing';

import { ExpansionListState } from './expansion-list-state.service';

describe('ExpansionListStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpansionListState = TestBed.get(ExpansionListState);
    expect(service).toBeTruthy();
  });
});
