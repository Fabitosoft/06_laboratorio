import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router-dom';

const MenuPersonas = () => (
    <IconMenu
        iconButtonElement={<IconButton><FontIcon className="fa fa-users"/></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem
            primaryText="Pacientes"
            containerElement={<Link to="/app/paciente/lista/"/>}
        />
    </IconMenu>
)

export default MenuPersonas;