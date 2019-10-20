'use strict'
// let url = "https://api.myjson.com/bins/rty5e";

function loadJSON(urlJSON, cbOk, cbErr) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
   
    // 2. Configurar: PUT actualizar archivo
    xhr.open('GET', urlJSON);
   
    // 4. Enviar solicitud
    xhr.send();
   
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            // alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            // ejecutar algo si error
            cbErr(xhr);
        } else {
            let datos = JSON.parse(xhr.response); //esta es la línea que hay que probar
            
            // Ejecutar algo si todo está correcto
            // console.log(datos); // Significa que fue exitoso
            cbOk(datos);
        }
    };
}

//se debe mandar siempre todo el arreglo de alumnos porque reemplaza el anterior archivo por el nuevo
function guardarEnJSON(datos, url, cbOk, cbErr) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open('PUT', url);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    // 4. Enviar solicitud al servidor
    xhr.send([JSON.stringify(datos)]);
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            cbErr(xhr);
           
        } else {
            console.log(xhr.responseText); // Significa que fue exitoso
            cbOk();
        }
    };
}