import React from 'react';
import {Link} from 'react-router-dom';


function NavbarItem({item}) {
    return (
        <li className="nav-item active">
            <Link className="nav-link" to={item.href}>{item.name}</Link>
        </li>
    )
}


function Navbar({navbarItems}) {
    return (
      <div className='container'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">ProjectsAPP</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      {navbarItems.map((item) => <NavbarItem item={item} />)}
                    </ul>

                </div>
            </div>
        </nav>
      </div>
    )
}

export default Navbar
