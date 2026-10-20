import { calcularCostoPaquete } from "./paquetes.js"; 
import { obtenerTarifaBase } from "./tarifas.js";

export function cotizarTramo(tipoRuta, destino, tipoPaquete){
    tarifaBase = obtenerTarifaBase(tipoRuta,destino)
    tipoPaquete = calcularCostoPaquete(tarifaBase)
    subtotal = tarifaBase + tipoPaquete

    return subtotal
}