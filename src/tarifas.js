export function obtenerTarifaBase(tipoRuta, destino){
    let destino
    let precioBase
    if  (tipoRuta === "nacional"){
        destino = prompt("Ingrese su destino nacional\n Bogotá\n Cartagena\n Cali")
    }else if (tipoRuta === "internacional"){
        destino =  prompt("Ingrese su destino internacional\n New york\n Paris\n Roma")
    }

    if (destino === "Bogotá"){
        precioBase = 250000
    }else if (destino === "Cartagena"){
        precioBase = 400000
    } else if (destino === "Cali"){
        precioBase = 350000
    } else if (destino === "New york"){
        precioBase = 2500000
    }else if (destino === "Paris"){
        precioBase = 5000000
    } else if (destino === "Roma"){
        precioBase = 5000000
    }
    return precioBase
}

