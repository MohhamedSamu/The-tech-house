import { TestBed } from '@angular/core/testing';

import { CostoDirectoService } from './costo-directo.service';

describe('CostoDirectoService', () => {
  let service: CostoDirectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostoDirectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
