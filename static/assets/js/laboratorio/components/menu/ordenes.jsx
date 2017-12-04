import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import {Link} from 'react-router-dom';

const MenuOrdenes = () => (
    <IconMenu
        iconButtonElement={<IconButton><FontIcon className="fa fa-file-text-o"/></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem
            primaryText="Ordenes"
            rightIcon={<ArrowDropRight/>}
            menuItems={[
                <MenuItem
                    primaryText="Ordenes"
                    containerElement={<Link to="/app/ordenes_laboratorio/lista/"/>}
                />,
                <MenuItem
                    primaryText="Crear Orden Laboratorio"
                    containerElement={<Link to="/app/ordenes_laboratorio/crear/"/>}
                />
            ]}
        />
    </IconMenu>
)

export default MenuOrdenes;