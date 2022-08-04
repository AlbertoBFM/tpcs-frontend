
export const validateName = ( type, limit ) => ({
    required: `El ${ type } es requerido`,
    pattern: { value: /^(?![\s.]+$)[a-zA-Z\s]*$/, message: `${ type } invalido` },
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
        hola: v => v >= start && v <= end || `Ingrese un valor entre ${ start } y ${ end }`
    },
})