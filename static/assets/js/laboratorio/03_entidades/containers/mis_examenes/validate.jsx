const validate = values => {
    const errors = {};
    if (!values.valor_examen) {
        errors.valor_examen = 'Requerido';
    }else{
        if(values.valor_examen<=0){
            errors.valor_examen = 'El valor debe de ser positivo';
        }
    }
    return errors;
};

export default validate;
