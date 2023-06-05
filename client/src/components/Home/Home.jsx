import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterOrderSource from '../FilterOrderSource/FilterOrderSource'
import NavBar from "../NavBar/NavBar";
import { Cards } from "../Cards/Cards";
import Pagination from '../Pagination/Pagination';
import { filterByGenres, filterBySource, orderBy, getAllVideogames } from "../../redux/actions";

export default function Home () {
    const allGames = useSelector(state => state.allVideogames)

    const [currentPage, setCurrentPage] = useState(1) 
    const gamesPerPage = 15
    const indexOfLastGame = currentPage * gamesPerPage 
    const indexOfFirstGame= indexOfLastGame - gamesPerPage 
    const Games = allGames.slice(indexOfFirstGame, indexOfLastGame) 

    const dispatch = useDispatch()

    const paginado = (pageNumber) => { 
        setCurrentPage(pageNumber)
    }
    


    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage])

    function handleSort(e) {
        e.preventDefault()
        if(e.target.value === '') {
            dispatch(getAllVideogames())
        } else {
            dispatch(orderBy(e.target.value))
            setCurrentPage(1)
        }
    }

    function handleFilter(e) {
        e.preventDefault()
        if(e.target.value === '') {
            dispatch(getAllVideogames())
        } else {
            dispatch(filterByGenres(e.target.value))
            setCurrentPage(1)
        }
    }

    function handleSource(e) {
        e.preventDefault()
        if(e.target.value === '') {
            dispatch(getAllVideogames())
        } else {
            dispatch(filterBySource(e.target.value))
            setCurrentPage(1)
        }
    }

    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                <FilterOrderSource handleSort={handleSort} handleFilter={handleFilter} handleSource={handleSource}/>
            </div>
            <div>
                <Cards Games={Games}/> 
            </div>
            <div>
                <Pagination 
                gamesPerPage={gamesPerPage} 
                allGames={allGames.length} 
                paginado={paginado} />
            </div>
        </div>
    )
}