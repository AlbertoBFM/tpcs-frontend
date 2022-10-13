
export const SaleDetailRow = ( detail ) => {
    const { product, salePrice, quantity, subtotal  } = detail;

    return (
        <tr>
            <td><b>{ product.name }</b></td>
            <td>{ salePrice }</td>
            <td><b>{ quantity }</b></td>
            <td>{ subtotal }</td>
        </tr>
    )
}
