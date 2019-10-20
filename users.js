'use strict'
let usuarios = [];
let contM = 0;
let contH = 1;
let idControl = 0;
let url = "https://api.myjson.com/bins/n0vlo";

function initData() {
    loadJSON(url, cbOk, cbErr);
}

function cbOk(response) { //este es el cbOK
    usuarios = response; //guarda los datos en el arreglo usuarios
    // console.log(usuarios[0]);
    // document.getElementById('info').innerHTML = usuarios[0].nombre;
    userListToHTML(usuarios);
    // console.log(usuarios);
    addUser("Jazmin", "Jasmiq", "jaztea@aguacateJaz.mx","Jamon","2019-09-09", "M");
    addUser("adios", "bbbb", "fdbv","dfvfbb","2000-10-15", "H");
    addUser("hola","aaaa","123","456","1990-05-16","M");
    // sortUsers(sortByLastName);
    // findUsers(undefined), undefined, undefined, '1990-01-01', '2019-01-01');
    // console.log(usuarios);
}

function cbErr(xhr){
    alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
}

function saveUsers() {
    guardarEnJSON(usuarios, url, saveOk, saveErr);
}

function saveOk() {
    // console.log(response);
    document.getElementById('messages').innerHTML =
    `<img src="http://2.bp.blogspot.com/-z0gaGgd70qg/UTkk0hBmOkI/AAAAAAAAGH4/0B1DYDLDLOo/s1600/open-english.jpg" alt="eeexito" height = "200px">`;
}

function saveErr(xhr) {
    alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
    document.getElementById('messages').innerHTML = `<p>SAVE ERROR</p>`;
}

function userToHTML(user) {
    let sResultado = `<div class="media">
        <a class="d-flex align-self-center" href="#">
            <img src="${user.image}" alt="">
        </a>
        <div class="media-body">
            <h5>${user.nombre + " " + user.apellidos}</h5>
            <p>${user.email}</p>
            <p>${user.fecha}</p>
        </div>
        <div class="media-right align-self-center">
            <div class="row">
                <a href="#" class="btn btn-primary edit"><i class="fas fa-search edit  "></i></a>
            </div>
            <div class="row">
                <a href="#" class="btn btn-primary mt-2"><i class="fas fa-pencil-alt edit  "></i></a>
            </div>
            <div class="row">
                <a href="#" class="btn btn-primary mt-2"><i class="fas fa-trash-alt  remove "></i></i></a>
            </div>
        </div>
    </div>
    `;
    
    // document.getElementById('info').innerHTML = sResultado;
    return sResultado;
}

function userListToHTML(usuarios) {
    let usuario = usuarios.map(function(user) { //recorre toda la lista con map y retorna un nuevo arreglo
        return userToHTML(user);
    });
    document.getElementById('info').innerHTML = usuario.join('');
    // usuarios.forEach(user => {
    //     userToHTML(user);
    // });
}


function addUser(nombre, apellidos, email, password, fecha, sexo) {
    if(usuarios.find(function(user) {
        return user.email == email;
    }) === undefined) { //si no hay email repetido...
        idControl++;
        let uid = idControl;
        usuarios.push({
            "id": uid,
            "nombre": nombre,
            "apellidos": apellidos,
            "email": email,
            "password": password,
            "fecha": fecha,
            "sexo": sexo,
            "image": "https://randomuser.me/api/portraits/" + (sexo == 'H' ? '': "wo") + "men/" + (sexo == 'H' ? contH : contM) + ".jpg"
        });
        if(sexo == 'H') {contH++;}
        else {contM++;}
        // console.log(usuarios);
        userListToHTML(usuarios);
    }
}

function updateUser(id, obj) {
    let index = usuarios.findIndex((user) => user.id == id); //encuentra el indice en el arreglo de usuarios
    if(index == -1) {return;}
    let usuario = Object.assign(usuarios[index], obj); //cambia los valores
    usuario.id = id; //para asegurarnos de que el id no cambie
    usuarios[index] = usuario; //asigna los nuevos datos en el arreglo
    userListToHTML(usuarios);
}

function deleteUser(id) {
    let index = usuarios.findIndex((user) => user.id == id); //encuentra el indice en el arreglo de usuarios
    if(index == -1) {return}
    usuarios.splice(index, 1);
    userListToHTML(usuarios);
}

function sortUsers(cb) {
    usuarios.sort(cb);
    userListToHTML(usuarios);
}

function findUsers(nombre, email, sexo, fechaIni, fechaFin) {
    let users = usuarios;
    if(nombre != undefined) {
        users = users.filter(element => element.nombre.toUpperCase().includes(nombre.toUpperCase()) ||
                                        element.apellidos.toUpperCase().includes(nombre.toUpperCase()));
    }
    if(email != undefined) {
        users = users.filter(element => element.email.toUpperCase().includes(email.toUpperCase()));
    }
    if(sexo != undefined) {
        users = users.filter(element => element.sexo == sexo);
    }
   if(fechaIni != undefined && fechaFin == undefined) { //despues de fechaIni
        users = users.filter(element => Date.parse(element.fecha) >= Date.parse(fechaIni));
   } else if(fechaIni == undefined && fechaFin != undefined) { //antes o igual de fechaFin
        users = users.filter(element => Date.parse(element.fecha) <= Date.parse(fechaFin));
   } else if(fechaIni != undefined && fechaFin != undefined) { //entre fechaIni y fechaFin
        users = users.filter(element => Date.parse(element.fecha) >= Date.parse(fechaIni) &&
                                        Date.parse(element.fecha) <= Date.parse(fechaFin));
   }
    userListToHTML(users);
}

//sorts
function sortByID(a,b) {
    return a.id - b.id;
}
function sortByName(a,b) {
    if(a.nombre.toLowerCase() < b.nombre.toLowerCase()) {return -1}
    else if(a.nombre.toLowerCase() > b.nombre.toLowerCase()) {return 1}
    else {return 0}
}
function sortByLastName(a,b) {
    if(a.apellidos.toLowerCase() < b.apellidos.toLowerCase()) {return -1}
    else if(a.apellidos.toLowerCase() > b.apellidos.toLowerCase()) {return 1}
    else {return 0}
}
function sortByEmail(a,b) {
    if(a.email.toLowerCase() < b.email.toLowerCase()) {return -1}
    else if(a.email.toLowerCase() > b.email.toLowerCase()) {return 1}
    else {return 0}
}
function sortByDate(a,b) {
    if(a.fecha.toLowerCase() < b.fecha.toLowerCase()) {return -1}
    else if(a.fecha.toLowerCase() > b.fecha.toLowerCase()) {return 1}
    else {return 0}
}
function sortBySex(a,b) {
    if(a.sexo < b.sexo) {return -1}
    else if(a.sexo > b.sexo) {return 1}
    else {return 0}
}

initData();
setTimeout(() => {
    saveUsers();    
}, 1000);
