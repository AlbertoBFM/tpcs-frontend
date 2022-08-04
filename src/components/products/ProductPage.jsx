import React from 'react'

export const ProductPage = () => {
    return (
        <>
        <h1>ProductPage</h1>
        <div className="d-flex justify-content-end">
            <button className="btn btn-secondary m-3">
                Nuevo Producto
            </button>
        </div>
        <div>
        <table className="table table-striped text-center">
            <thead className="bg-dark text-white">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    <th scope="col">&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td scope="row">1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
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
