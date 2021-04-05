require('colors');
const Tarea = require("./models/tarea");
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const main = async() => {
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB){
        tareas.cargarTareasFromArr(tareasDB);
    }

    do{
        // Imprimir menu
        opt = await inquirerMenu();
        console.log({opt});

        switch (opt) {
            case '1':
                const des = await leerInput('Descripción:');
                tareas.crearTarea(des);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6': //Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if ( id !== '0'){
                    const ok = await confirmar('¿Esta seguro?');
                    if ( ok ){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }

                break;
            default:
                break;
        }

        guardarDB( tareas.listadoArr );

        await pausa();

    } while ( opt !== '0');

    // // const tarea = new Tarea('Comprar comida');
    // console.log(tarea);

}

main();