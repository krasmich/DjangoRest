import React from 'react';

const NF404 = ({location}) =>{

    return(
        <div>
            <h2> Страница по адресу '{location.pathname}' не найдена</h2>
        </div>
    )
}

export  default  NF404;