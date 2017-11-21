const validate = values => {
    const errors = {};
    if (!values.valor_examen) {
        errors.valor_examen = 'Requerido';
    }
    return errors;
};

export default validate;
