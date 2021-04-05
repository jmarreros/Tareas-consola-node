/*
* _listado:
{ uuid-3242-24: {id:12, desc:lsdkafjlkas,completadoEn:12112}}
*/

const Tarea = require("./tarea");

class Tareas{
    _listado = {};

    constructor (){
        this._listado = {};
    }

    borrarTarea(id = ''){
        if ( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargarTareasFromArr(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }


    crearTarea(des = ''){
        const tarea = new Tarea(des);
        this._listado[tarea.id] = tarea;
    }

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    listadoCompleto(){

        let lista = this.listadoArr;
        let cad = '';
        let estado = '';

        lista.forEach( (item, index) => {
            cad = ''
            estado = ''
            if ( item.completadoEn ){
                cad = `${index + 1}`.green;
                estado = 'completado'.green
            } else {
                cad = `${index + 1}`.red;
                estado = 'pendiente'.red;
            }
            cad = cad + '::' + item.des + '|' + estado;
            console.log(cad);
        });
    }

    listarPendientesCompletadas( completadas = true ){
        let lista = this.listadoArr;
        let cad = '';
        let estado = '';

        lista.forEach( (item, index) => {
            cad = ''
            estado = ''
            if ( completadas && item.completadoEn ){
                cad = `${index + 1}`.green;
                estado = item.completadoEn.green

                cad = cad + '::' + item.des + '|' + estado;
                console.log(cad);

            } else if ( ! completadas && ! item.completadoEn ) {
                cad = `${index + 1}`.red;
                estado = 'pendiente'.red;

                cad = cad + '::' + item.des + '|' + estado;
                console.log(cad);
            }

        });
    }

    toggleCompletadas(ids = []){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( ! tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if ( ! ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;