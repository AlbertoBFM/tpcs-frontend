import { useEffect } from 'react';
import { SaleRow, SaleDetailModal } from '../';
import { useSaleStore } from '../../../hooks';

import './style.css';

export const SalePage = () => {

    const { sales, startLoadingSales } = useSaleStore();

    useEffect(() => {
        startLoadingSales();
    }, [])
    

    return (
        <>
            <div className="text-center">
                <h1>SalePage</h1>
            </div>
            {/* <AddNewProd-uct /> */}
            <div className="m-md-auto table-responsive">
                <table className="table table-striped text-center">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">User</th>
                            {/* <th scope="col">Cliente</th> */}
                            <th scope="col">Fecha</th>
                            <th scope="col">Total</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        { sales.map( sale => (<SaleRow key={ sale._id } { ...sale } />) ) }
                    </tbody>
                </table>
            </div>
            <SaleDetailModal />
        </>
    )
}