import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import {Link} from 'react-router-dom';

const MenuMiCuenta = () => (
    <IconMenu
        iconButtonElement={<IconButton><FontIcon className="fa fa-user"/></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem
            primaryText="Salir"
            containerElement={<a href="/accounts/logout/?next=/"/>}
        />
    </IconMenu>
)

export default MenuMiCuenta;