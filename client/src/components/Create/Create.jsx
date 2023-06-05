import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame, getByGenres, getPlatforms } from "../../redux/actions";
import s from '../Create/Create.module.css'
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

function validate (input) {
  let errors = {}

  if(!input.name) {
    errors.name = 'Ingrese el nombre'
  } else if(!/^[a-zA-Z0-9-() .]+$/.test(input.name)){
    errors.name = 'Ingrese solo letras, numeros, guiones medios y paréntesis'
  }

  if(input.image.length !== 0 && !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.image)){
    errors.image='invalid URL'
  }

  if(!input.description) {
    errors.description = 'Ingrese descripción'
  } else if (input.description.length > 100) {
    errors.description = 'La descripcion debe ser menor a 100 caracteres'
  }

  if(!input.released) {
    errors.released = 'Ingrese la fecha de lanzamiento'
  }

  if(!input.rating) {
    errors.rating = 'Ingrese el rating'
  } else if(input.rating > 5) {
    errors.rating = 'El rating no debe ser mayor a 5'
  } else if(input.rating < 0) {
    errors.rating = 'El rating debe ser positivo'
  }

  return errors 
}

export default function Create() {
  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: []
  });

  const [errors, setErrors] = useState({}); 
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const generos = useSelector(state => state.genres);
  const plataformas = useSelector(state => state.platforms);
  const allNames = useSelector(state => state.allVideogames)

  
  useEffect(() => {
    dispatch(getByGenres());
    dispatch(getPlatforms())
  }, [dispatch])
  
  function handleSubmit(e) {
    e.preventDefault();
    let noRepeat = allNames.filter(n => n.name === input.name)
    if(noRepeat.length !== 0) {
      alert('El juego ya existe')
    } else {
        let error = Object.keys(validate(input)) 
      
        if(error.length !== 0 || !input.genres.length || !input.platforms.length) { 
          alert('Complete los datos')
          return
        } else {
          dispatch(createVideogame(input));
          setInput({
            name: "",
            image: "",
            description: "",
            released: "",
            rating: "",
            genres: [],
            platforms: [],
          });
          alert("Juego creado!");
        }
        navigate('/home')

    }
  }

  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(validate({
      ...input,
      [e.target.name]: [e.target.value]
    })
    )
  
  }

  function handleGenres(e) {
    if(!input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      })
    }
  }

  function handlePlatforms(e) {
    if(!input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value]
      })
    }
  }

  function handleDeleteG(e) {
    setInput({
      ...input,
      genres: input.genres.filter((gen) => gen !== e)
    });
  }

  function handleDeleteP(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((plat) => plat !== e)
    });
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className={s.box_form}>
        <div className={s.form}>
          <h2 className={s.titulo}>Crear Videojuego</h2>

          <div className={s.grupo}>
            <input
              className={s.create_input}
              type="text"
              required
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
              /> <span className={s.barra}></span>
            <label className={s.label}>Nombre: </label>
            {errors.name && (
              <p className={s.danger}>{errors.name}</p>
            )}
          </div>


          <div className={s.grupo}>
            <input
            className={s.create_input}
              type="text"
              name="image"
              value={input.image}
              onChange={(e) => handleChange(e)}
              /> <span className={s.barra}></span>
            <label className={s.label}>Imágen: </label>
            {errors.image && (
              <p className={s.danger}>{errors.image}</p>
            )}
          </div>


          <div className={s.grupo}>
            <input
            className={s.create_input}
              required
              type='date'
              name="released"
              value={input.released}
              placeholder='yyyy-mm-dd'
              onChange={(e) => handleChange(e)}
              /> <span className={s.barra}></span>
            <label className={s.label}>Fecha de lanzamiento: </label>
            {errors.released && (
              <p className={s.danger}>{errors.released}</p>
            )}

          </div>

          <div className={s.grupo}>
            <input
            className={s.create_input}
              required
              type="number"
              name="rating"
              value={input.rating}
              onChange={(e) => handleChange(e)}
              /> <span className={s.barra}></span>
            <label className={s.label}>Rating: </label>
            {errors.rating && (
              <p className={s.danger}>{errors.rating}</p>
            )}
          </div>


          <div className={s.grupo}>
            <select className={s.select_create} id="genres" defaultValue="" onChange={(e) => handleGenres(e)}>
              <option className={s.option_create} value='' disabled hidden>Elegir</option>
              {generos.map((g) => {
                return (
                  <option className={s.option_create} key={g.id} value={g.name}>{g.name}</option>
                  );
                })}
            </select> <span className={s.barra}></span>
            <label className={s.label}>Géneros: </label>
            {input.genres.map((g) => (
              <div className={s.box_opcion}>
                <div className={s.opcion_title}>{g}</div>
                <button className={s.btn_remove} onClick={() => handleDeleteG(g)} key={g} value={g}><span className={s.x}>X</span></button>
              </div>
        ))}
          </div>


          <div className={s.grupo}>
              <select className={s.select_create} id="platforms" defaultValue="" onChange={(e) => handlePlatforms(e)}>
                  <option className={s.option_create} value="" disabled hidden>Elegir</option>
                  {plataformas?.map(p => {
                    return (
                      <option className={s.option_create} value={p} key={p}>{p}</option>
                      );
                    })}
              </select> <span className={s.barra}></span>
              <label className={s.label}>Plataformas:  </label>
              {input.platforms.map((p) => (
                <div className={s.box_opcion}>
                  <div className={s.opcion_title}>{p}</div>
                  <button className={s.btn_remove} onClick={() => handleDeleteP(p)} key={p} value={p}><span className={s.x}>X</span></button>
                </div>
              ))}
          </div>

          <div className={s.grupo}>
            <textarea
              required
              type="text"
              name="description"
              value={input.description}
              onChange={(e) => handleChange(e)}
              > </textarea>
            <label className={s.description}>Descripción: </label>
            {errors.description && (
              <p className={s.danger}>{errors.description}</p>
            )}
          </div>
      </div>
      <div>
          <button type="submit" className={s.btn_submit}>Crear Videojuego</button>
      </div>
      <div className={s.box_home}>
          <NavLink to={'/home'} className={s.back_home}>Cancelar</NavLink>
      </div>
      </form>

    </div>
  );
};