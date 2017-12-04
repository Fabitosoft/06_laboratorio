const validate = values => {
    const errors = {};
    if (!values.nombre) {
        errors.nombre = 'Requerido';
    }

    if (!values.correo_electronico) {
        errors.correo_electronico = 'Requerido';
    } else {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(values.correo_electronico)) {
            errors.correo_electronico = 'Correo Electrónico Inválido';
        }
    }
    return errors;
};

export default validate;
