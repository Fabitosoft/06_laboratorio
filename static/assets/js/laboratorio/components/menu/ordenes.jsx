import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router-dom';

const MenuOrdenes = () => (
    <IconMenu
        iconButtonElement={<IconButton><FontIcon className="fa fa-file-text-o"/></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem
            primaryText="Ordenes"
            containerElement={<Link to="/app/ordenes_laboratorio/lista/"/>}
        />
    </IconMenu>
)
export default MenuOrdenes;