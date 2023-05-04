import { TestBed } from '@angular/core/testing';

import { CostoIndirectoService } from './costo-indirecto.service';

describe('CostoIndirectoService', () => {
  let service: CostoIndirectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostoIndirectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
