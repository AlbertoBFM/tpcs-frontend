import { useDispatch } from 'react-redux';

import { useUiStore } from '../../hooks';
import { onSetActiveCategory } from '../../store';


export const Row = ( category ) => {

    const dispatch = useDispatch();

    const { openModal } = useUiStore();

    const { _id, name, description } = category;

    const onSelect = ( category ) => {
        dispatch( onSetActiveCategory( category ) );
        openModal();
    }

    return (
        <tr>
            <td scope="row" className="">{ _id }</td>
            <td>{ name }</td>
            <td>{ description }</td>
            <td>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-warning"
                        onClick={ () => onSelect( category ) }
                    >
                        Modificar
                    </button>
                    <button type="button" className="btn btn-danger">Eliminar</button>
                </div>
            </td>
        </tr>
    )
    
}
