import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import s from "../NavBar/NavBar.module.css"




export default function NavBar() {
    return (
          <div>
            <nav className={s.nav}>
                <div className={s.find}>
                    <SearchBar />
                </div>
                <div className = {s.title}><h1>Videogames</h1></div>
                <div className={s.search}>
                    
                    <span className={s.opcion}><NavLink to={'/create'} className={s.to}> Crear videojuego</NavLink></span>
                </div>
            </nav>
         </div>
    )
}