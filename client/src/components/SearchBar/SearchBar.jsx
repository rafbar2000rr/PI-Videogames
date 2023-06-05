import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getNames } from '../../redux/actions'
import s from '../SearchBar/SearchBar.module.css'


export default function SearchBar () {
    const [state, setState] = useState('') 
    const dispatch = useDispatch()

    function handleChange(e) { 
        e.preventDefault()
        setState(e.target.value) 
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(state.length > 1) { 
            dispatch(getNames(state))
            setState('') 
        } else {
            alert('No ingreso nada en la busqueda')
        }
    }

    
    return(
        <div className={s.box}>
            <form onSubmit={e => handleSubmit(e)}>
                <div className={s.buscar}>
                    <span htmlFor="name"></span>
                    <input 
                        type='text'
                        id="name"
                        autoComplete="off"
                        value={state}
                        placeholder='Buscar videojuego'
                        onChange={e => handleChange(e)}
                    />
                    <button type="submit" className={s.btn}>Enviar</button>
                </div>
            </form>
        </div>
    )
}