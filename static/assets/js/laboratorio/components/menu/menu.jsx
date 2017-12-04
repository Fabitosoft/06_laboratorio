import React from 'react';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

import PersonasMenu from './personas';
import OrdenesMenu from './ordenes';
import EntidadesMenu from './entidades';

const style = {
    display: 'inline-block',
    margin: '16px 32px 16px 0',
};

const MenuExampleNested = () => (
    <Toolbar>
        <ToolbarGroup firstChild={true}>
            <Paper style={style}>
                <PersonasMenu/>
                <OrdenesMenu/>
                <EntidadesMenu/>

                {/*<IconMenu iconButtonElement={<IconButton><FontIcon className="fa fa-hospital-o"/></IconButton>*/}
                {/*}>*/}
                {/*<MenuItem*/}
                {/*primaryText="Examenes"*/}
                {/*rightIcon={<ArrowDropRight/>}*/}
                {/*menuItems={[*/}
                {/*<MenuItem primaryText="Para Resultados"*/}
                {/*containerElement={<Link to="/app/examenes_ordenes/por_resultados/"/>}/>,*/}
                {/*]}*/}
                {/*/>*/}
                {/*</IconMenu>*/}
            </Paper>
        </ToolbarGroup>
    </Toolbar>
)

export default MenuExampleNested;