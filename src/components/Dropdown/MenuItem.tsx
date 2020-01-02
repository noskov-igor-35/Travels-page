import * as React from 'react';
import { IGroupBtnItem } from '../../interfaces/IGroupBtns';

class MenuItem extends React.Component<IGroupBtnItem> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  // Метод клика, отсылает id во внешний обработчик
  handleClick(): void {
    if (!this.props.isSelected) {
      this.props.handleClick(this.props.id);
    }
  }

  render(): JSX.Element {
    const colorClass: string = this.props.isSelected ? ' Dropdown__List-item_active' : '';
    return <div className={ `Dropdown__List-item${ colorClass } padding--m` } onClick = { this.handleClick }>
      { this.props.title }
    </div>
  }
}

export default MenuItem;
