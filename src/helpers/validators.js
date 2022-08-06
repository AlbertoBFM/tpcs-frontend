
export const validateName = ( type, limit ) => ({
    required: `El ${ type } es requerido`,
    pattern: { value: /^(?![\s.]+$)[a-zA-ZñÑ\s]*$/, message: `${ type } invalido` },
    maxLength: { value: limit, message: `El ${ type } no debe superar los ${ limit } caracteres` },
})

export const validateProductName = ( type, limit ) => ({
    required: `El ${ type } es requerido`,
    pattern: { value: /^(?![\s.0-9-]+$)[a-zA-ZñÑ0-9-\s]*$/, message: `${ type } invalido` },
    maxLength: { value: limit, message: `El ${ type } no debe superar los ${ limit } caracteres` },
})

export const validateEmail = ( limit ) => ({
    required: "El email es requerido",
    pattern: { 
        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
        message: "Email invalido" 
    },
    maxLength: { value: limit, message: `El Email no debe superar los ${ limit } caracteres` },
})

export const validateAge = ( start, end ) => ({ 
    required: 'La edad es requerida',
    validate: {
        range: v => v >= start && v <= end || `Ingrese un valor entre ${ start } y ${ end }`
    },
})

export const validateRangeOfNumber = ( start, end ) => ({ 
    required: 'El Dato es requerido',
    validate: {
        range: v => v >= start && v <= end || `Ingrese un valor entre ${ start } y ${ end }`
    },
})

export const validatePurchasePrice = ( start, end, saleLimit ) => ({
    required: 'El Precio de Compra invalido',
    validate: {
        range: v => v >= start && v <= end || `Ingrese un valor entre ${ start } y ${ end }`,
        limit: v => Number( v ) < Number( saleLimit ) || 'El precio de Compra debe ser menor al de Venta'
    },
})

export const validateSalePrice = ( start, end, purchaseLimit ) => ({
    required: 'El Precio de Venta invalido',
    validate: {
        range: v => v >= start && v <= end || `Ingrese un valor entre ${ start } y ${ end }`,
        limit: v => Number( v ) > Number( purchaseLimit ) || 'El precio de Venta debe ser mayor al de Compra'
    },
})