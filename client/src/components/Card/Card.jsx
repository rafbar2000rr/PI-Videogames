import React from "react";
import s from '../Card/Card.module.css'
import { NavLink } from "react-router-dom";

export default function Card(props){
    return (
        <div className={s.card}>
            <img src={props.image} width="100px" height="350px" alt=""/>
            <div className={s.card__content}>
                <h3 className={s.name}>{props.name}</h3>
                <p className={s.genres}>{props.genres}</p>
                <p className={s.rating}> {props.rating}</p>
                <  NavLink to={`/detail/${props.id}`} className={s.navLink}><span className={s.leer_mas}>Detalle</span></NavLink>
             </div>
        </div>
        )
    

}


