import React from "react";

const ToDoItem = ({todo}) => {
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
        </tr>
    )
}

const ToDoList = ({todos}) => {
    return (
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
            </tr>
            {todos.map((todo) => <ToDoItem todo={todo} />)}
        </table>
    )
}

export default ToDoList