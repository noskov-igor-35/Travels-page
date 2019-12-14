import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

class FilterBtns extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  // Метод клика, отсылает id во внешний обработчик
  handleClick(e) {
    if (e.target.id !== this.props.selectedKey) {
      this.props.onChange(e.target.id);
    }
  }

  render(){
    // Сформируем набор кнопок
    const items = this.props.items.map((item) => {
      // Выделим желтым выбранный фильтр
      const color = item.id === this.props.selectedKey ? 'warning' : 'primary';
      return <Button color = { color } key = { item.id } id = { item.id }  onClick = { this.handleClick }>
        { item.title } 
      </Button>
    });

    // flex-sm-grow-1 не работает, придется ставить условие в className
    return (
      <div className="d-flex">
        <ButtonGroup vertical={this.props.size === 'sm'} 
                     size={ this.props.size }
                     className={this.props.size === 'sm' ? 'flex-grow-1 ' : 'flex-grow-0'}> 
                     { items } 
        </ButtonGroup>
      </div>
    );
  }
}

export default FilterBtns;
