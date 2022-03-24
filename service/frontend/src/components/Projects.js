import React from 'react';
import { Link, useParams } from "react-router-dom";


const ProjectItem = ({project}) => {
    let link = `/project/${project.id}`
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                <Link className="nav-link" to={link}>{project.name_project}</Link>
            </td>
            <td>
                {project.link_repository}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <div className='container'>
            <table className='table'>
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Название</th>
                    <th scope="col">Репозиторий</th>
                </tr>
                </thead>
                <tbody>
                    {projects.map((project) => <ProjectItem project={project}/>)}
                </tbody>
            </table>
        </div>
    )
}

const ProjectUser = ({item}) => {
    return (
    <tr>
        <td>{item.firstname}</td>
        <td>{item.lastname}</td>
        <td>{item.email}</td>
    </tr>
    )
}

const ProjectDetail = ({getProject, item}) => {
    let { id } = useParams();
    getProject(id)
    let users = item.users ? item.users : []
    return (
        <div className='container'>
            <div className="card">
                <h4 className="card-header">{item.name_project}</h4>
                <div className="card-body">
                        Пользователи:
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Имя</th>
                                    <th>Фамилия</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => <ProjectUser item={user} />)}
                            </tbody>
                        </table>
                    Repository: <a href={item.link_repository} className='link-dark' target="_blank">{item.link_repository}</a>
                </div>
            </div>
        </div>
    )
}


export {ProjectList, ProjectDetail}
