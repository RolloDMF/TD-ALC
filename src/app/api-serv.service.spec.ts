import { TestBed } from '@angular/core/testing';

import { ApiServService } from './api-serv.service';

describe('ApiServService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiServService = TestBed.get(ApiServService);
    expect(service).toBeTruthy();
  });
});
