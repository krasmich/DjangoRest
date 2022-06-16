import React from 'react';
import { Link, useParams } from "react-router-dom";


const ProjectItem = ({project, deleteProject}) => {
    return (
      <tbody>
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                <Link to={`project/${project.name_project}`}>{project.name_project}</Link>
            </td>
            <td>
                {project.link_repository}
            </td>
            <td>
                {project.users.map((user) => user.username)}
            </td>
            <td>
                <button onClick={() => deleteProject(project.id)} type="button">Delete</button>
            </td>
        </tr>
      </tbody>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div class='container'>
            <table class='table'>
                <th> Id </th>
                <th> Project Name </th>
                <th> Project URL </th>
                <th> Users </th>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectList
