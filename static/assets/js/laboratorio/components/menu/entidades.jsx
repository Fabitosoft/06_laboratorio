import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router-dom';

const MenuEntidades = () => (
    <IconMenu
        iconButtonElement={<IconButton><FontIcon className="fa fa-hospital-o"/></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem
            primaryText="Entidades"
            containerElement={<Link to="/app/entidades/lista/"/>}
        />
    </IconMenu>
)
export default MenuEntidades;