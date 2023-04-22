import { useState } from "react"
import Swal from "sweetalert2"
import {v4 as uuidv4} from "uuid"


const Formulario = ({agregarToDo}) => {

    const initialState = {
        nombre:'',
        descripcion:'',
        estado:'pendiente',
        prioridad:false
    }

    const [toDo, setToDo] = useState(initialState)

    const {nombre, descripcion, estado, prioridad} = toDo

    const handleChange = (e) => {
        const {name, value, checked, type} = e.target
        setToDo((old)=>({
            ...old,
            [name]: type === "checkbox" ? checked : value,
            
        }))
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!nombre.trim()){
            e.target[0].focus()
            Toast.fire({
                icon:'error',
                title:'Ingrese nombre del ToDo!'
            })
            return
        }
        if(!descripcion.trim()){
            e.target[1].focus()
            Toast.fire({
                icon:'error',
                title:'Ingrese descripción del ToDo!'
            })
            return
        }
        Toast.fire({
            icon:'success',
            title:'ToDo agregada exitosamente!'
        })
        agregarToDo({
            nombre:nombre,
            descripcion:descripcion,
            estado: estado === "pendiente" ? false : true,
            prioridad: prioridad,
            id: uuidv4()
        })

        setToDo(initialState)
    }



    return (
        <>
            <h1>Formulario</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    name="nombre" 
                    className="form-control mb-2" 
                    placeholder="Ingrese el nombre de la tarea"
                    type="text" 
                    value={nombre}
                    onChange={handleChange}
                />
                <textarea 
                    name="descripcion" 
                    className="form-control mb-2" 
                    placeholder="Ingrese la descripción de la tarea" 
                    value={descripcion}
                    onChange={handleChange}
                    />
                <select 
                    name="estado"
                    className="form-control mb-2" 
                    value={estado}
                    onChange={handleChange}
                >
                    <option value="pendiente">Pendiente</option>
                    <option value="completado">Completado</option>
                </select>
                <div className="form-check">
                    <input 
                        name="prioridad" 
                        className="form-check-input" 
                        type="checkbox" 
                        id="flexCheckDefault"
                        checked={prioridad}
                        onChange={handleChange} 
                    />
                    <label 
                        className="form-check-label" 
                        htmlFor="flexCheckDefault"
                    >
                        Prioritario
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Agregar</button>
            </form>
        </>
    );
}
 
export default Formulario;