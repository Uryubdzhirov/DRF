import React from "react";
import {Link} from 'react-router-dom'

const ToDoItem = ({todo, deleteToDo}) => {
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.create}
            </td>
            <td>
                {todo.update}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.creator}
            </td>
            <td>
                <button onClick={() => deleteToDo(todo.id)} type="button">Delete</button>
            </td>
        </tr>
    )
}

const ToDoList = ({todos, deleteToDo}) => {
    return (
        <div>
            <table>
                <tr>
                    <th>
                        ID
                    </th>

                    <th>
                        Text
                    </th>

                    <th>
                        Create
                    </th>

                    <th>
                        Update
                    </th>
                    <th>
                        Project
                    </th>
                    <th>
                        Creator
                    </th>
                    <th></th>
                </tr>
                {todos.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo}/>)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}

export default ToDoList
