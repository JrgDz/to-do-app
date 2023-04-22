const ToDo = ({item, eliminarToDo, editarToDo}) => {
    const {id, nombre, descripcion, estado, prioridad} = item
    return (
        <>
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{nombre} ({estado ? 'Finalizado' : 'Pendiente'})</div>
                <p>{descripcion}</p>
                <div>
                    <button className="btn btn-danger me-2" onClick={() => eliminarToDo(id)}>Eliminar</button>
                    <button className="btn btn-warning" onClick={() => editarToDo(id)}>Editar</button>
                </div>
            </div>
            <span className="badge bg-primary rounded-pill">
                {prioridad && 'Prioritario'}
            </span>
        </li>
        </>
    );
}
 
export default ToDo;