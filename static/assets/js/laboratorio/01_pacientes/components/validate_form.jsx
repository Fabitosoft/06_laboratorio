const validate = values => {
    const errors = {};

    if (!values.nombre) {
        errors.nombre = 'Requerido';
    }

    if (!values.apellido) {
        errors.apellido = 'Requerido';
    }

    if (!values.grupo_sanguineo) {
        errors.grupo_sanguineo = 'Requerido';
    }

    if (!values.tipo_documento) {
        errors.tipo_documento = 'Requerido';
    }

    if (!values.fecha_nacimiento) {
        errors.fecha_nacimiento = 'Requerido';
    }

    if (!values.nro_documento) {
        errors.nro_documento = 'Requerido';
    }

    if (!values.genero) {
        errors.genero = 'Requerido';
    }

    if (!values.email) {
        errors.email = 'Requerido';
    } else {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(values.email)) {
            errors.email = 'Correo Electrónico Inválido';
        }
    }
    return errors;
};

export default validate;

