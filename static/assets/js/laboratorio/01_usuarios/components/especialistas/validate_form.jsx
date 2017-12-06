const validate = values => {
    const errors = {};
    const requiredFields = [
        'nombre',
        'apellido',
        'grupo_sanguineo',
        'tipo_documento',
        'nro_identificacion',
        'genero'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Requerido'
        }
    });
    if (values.email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(values.email)) {
            errors.email = 'Correo Electrónico Inválido';
        }
    }
    return errors;
};

export default validate;

