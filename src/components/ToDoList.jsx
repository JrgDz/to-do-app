import { useEffect, useState } from "react";
import Formulario from "./Formulario";
import ToDo from "./ToDo";

const ToDoList = () => {

    const [toDos, setToDos] = useState ([])


    // EJEMPLO DE USEEFFECT (NO FUNCIONA)
    useEffect(()=>{
        if(localStorage.getItem("toDos")){
            setToDos(JSON.parse(localStorage.getItem("toDos")))
        }
    },[])

    // SOLUCION PARA EJEMPLO ANTERIOR DE USEEFFECT QUE NO FUNCIONA
    // const [toDos, setToDos] = useState(() => {
    //     const initialValue = JSON.parse(localStorage.getItem('todos'))
    //     return initialValue || ''
    // })

    // EJEMPLO DE USEEFFECT (SI FUNCIONA)
    useEffect(()=>{
        localStorage.setItem("toDos", JSON.stringify(toDos))
    },[toDos])

    const agregarToDo = (toDo) => {
        console.log(toDo)
        setToDos((old)=>[...old, toDo])
    }

    const eliminarToDo = (id) => {
        setToDos((old) => old.filter(item => item.id !== id))
    }

    const editarToDo = (id) => {
        const editarToDos = toDos.map(item => (
            item.id === id ? {...item, estado: !item.estado} : item
        ))
        console.log(editarToDos)
        setToDos(editarToDos)
    }

    return (
        <>
            <Formulario agregarToDo={agregarToDo} />
            <ul className="list-group list-group-numbered mt-2">
                {toDos.map(item => (
                    <ToDo key={item.id} item={item} eliminarToDo={eliminarToDo} editarToDo={editarToDo}/>
                ))}
            </ul>
        </>
     );
}

export default ToDoList;