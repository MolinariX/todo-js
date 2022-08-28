import { Todo } from "./todo.class";

export class TodoList {

    constructor() {


        // this.todos = [];
        this.cargarLocalStorage();
        
    }

    nuevoTodo(todo) {

        this.todos.push(todo);
        this.guardarLocalStorage();

    }

    eliminarTodo(id) {

        this.todos = this.todos.filter(todo => todo.id != id);  //se va a regresar un nuevo array filtrando o quitando el todo que coincida con el id.
        this.guardarLocalStorage();

    }

    marcarCompletado(id) {


        for(const todo of this.todos) {

            if(todo.id == id) {                        //si el id es igual al id que recibo por el argumento que me cambie el valor.
                todo.completado = !todo.completado;    //ej: si el todo.completado es true, la negacion es falso y viceversa.
                this.guardarLocalStorage();
                break;                               //para salir del ciclo.
            
            }
            
        }

    }

    eliminarCompletados() {

        this.todos = this.todos.filter(todo => !todo.completado);  // me va a regresar un nuevo array filtrando o quitando todos los todos que esten completados.
        this.guardarLocalStorage();     
    }

    guardarLocalStorage() {

        localStorage.setItem('todo', JSON.stringify(this.todos));   //que me convierte mi array de todos a Json perfecto.
    }

    cargarLocalStorage(){

        this.todos = (localStorage.getItem('todo')) 
                        ? JSON.parse(localStorage.getItem('todo')) 
                        : [];

        // this.todos = this.todos.map(obj => Todo.fromJson(obj));
        this.todos = this.todos.map(Todo.fromJson); 

    }
}

