import { ActivosFijos } from "./activos-fijos";
import { CostoAdministrativo } from "./costo-administrativo";
import { CostoDirecto } from "./costo-directo";
import { CostoIndirecto } from "./costo-indirecto";
import { Ingreso } from "./ingreso";
import { Project } from "./project";

export interface FullProjectInfo {
  project: Project,
  activosFijosList:ActivosFijos[],
  costosAdministrativosList:CostoAdministrativo[],
  costosDirectosList:CostoDirecto[],
  costosIndirectosList:CostoIndirecto[],
  ingresosList:Ingreso[],
}
