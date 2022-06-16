import React from 'react';
import { Link } from 'react-router-dom'

const TodoItem = ({todo, deleteTodo }) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.project}</td>
            <td>{todo.created_date}</td>
            <td>{todo.creator}</td>
            <td>{todo.status}</td>
            <td>{todo.text_note}</td>
            <td><button onClick={() => deleteTodo(todo.id)} type="button">Delete</button></td>

        </tr>
    )
}


const TodoList = ({todos, deleteTodo }) => {
   return (
     <div class="container">
       <table>
           <th>id</th>
           <th>Project</th>
           <th>Created_date</th>
           <th>Creator</th>
           <th>Status</th>
           <th>Text</th>
           {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo} />)}
       </table>
       <Link to='/todos/create'>Create</Link>
     </div>
   )
}


export default TodoList
