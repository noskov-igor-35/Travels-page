import * as React from 'react';
import { connect } from 'react-redux';
import { ISortingProps } from '../../interfaces/ISorting';
import Dropdown from '../../core/Dropdown';

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
    sorting: state.sorting
  }),
  dispatch => ({
    onChangeSorting: (sorting) => {
      dispatch({ type: 'CHANGE_SORTING', payload: sorting });
    }
  })
)(Sorting);