import { TestBed } from '@angular/core/testing';

import { CostoAdministrativoService } from './costo-administrativo.service';

describe('CostoAdministrativoService', () => {
  let service: CostoAdministrativoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostoAdministrativoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
