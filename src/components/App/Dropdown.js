import React, { Component } from 'react';
import './Dropdown/Dropdown.less'

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.clickItem = this.clickItem.bind(this);
    this.state = {
      dropdownOpen: false
    }
  }

  // Метод открытия / скрытия выпадашки
  toggle() {
    this.setState((state) => {
      return {dropdownOpen: !state.dropdownOpen};
    });
  }

  // Метод клика, отсылает id во внешний обработчик
  clickItem(e) {
    if (e.target.id !== this.props.selectedKey) {
      this.props.handleChange(e.target.id);
    }
  }

  render () {
    let title;
    let maxTitle = '';
    // Сформируем набор значений
    const items = this.props.items.map((item) => {
      const isSelected = item.id === this.props.selectedKey;
      // При встрече выбранного значения проставим заголовок, чтобы дважды не искать
      if (isSelected) {
        title = item.title;
      }
      // Запоминаем самое большое значение и складываем его в шапку для фиксации ширины
      if (maxTitle.length < item.title.length) {
        maxTitle = item.title;
      }

      return <div className={ `Dropdown__List-item${ isSelected ? ' Dropdown__List-item_active' : '' } padding--m` }
                  key = { item.id }
                  id = { item.id }
                  onClick = { this.clickItem }>
                  { item.title }
              </div>
    });
    
    return (
      <div className='Dropdown' onClick = { this.toggle }>
        <div className={`Dropdown__Btn${ this.state.dropdownOpen ? ' Dropdown__Btn_open' : '' } padding--m`}>
          { title }
        </div>
        <div className='Dropdown__Btn-fix padding-left--m padding-right--m'>{ maxTitle }</div>
        <div className={`Dropdown__List${ this.state.dropdownOpen ? ' Dropdown__List_open' : '' }`}>
          { items }
        </div>
      </div>
    )
  };
}

export default Dropdown;
