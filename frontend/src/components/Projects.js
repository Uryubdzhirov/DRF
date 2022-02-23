import React from "react";
import {Link} from 'react-router-dom'

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                {project.name}
            </td>
            <td>
                {project.repository}
            </td>
            <td>
                {String(project.users)}
            </td>
            <td>
                <button onClick={() => deleteProject(project.id)} type="button">Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <table>
                <tr>
                    <th>
                        ID
                    </th>

                    <th>
                        Name
                    </th>

                    <th>
                        Repository
                    </th>

                    <th>
                        Users
                    </th>
                    <th></th>
                </tr>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectList
