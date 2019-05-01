import { TestBed } from '@angular/core/testing';

import { TodoStore } from './todo-store.service';

describe('TodoStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoStore = TestBed.get(TodoStore);
    expect(service).toBeTruthy();
  });
});
