import React from "react";
import { Link } from 'react-router-dom'
import s from '../Landing/Landing.module.css'


const Landing = () => {
    return (
        <div className={s.full}>
            <div className={s.full_inner}>
                <div className={s.content}>
                    <h1 className={s.titulo}>Videogames</h1>
                    <Link to='/home'>
                        <button className={s.btn}>
                            <span className={s.ingresar}>START</span>
                        </button>
                    </Link>
                </div>
                
            </div>
         </div>
    )

}

export default Landing



