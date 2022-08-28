import './styles.css';

import {Todo, TodoList} from './classes';
import { crearTodoHtml } from './js/componentes';




export const todoList = new TodoList();

// todoList.todos.forEach(crearTodoHtml); //el primer argumento que estamos teniedo en el callback por el forEach, está llamando el crearTodoHtml o la funcion que se especifique y el argumento que se está mandando va a ser el primer argumento que regresa al forEach.
todoList.todos.forEach(todo => crearTodoHtml(todo));




console.log('todos', todoList.todos);
