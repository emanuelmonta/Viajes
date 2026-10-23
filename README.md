# Revisión y Diagnóstico del Código

Este documento explica las razones por las cuales el programa no funciona correctamente y devuelve `NaN` al momento de ejecutarse, señalando los puntos exactos del código donde se originan los fallos y cómo corregirlos.

---

## 1. La causa directa del `NaN`

El valor `NaN` (*Not a Number*) se produce porque se está intentando convertir un valor `undefined` a número mediante `parseFloat()`. El error ocurre en la siguiente secuencia de llamadas:

### A. Llamada con argumentos incompletos
En el archivo `src/cotizador.js` (línea 7):

```javascript
// src/cotizador.js: línea 7
tipoPaquete = calcularCostoPaquete(tarifaBase)
```

La función `calcularCostoPaquete` fue declarada para recibir **dos parámetros**: `(precioBase, tipoPaquete)`:

```javascript
// src/paquetes.js: línea 1
export function calcularCostoPaquete(precioBase, tipoPaquete){
```

Al invocarla pasando solo `tarifaBase`, el parámetro `tipoPaquete` entra con valor `undefined`.

---

### B. Condicionales no evaluados y retorno `undefined`
En el archivo `src/paquetes.js` (líneas 1 a 9):

```javascript
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
```

Como `tipoPaquete` es `undefined`:
1. No entra en `if (tipoPaquete === "unico")`.
2. No entra en `else if (tipoPaquete === "combo")`.
3. La variable `precioFinal` nunca recibe un valor.
4. La función retorna `undefined`.

---

### C. Conversión de `undefined` a número
De regreso en `src/cotizador.js` (líneas 7 y 8):

```javascript
tipoPaquete = calcularCostoPaquete(tarifaBase) // tipoPaquete ahora vale undefined
subtotal = parseFloat(tarifaBase) + parseFloat(tipoPaquete)
```

En JavaScript:
- `parseFloat(undefined)` da como resultado `NaN`.
- Al sumar `tarifaBase + NaN`, la operación completa se evalúa como `NaN`.

---

## 2. Otros errores identificados en el flujo

Además del fallo que produce `NaN`, el proyecto presenta los siguientes errores de lógica y arquitectura:

### A. Error de lógica matemática en el subtotal
En `src/cotizador.js`:
```javascript
// src/cotizador.js: línea 8
subtotal = parseFloat(tarifaBase) + parseFloat(tipoPaquete)
```
Si el usuario selecciona el paquete `"combo"`, `calcularCostoPaquete()` ya le suma el cargo fijo a la tarifa base:
```javascript
// src/paquetes.js: línea 7
precioFinal = parseFloat(precioBase) + parseFloat(cargoFijo)
```
Si luego en `cotizador.js` sumas `tarifaBase + tipoPaquete`, estás cobrando la tarifa base dos veces (Tarifa + Tarifa + Cargo fijo).

---

### B. Duplicación de `prompt` para capturar el destino
El destino se le pide dos veces al usuario:
1. En `src/main.js` (líneas 13 y 15):
   ```javascript
   destino = prompt("Ingrese su destino nacional\n Bogotá\n Cartagena\n Cali");
   ```
2. Y nuevamente dentro de `src/tarifas.js` (líneas 4 y 6):
   ```javascript
   destino = prompt("Ingrese su destino nacional\n Bogotá\n Cartagena\n Cali")
   ```
`obtenerTarifaBase` ya recibe `destino` por parámetro; no debe volver a pedirlo con otro `prompt`.

---

### C. Inconsistencia de mayúsculas/minúsculas ("New York" vs "New york")
- En `src/main.js` (línea 15) está escrito `"New York"` (con **Y** mayúscula).
- En `src/tarifas.js` (línea 15) la condición compara contra `"New york"` (con **y** minúscula):
  ```javascript
  else if (destino === "New york"){
  ```
Al no coincidir de manera exacta por la diferencia de mayúsculas, la tarifa base no se asigna, `precioBase` queda `undefined` y vuelve a generar `NaN`.

---

### D. Parámetro innecesario y sobrescritura de variables
En `src/main.js` (línea 21):
```javascript
alert(cotizarTramo(tipoRuta, destino, tipoPaquete, obtenerTarifaBase));
```
Envías la función `obtenerTarifaBase` como cuarto argumento. Sin embargo, en `src/cotizador.js`:
```javascript
export function cotizarTramo(tipoRuta, destino, tipoPaquete, tarifaBase){
    let subtotal = 0
    tarifaBase = obtenerTarifaBase(tipoRuta,destino) // Se sobrescribe inmediatamente
```
Ese parámetro no es necesario porque `cotizador.js` ya importa `obtenerTarifaBase` directamente en la línea 2. Además, al usar `tarifaBase` y `tipoPaquete` para guardar resultados intermedios, sobrescribes las variables recibidas, lo cual dificulta la lectura y depuración del código.

---

## 3. Guía de solución recomendada

Para corregir estos fallos sin alterar la estructura modular:

1. **En `src/cotizador.js`**:
   - Pasa los dos argumentos correspondientes:
     ```javascript
     const costoPaquete = calcularCostoPaquete(tarifaBase, tipoPaquete);
     ```
   - Si `calcularCostoPaquete` ya devuelve el valor final con el paquete aplicado, no vuelvas a sumar la tarifa base; retorna el costo correspondiente directamente.

2. **En `src/tarifas.js`**:
   - Elimina los `prompt` internos. La función solo debe consultar el destino que recibe por parámetro.
   - Corrige la mayúscula de `"New York"` para que coincida con el menú.

3. **En `src/main.js`**:
   - Llama a `cotizarTramo` pasando únicamente los 3 datos requeridos: `(tipoRuta, destino, tipoPaquete)`.
