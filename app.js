//Elementos

const chkUrgencia = document.getElementById('chkUrgencia');
const form = document.querySelector('form');
//const btnAgregar = document.getElementById('btnAgregar');
const btnCompletar = document.querySelector('.completar');
const lstTareasPendientes = document.getElementById('lstTareasPendientes');
const lstTareasCompletadas = document.getElementById('lstTareasCompletadas');
const templateTarea = document.getElementById('itemTareas').content;
const fragment = document.createDocumentFragment();
const appDocument = document.getElementById("app");
const areaNotificacion = document.getElementById("notificaciones");
const templateNotificacion = document.getElementById("tmpNotificacion").content;

//clases
class Tarea{
    constructor(descripcion, urgencia, estado){
        this.descripcion = descripcion;
        this.urgencia = urgencia;
        this.estado = "Pendiente";
    }
}

class UI{
    agregarTarea(tarea){
        templateTarea.querySelector('p').textContent = tarea.descripcion;
        const clone = templateTarea.cloneNode(true);
        fragment.appendChild(clone);
        if(!tarea.urgencia){fragment.querySelector('span').remove();}
        if(tarea.estado === "Pendiente"){
            lstTareasPendientes.appendChild(fragment);
        }else{
            lstTareasCompletadas.appendChild(fragment);
        }
        this.mostrarMensaje("Tarea agregada","exito");
    }
    limpiarFormulario(){
        document.querySelector('form').reset();
        if(chkUrgencia.value === 'true'){chkUrgencia.click();}
        document.getElementById('txtTarea').focus();
    }
    completarTarea(tarea){
        if(tarea.name === "completar"){
            console.log(tarea);
            tarea.setAttribute("class", "btn btn-success btn-sm disabled");
            lstTareasCompletadas.appendChild(tarea.parentElement);
            this.mostrarMensaje("Tarea Completada con exito","exito");
        }
        
    }
    eliminarTarea(tarea){
        if(tarea.name === "eliminar"){
            console.log(tarea);
            tarea.parentElement.remove();
            this.mostrarMensaje("Tarea eliminada","eliminada");
        }
        
    }
    mostrarMensaje(mensaje,tipo){
        templateNotificacion.querySelector('strong').textContent = mensaje;
        const clone = templateNotificacion.cloneNode(true);
        fragment.appendChild(clone);
        if(tipo === "exito"){ fragment.querySelector("div").setAttribute("class","alert alert-dismissible alert-success")}
        areaNotificacion.appendChild(fragment);
        setTimeout(()=>{
            areaNotificacion.innerHTML ="";
        },3000);

    }

}


// acciones del DOM

chkUrgencia.addEventListener("click", () => {
    
    if(chkUrgencia.value === 'true'){
        console.log("entra true");
        chkUrgencia.value = "false";
        chkUrgencia.setAttribute("class", "btn btn-success");
        chkUrgencia.innerHTML = "No Urgente";
    }else{
        console.log("entra false");
        chkUrgencia.value = "true";
        chkUrgencia.setAttribute("class", "btn btn-danger");
        chkUrgencia.innerHTML = "Urgente";
    }
})
form.addEventListener("submit",(e)=>{
    const descripcion = document.getElementById('txtTarea').value;
    const urgencia = chkUrgencia.value === "true";
    const tarea = new Tarea(descripcion,urgencia);
    const ui = new UI();
    ui.agregarTarea(tarea);
    ui.limpiarFormulario();
    e.preventDefault();
})
btnAgregar.addEventListener("click", () => {
    
})
appDocument.addEventListener("click", (e) =>{
    const ui = new UI();
    ui.completarTarea(e.target);
    ui.eliminarTarea(e.target);
})