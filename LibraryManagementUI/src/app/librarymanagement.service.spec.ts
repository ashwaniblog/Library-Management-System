import { TestBed } from '@angular/core/testing';

import { LibrarymanagementService } from './librarymanagement.service';

describe('LibrarymanagementService', () => {
  let service: LibrarymanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibrarymanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
