import React from "react";
import s from '../Pagination/Pagination.module.css'


const Pagination = ({gamesPerPage, allGames, paginado}) => {

    const numberPage = []

    for(let i = 1; i <= Math.ceil(allGames/gamesPerPage); i++) {   
        
        numberPage.push(i)
    }
    return (
        <nav>
            <div className={s.pagination}>
                {numberPage && numberPage.map(number => ( 
                    <span key={number}>
                        <button className={s.btn} onClick={() => paginado(number)}>{number}</button> 
                    </span>
                ))}
            </div>
        </nav>
    )
}




export default Pagination
