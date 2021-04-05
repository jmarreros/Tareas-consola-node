const { v4: uuidv4 } = require('uuid');

class Tarea{
    id = '';
    des = '';
    completadoEn = null;

    constructor(des){
        this.id = uuidv4();
        this.des = des;
        this.completadoEn = null;
    }

}

module.exports = Tarea;