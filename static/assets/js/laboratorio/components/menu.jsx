import React from 'react';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import {Link} from 'react-router-dom';

const style = {
    display: 'inline-block',
    margin: '16px 32px 16px 0',
};

const MenuExampleNested = () => (
    <Toolbar>
        <ToolbarGroup firstChild={true}>
            <Paper style={style}>
                <IconMenu iconButtonElement={<IconButton><FontIcon className="fa fa-users"/></IconButton>
                }>
                    <MenuItem
                        primaryText="Pacientes"
                        rightIcon={<ArrowDropRight/>}
                        menuItems={[
                            <MenuItem primaryText="Crear/Actualizar Paciente"
                                      containerElement={<Link to="/app/paciente/crear/"/>}/>
                        ]}
                    />
                </IconMenu>
                <IconMenu iconButtonElement={<IconButton><FontIcon className="fa fa-file-text-o"/></IconButton>
                }>
                    <MenuItem
                        primaryText="Ordenes"
                        rightIcon={<ArrowDropRight/>}
                        menuItems={[
                            <MenuItem primaryText="Ordenes"
                                      containerElement={<Link to="/app/ordenes_laboratorio/lista/"/>}/>,
                            <MenuItem primaryText="Crear Orden Laboratorio"
                                      containerElement={<Link to="/app/ordenes_laboratorio/crear/"/>}/>
                        ]}
                    />
                </IconMenu>
                <IconMenu iconButtonElement={<IconButton><FontIcon className="fa fa-hospital-o"/></IconButton>
                }>
                    <MenuItem
                        primaryText="Entidades"
                        rightIcon={<ArrowDropRight/>}
                        menuItems={[
                            <MenuItem primaryText="Crear" containerElement={<Link to="/app/entidades/crear/"/>}/>,
                            <MenuItem primaryText="Lista" containerElement={<Link to="/app/entidades/lista/"/>}/>,
                        ]}
                    />
                </IconMenu>
            </Paper>
        </ToolbarGroup>
    </Toolbar>
)

export default MenuExampleNested;