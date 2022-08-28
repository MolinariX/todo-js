export class Todo {

    static fromJson({id, tarea, completado, creado}) {
        const tempTodo = new Todo(tarea);

        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.creado     = creado;

        return tempTodo;

    }


    constructor (tarea) {
          this.tarea      = tarea; // va a ser = a lo que yo reciba como argumento
               
          this.id         = new Date().getTime();  //123484616749
          this.completado = false; // me va a decir si la tarea está completada o no lo está.
          this.creado     = new Date();  // fecha y hora actual.
    }

        imprimirClase() {
            console.log(`${this.tarea} - ${this.id}`);
        }

}