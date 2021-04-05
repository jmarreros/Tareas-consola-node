const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message : '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: '1- '.green + 'Crear tarea'
            },
            {
                value: '2',
                name: '2- '.green + 'Listar tareas'
            },
            {
                value: '3',
                name: '3- '.green + 'Listar tareas completadas'
            },
            {
                value: '4',
                name: '4- '.green + 'Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5- '.green + 'Completar tarea(s)'
            },
            {
                value: '6',
                name: '6- '.green + 'Borrar tarea'
            },
            {
                value: '0',
                name: '0- '.green + 'Salir'
            }

        ]
    }
]
const inquirerMenu = async () =>{
    console.clear();

    console.log(`=====================`.green);
    console.log(`Seleccione una opción`.white);
    console.log(`=====================\n`.green);


    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async () => {
    console.log('\n');

    await inquirer.prompt([
        {
            type:'input',
            name: 'enter',
            message: `Presione ${'Enter'.green} para continuar`
        }
    ]);
}

const leerInput = async(message) =>{
    const question = [
        {
            type: 'input',
            name: 'des',
            message,
            validate(value){
                if (value.length == 0){
                    return 'Ingresa un valor';
                }
                return true;
            }
        }
    ];

    const {des} = await inquirer.prompt(question);
    return des;
}

const listadoTareasBorrar = async( tareas = [] ) =>{

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: tarea.id,
            name : `${idx} ${tarea.des}`
        }
    });

    choices.unshift({
        value:'0',
        name:'0'.green + ' Cancelar'
    })

    const preguntas =[
        {
            type:'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);

    return id

}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}



const mostrarListadoChecklist = async( tareas = [] ) =>{

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: tarea.id,
            name : `${idx} ${tarea.des}`,
            checked: (tarea.completadoEn) ? true : false,
        }
    });

    const pregunta =[
        {
            type:'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(pregunta);

    return ids
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}