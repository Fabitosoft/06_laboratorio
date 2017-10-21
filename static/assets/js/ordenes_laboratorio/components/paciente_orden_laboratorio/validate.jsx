const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Requerido';
    }
    else {
        if (values.username.length < 5 || values.username.length > 15) {
            errors.username = `El nombre de usuario debe tener entre 5 y 15 caracteres. Este tiene ${values.username.length} caracteres`;
        }
    }

    if (!values.password) {
        errors.password = 'Requerido';
    } else {
        if (values.password.length < 8 || values.password.length > 20) {
            errors.password = `La contraseña debe tener entre 8 y 20 caracteres. Esta tiene ${values.password.length} caracteres`;
        }
    }

    if (!values.password2) {
        errors.password2 = 'Requerido';
    }

    if (values.password2 && values.password) {
        if (values.password !== values.password2) {
            errors.password2 = 'Las contraseñas no coinciden';
        }
    }

    if (!values.last_name) {
        errors.last_name = 'Requerido';
    }
    if (!values.first_name) {
        errors.first_name = 'Requerido';
    }
    if (!values.email) {
        errors.email = 'Requerido';
    } else {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(values.email)){
            errors.email = 'Correo Electrónico Inválido';
        }
    }
    return errors;
};

export default validate;
