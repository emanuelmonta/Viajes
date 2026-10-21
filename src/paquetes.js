export function calcularCostoPaquete(precioBase, tipoPaquete){
    let precioFinal
    if (tipoPaquete === "unico"){
        precioFinal = precioBase
    }else if (tipoPaquete === "combo"){
        let cargoFijo = 500000
        precioFinal = parseFloat(precioBase) + parseFloat(cargoFijo)
    }
    return precioFinal
}