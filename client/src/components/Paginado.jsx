import React from "react";
import * as p from './Paginado.module.css';

export default function Paginado({countriesPerPage, countries, paginado}) {
    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(countries/countriesPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <nav>
            <ul>
            {
                pageNumbers && pageNumbers.map(n => (
                    <a  className={p['pagination']} key={n} onClick={() => paginado(n)}>{n}</a>
                ))
            }
            </ul>
        </nav>
    )
};