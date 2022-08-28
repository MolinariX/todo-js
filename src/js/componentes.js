import { Todo } from '../classes';

import { todoList } from '../index';


//Referencias en el HTML
const divTodoList     = document.querySelector('.todo-list');  //obtiene el todo-list
const txtInput        = document.querySelector('.new-todo');
const btnBorrar       = document.querySelector('.clear-completed');
const ulFiltros       = document.querySelector('.filters');
const anchorFiltros   = document.querySelectorAll('.filtro'); // anchor es <a> // se selecionará todas las clases llamadas filtro 




export const crearTodoHtml = (todo) => {


    const htmlTodo = `
     <li class="${(todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
			<div class="view">
				<input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : '' }>
				<label>${todo.tarea}</label>
				<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

    const div = document.createElement('div'); //creo un elemento que mantenga esta lista ordenada
    div.innerHTML = htmlTodo; 
    
    divTodoList.append(div.firstElementChild);

	return div.firstElementChild;
}; 

//Eventos

txtInput.addEventListener('keyup', (event) => {

	if(event.keyCode === 13 && txtInput.value.length > 0) {

		console.log(txtInput.value); //lo que escriba la persona en el input
		const nuevoTodo = new Todo(txtInput.value); //se crea un nuevo todo y se le manda lo que la persona escriba en el input
		todoList.nuevoTodo(nuevoTodo);  //lo que escriba la persona se agregará al array vacio de la clase todoList

		crearTodoHtml(nuevoTodo);  //se va a disparar la funcion crearTodoHtml y me lo creará en el dom a lo que la persona escriba.
		txtInput.value = '';  // cuando la persona escriba en el input y presione enter, lo que va a pasar es que se borrará lo que se haya escrito.

	}
});

divTodoList.addEventListener('click', (event) => {

	const nombreElemento = event.target.localName;  //input, label, button.
	const todoElemento   = event.target.parentElement.parentElement;
	const todoId         = todoElemento.getAttribute('data-id'); // al elemento que seleccione me aparecerá su respectivo id.

	if(nombreElemento.includes('input') ) {  //si el nombre del Elemento incluye algo llamado input, quiere decir que hizo clic en el check que ejecute la siguiente linea de codigo.

		todoList.marcarCompletado(todoId);  //que me marque como completado el todo que tenga el todoId.
		todoElemento.classList.toggle('completed');  // esta clase me lo tacha. el todoElemento me hace referencia al todo html, y para hacer referencia a todas las clases era el classList, y para agregar o cambiar una clase utilizo el metodo toggle(), en el cual lo que mande como argumento es que si existe la quita y si no existe la agrega. en este ejemplo utilizo la clase completed.
	
	} else if(nombreElemento.includes('button')) {  // hay que borrar el todo
		
		todoList.eliminarTodo(todoId);  //me elimina lo que tengo del array pero no en el html.
		divTodoList.removeChild(todoElemento);  //para eliminar el elemento html.
	}


});


btnBorrar.addEventListener('click', () => {
		
		todoList.eliminarCompletados();

		for(let i = divTodoList.children.length - 1; i >= 0; i--) {

			const elemento = divTodoList.children[i];

			if(elemento.classList.contains('completed')) {
				divTodoList.removeChild(elemento);
			}
		}
});


ulFiltros.addEventListener('click', (event) => {

		const filtro = event.target.text;
		if(!filtro) {return;}                    // si al presionar el elemento el filtro no existe o no hay nada(undefined), que me haga un return.

		anchorFiltros.forEach(elem => elem.classList.remove('selected'));   //se van a barrer cada uno de los <a> y borrar la clase selected.
		event.target.classList.add('selected');  // se le pone la clase selected al filtro


		for(const elemento of divTodoList.children) {
			elemento.classList.remove('hidden');       //removemos la clase hidden de todos los elementos.
			const completado = elemento.classList.contains('completed'); //si esta tarea está completada.

			switch(filtro) {

				case 'Pendientes':
					if(completado) {
						elemento.classList.add('hidden');
					}
					break;

					case 'Completados':
					if(!completado) {
						elemento.classList.add('hidden');
					}
					break; 
					
			}
		}
		
} ); 
