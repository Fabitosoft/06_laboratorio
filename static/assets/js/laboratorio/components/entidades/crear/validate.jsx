const validate = values => {
    const errors = {};
    if (!values.nit) {
        errors.nit = 'Requerido';
    }
    if (!values.nombre) {
        errors.nombre = 'Requerido';
    }
    return errors;
};

export default validate;
