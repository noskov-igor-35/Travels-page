import React, { Component } from 'react';
import Button from './GroupButtons/Button'
import './GroupButtons/GroupButtons.less'

class GroupButtons extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // Метод клика, отсылает id во внешний обработчик
  handleChange(id) {
    this.props.handleChange(id);
  }

  render(){
    // Сформируем набор кнопок
    const items = this.props.items.map((item) => {
      // Выделим желтым выбранный фильтр
      const isSelected = item.id === this.props.selectedKey;
      return <Button isSelected={ isSelected } 
                     key = { item.id }
                     id = { item.id }
                     title={ item.title }
                     handleClick = { this.handleChange }/>
    });

    return <div className='GroupButtons flexbox'>{ items }</div>
  }
}

export default GroupButtons;
