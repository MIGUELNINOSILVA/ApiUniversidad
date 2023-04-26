const contentTable = document.querySelector('#contentTable');
const titleTable = document.querySelector('#titleTable');
const exampleModalLabel = document.querySelector('#exampleModalLabel');
const modalBody = document.querySelector('.modal-body');


function insertDataTable(info) {
    console.log(info);
    info.forEach(dato => {
        const {id_usuario, cedula, nombre, programa, jornada, sexo} = dato;
        const titles = document.createElement('tr');
        titles.innerHTML = `
            <td>${id_usuario}</td>
            <td>${cedula}</td>
            <td>${nombre}</td>
            <td>${programa}</td>
            <td>${jornada}</td>
            <td>${sexo}</td>
            <td><button class="btn btn-primary" onclick="mostrarModal('${id_usuario}','${nombre}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Detalle</button></td>
        `;
        contentTable.appendChild(titles)
    });
}


async function mostrarModal(id, name) {
    exampleModalLabel.textContent = `${name}`
    const response = await fetch(`https://vermenmasterchief.tk/detalleEstudiante.php?api_key=Metallica&id_usuario=${id}`);
    const data = await response.json();
    if(data.datos[0].promedio >= '3.0'){
        modalBody.innerHTML = `
        <img src="${data.datos[0].foto}">
        <h2>Promedio : ${data.datos[0].promedio}</h2>
        <h2>Sisben : ${data.datos[0].sisben}</h2>
        <div class="alert alert-success" role="alert">
            Has pasado
        </div>
    `
    }else{
        modalBody.innerHTML = `
        <img src="${data.datos[0].foto}">
        <h2>Promedio : ${data.datos[0].promedio}</h2>
        <h2>Sisben : ${data.datos[0].sisben}</h2>
        <div class="alert alert-danger" role="alert">
            Has perdido
        </div>
    `
    }
    
}



async function getData() {
    const response = await fetch('https://vermenmasterchief.tk/estudiantes.php');
    const data = await response.json();
    insertDataTable(data.datos);
}



document.addEventListener('DOMContentLoaded', getData);