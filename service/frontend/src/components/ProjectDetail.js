import React from 'react'
import { useParams } from 'react-router-dom'



const ProjectItem = ({ project }) => {
    return (
        <tbody>
            <tr>
                <td>
                    {project.name_project}
                </td>
                <td>
                    {project.link_repository}
                </td>
                <td>
                    {project.users.map((user) => user.username)}
                </td>
            </tr>
        </tbody>
    )
}

const ProjectDetailList = ({ projects }) => {
    let { projectName } = useParams();
    let filtered_items = projects.filter((project => project.name.includes(projectName)))

    return (
        <div class="container">
            <table class="table ">
                <th>
                    Project Name
                </th>
                <th>
                    Project URL
                </th>
                <th>
                    Users
                </th>
                {filtered_items.map((project) => <ProjectItem project={project} />)}
            </table>
        </div>
    )
}


export default ProjectDetailList
