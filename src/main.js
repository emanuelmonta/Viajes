import { cotizarTramo } from "./cotizador.js";
import { obtenerTarifaBase } from "./tarifas.js";

function mostrarMenu (){
    let tipoDestino = prompt("¿Es un viaje de Destino Único o Multidestino?");
    let tipoRuta = "";
    let destino = "";

    if (tipoDestino === "unico"){
        tipoRuta = prompt("¿Su ruta es nacional o internacional?");
        
        if (tipoRuta === "nacional"){
            destino = prompt("Ingrese su destino nacional\n Bogotá\n Cartagena\n Cali");
        } else if (tipoRuta === "internacional"){
            destino = prompt("Ingrese su destino internacional\n New York\n Paris\n Roma");
        }
        
        let tipoPaquete = prompt("¿Qué paquete desea?\n unico\n combo");
        

        alert(cotizarTramo(tipoRuta, destino, tipoPaquete,obtenerTarifaBase));
    }
}

mostrarMenu();