import React from 'react';


const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.project}</td>
            <td>{todo.created_date}</td>
            <td>{todo.creator}</td>
            <td>{todo.status}</td>
            <td>{todo.text_note}</td>

        </tr>
    )
}


const TodoList = ({todos}) => {
   return (
       <table>
           <th>id</th>
           <th>Project</th>
           <th>Created_date</th>
           <th>Creator</th>
           <th>Status</th>
           <th>Text</th>

           {todos.map((todo) => <TodoItem todo={todo} />)}
       </table>
   )
}


export default TodoList
