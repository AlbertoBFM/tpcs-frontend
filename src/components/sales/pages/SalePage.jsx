import { useEffect } from 'react';
import { Table } from 'reactstrap';
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
                <h1>Ventas</h1>
            </div>
            <div className="col-md-8 m-md-auto">
                <Table responsive striped className="text-center">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th scope="col">User</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Total</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        { sales.map( sale => (<SaleRow key={ sale._id } { ...sale } />) ) }
                    </tbody>
                </Table>
            </div>
            <SaleDetailModal />
        </>
    )
}