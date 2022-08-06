


export const ClientPage = () => {
    return (
        <>
            <div className="text-center">
                <h1>ClientPage</h1>
            </div>
            <div className="d-flex justify-content-md-end justify-content-center">
                <button className="btn btn-dark m-3">
                    Nuevo Cliente
                </button>
            </div>
            <div className="m-md-auto table-responsive">
                <table className="table table-striped text-center">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Ci</th>
                            <th scope="col">Nombres</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Celular</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">NIT</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="row" className="" style={{ margin:"0px auto"}}>1</td>
                            <td>15112775</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>76167710</td>
                            <td>Av. Juanito Alcachofa S/N</td>
                            <td>1275896512</td>
                            <td>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-warning">Modificar</button>
                                    <button type="button" className="btn btn-danger">Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </>
    )
}
