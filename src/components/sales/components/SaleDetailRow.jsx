
export const SaleDetailRow = ( detail ) => {

    const { _id, product, quantity, subtotal  } = detail;

    return (
        <tr>
            <td scope="row" className="">{ _id }</td>
            <td><b>{ product.name }</b></td>
            <td>{ product.salePrice }</td>
            <td><b>{ quantity }</b></td>
            <td>{ subtotal }</td>
        </tr>
    )
    
}
