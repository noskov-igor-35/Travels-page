import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class SortingDrpdown extends Component {
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
    this.props.onChange(e.target.id);
  }

  render () {
    let title;
    // Сформируем набор значений
    const items = this.props.items.map((item) => {
      // При встрече выбранного значения проставим заголовок, чтобы дважды не искать
      if (item.id === this.props.selectedKey) {
        title = item.title;
      }
      return <DropdownItem onClick = { this.clickItem } key = { item.id } id = { item.id }>
        { item.title }
      </DropdownItem>
    });

    // flex-sm-grow-1 не работает, придется ставить условие в className
    return (
      <div className="d-flex">
        <ButtonDropdown isOpen = { this.state.dropdownOpen } 
                        toggle = { this.toggle }
                        className={this.props.size === 'sm' ? 'flex-grow-1 ' : 'flex-grow-0'}>
          <DropdownToggle size = { this.props.size } color="primary" caret>
              { title }
          </DropdownToggle>
          <DropdownMenu>
            { items }
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    )
  };
}

export default SortingDrpdown;
