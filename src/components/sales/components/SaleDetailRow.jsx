
export const SaleDetailRow = ( detail ) => {
    const { product, quantity, subtotal  } = detail;

    return (
        <tr>
            <td><b>{ product.name }</b></td>
            <td>{ product.salePrice }</td>
            <td><b>{ quantity }</b></td>
            <td>{ subtotal }</td>
        </tr>
    )
}
