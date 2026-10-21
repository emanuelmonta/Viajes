import { calcularCostoPaquete } from "./paquetes.js"; 
import { obtenerTarifaBase } from "./tarifas.js";

export function cotizarTramo(tipoRuta, destino, tipoPaquete,tarifaBase){
    let subtotal = 0
    tarifaBase = obtenerTarifaBase(tipoRuta,destino)
    tipoPaquete = calcularCostoPaquete(tarifaBase)
    subtotal = parseFloat(tarifaBase) + parseFloat(tipoPaquete)

    return subtotal
}