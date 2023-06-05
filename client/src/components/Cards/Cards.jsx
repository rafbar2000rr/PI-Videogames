import React from "react";
import { useDispatch } from "react-redux";
import { getAllVideogames } from "../../redux/actions";
import img from '../../images/bd.jpg'
import Card from "../Card/Card";
import s from '../Cards/Cards.module.css'


export const Cards = ({Games}) => {
    const dispatch = useDispatch()
    

    React.useEffect(() => {
        dispatch(getAllVideogames()) 
    }, [dispatch])

     return (
        <div className={s.main}>
            
            {Games?.map(v => {
                return (<Card
                    key={v.id}
                    id={v.id}
                    image={v.image ? v.image : img}
                    name={v.name}
                    genres={v.genres?.map(e => typeof (e) === 'object' ? e.name : e).join(', ')}
                    rating={v.rating}
                    />)})  }

        </div>
    )
}