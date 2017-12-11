import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';

export default class BusquedaAutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            textoBuscado: '',
        })
    }

    onNewRequest(instance, index) {
        const {setStateInstance} = this.props;
        if (index !== -1) {
            setStateInstance(instance.value);
        }
        else {
            setStateInstance(null);
        }
    }

    onUpdateInput(textoBuscado) {
        const {busquedaAction, setSearchText, min_caracteres} = this.props;
        this.setState({textoBuscado});
        if (setSearchText) {
            setSearchText(textoBuscado)
        }
        if (textoBuscado.length > (min_caracteres ? min_caracteres : 3)) {
            busquedaAction(textoBuscado);
        }
    }

    render() {
        const {dataSource, label, searchText} = this.props;

        return (
            <AutoComplete
                ref={`autoComplete${label.upperFirst}`}
                floatingLabelText={label}
                filter={AutoComplete.fuzzyFilter}
                fullWidth={true}
                dataSource={dataSource}
                onNewRequest={this.onNewRequest.bind(this)}
                onUpdateInput={this.onUpdateInput.bind(this)}
                searchText={searchText}
            />
        )
    }
}
