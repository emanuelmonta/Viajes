export function calcularCostoPaquete(precioBase, tipoPaquete){
    let precioFinal
    if (tipoPaquete === "unico"){
        precioFinal = alert("El precio del paquete es: " + precioBase)
    }else if (tipoPaquete === "combo"){
        let cargoFijo = 500000
        precioFinal = alert ("El precio de su paquete es: " + precioBase + cargoFijo)
    }
    return precioFinal
}