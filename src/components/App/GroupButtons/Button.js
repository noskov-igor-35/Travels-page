import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  // Метод клика, отсылает id во внешний обработчик
  handleClick(e) {
    if (e.target.id !== this.props.selectedKey) {
      this.props.handleClick(e.target.id);
    }
  }

  render() {
    const colorClass = this.props.isSelected ? ' GroupButtons__item_active' : '';
    return <div className={`GroupButtons__item${ colorClass } padding--m`}
                id= { this.props.id }
                onClick = { this.handleClick }>
      { this.props.title } 
    </div>;
  }
}

export default Button;
