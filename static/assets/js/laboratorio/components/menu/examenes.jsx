import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import {Link} from 'react-router-dom';

const MenuExamenes = () => (
    <IconMenu
        iconButtonElement={<IconButton><FontIcon className="fa fa-tint"/></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem
            primaryText="En Proceso"
            containerElement={<Link to="/app/examenes/en_proceso/lista"/>}
        />
        <MenuItem
            primaryText="Con Resultados"
            containerElement={<Link to="/app/examenes/con_resultados/lista/"/>}
        />
        <MenuItem
            primaryText="Verificados"
            containerElement={<Link to="/app/examenes/verificados/lista/"/>}
        />
        <Divider/>
        <MenuItem
            primaryText="Examenes"
            containerElement={<Link to="/app/ordenes_laboratorio/lista/"/>}
        />
    </IconMenu>
)

export default MenuExamenes;