import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getVideogame } from "../../redux/actions";
import s from '../Detail/Detail.module.css';


function Detail() {

    const {id} = useParams() 
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getVideogame(id))
    }, [dispatch, id])

    const details = useSelector(state => state.videogame)
    

    

    var regex = /(<([^>]+)>)/gi;


    return(
        <div>
            <div className={s.main_card}>
                <div>
                    <h1 className={s.name}>{details.name}</h1>
                    <div className={s.card_cat}>
                        <p className={s.rating}> {details.rating}</p>
                        <p className={s.genres}>{details.genres?.map(g => (g.name ? g.name : g)).join('| ')}</p>
                        <p className={s.fecha}> {details.released}</p>
                    </div>
                        <div className={s.description}>{details.description?.replace(regex, '').replace('&#39', '')}</div>
                        <div className={s.plataforms}>: {details.platforms?.join(', ')}</div>
                </div>
            </div>
            <div>
                <NavLink to={'/home'} className={s.btn}>
                    <span>Home</span>
                </NavLink>
            </div>

        </div>
    )
}

export default Detail