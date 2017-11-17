import React, {Component} from 'react';
import {Field} from 'redux-form';
import TextField from 'material-ui/TextField';

export default class BuscarOrden extends Component {
    render() {
        const {buscarOrden} = this.props;
        return (
            <TextField
                floatingLabelText="A buscar"
                fullWidth={true}
                onChange={buscarOrden}
            />
        )
    }
}