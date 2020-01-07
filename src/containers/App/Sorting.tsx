import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeSorting } from '../../actions/filters';
import { ISortingProps } from '../../interfaces/containers/ISorting';
import Dropdown from '../../components/Dropdown';

class Sorting extends React.Component<ISortingProps> {
    // Метод клика, отсылает id во внешний обработчик
    handleSortingChange(sorting: string) {
        this.props.onChangeSorting(sorting);
    }

    constructor(props: ISortingProps) {
        super(props);
        this.handleSortingChange = this.handleSortingChange.bind(this);
    }

    render(): JSX.Element {
        return (
            <div>
                <Dropdown selectedKey = { this.props.sorting }
                          items = {[
                              { id: 'date', title: 'По дате создания' },
                              { id: 'amount', title: 'По стоимости' }
                          ]}
                          handleChange = {this.handleSortingChange}/>
            </div>
        );
    }
}

export default connect(
    state => ({
        sorting: state.filters.sorting,
    }),
    dispatch => ({
        onChangeSorting: bindActionCreators(changeSorting, dispatch),
    })
)(Sorting);
