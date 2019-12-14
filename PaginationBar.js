import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const DELTA_SHOW_PAGES = 2;

class PaginationBar extends Component {
  // Метод клика, отсылает id во внешний обработчик
  handleClick(e) {
    this.props.onChange(Number(e.target.id));
  }

  // Метод получения кнопки перехода в начало
  getFirst() {
    return <PaginationLink first id={ 1 } onClick = { this.handleClick }/>
  }

  // Метод получения кнопки перехода в конец
  getLast() {
    return <PaginationLink last id = { this.props.maxPage } onClick = { this.handleClick }/>
  }

  // Метод получения кнопок крайних страниц
  getEndBtn(isLast = false) {
    // Если получаем первую страницу и выбрана первая или аналогично последнию дизэблим кнопку
    if ((this.props.page === 1 && !isLast) || (this.props.page === this.props.maxPage && isLast)) {
      return <PaginationItem key = { `${ isLast }` } disabled> 
        { isLast ? this.getLast() : this.getFirst() }
      </PaginationItem>
    } else {
      return <PaginationItem key = { `${ isLast }` }> 
        { isLast ? this.getLast() : this.getFirst() } 
      </PaginationItem>
    }
  }

  // Метод получения активной кнопки навигаиции
  getSelectedNumberBtn(item) {
    return <PaginationItem key = { `${item}` } active>
      <PaginationLink>
        { item }
      </PaginationLink>
    </PaginationItem>
  }

  // Метод получения кнопки навигаиции к определенной странице
  getNumberBtn(item) {
    return <PaginationItem key = { `${item}` }>
      <PaginationLink id = { item } onClick = { this.handleClick }>
        { item }
      </PaginationLink>
    </PaginationItem>
  }

  // Метод получения числовой кнопки
  getNumbersBtn() {
    const items = [];

    // Пройдемся по списку если номер совпадает с текуще страницей, выведем активарованную кнопку
    for(let i = this.state.minPage; i <= this.state.maxPage; i++) {
      items.push(this.props.page === i ? this.getSelectedNumberBtn(i) : this.getNumberBtn(i));
    }
    return items;
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      minPage: null,
      maxPage: null,
      size: null
    };
  }

  static getDerivedStateFromProps(props) {
    // При изменении props обновим крайние значения
    return {
      minPage: props.page - DELTA_SHOW_PAGES > 0 ? props.page - DELTA_SHOW_PAGES : 1,
      maxPage: props.page + DELTA_SHOW_PAGES < props.maxPage ? props.page + DELTA_SHOW_PAGES : props.maxPage
    }
  }

  render() {
    const { size } = this.props;
    let pagination;

    // Если пришла максимальная страница и вычислина ширина, то сфомируем пагинацию
    if (this.state.maxPage && size && this.state.maxPage !== this.state.minPage) {
      pagination = <Pagination size = { size } aria-label="Page navigation">
        { this.getEndBtn() }
        { this.getNumbersBtn() }
        { this.getEndBtn(true) }
      </Pagination>
    }
    return (
      <div className='d-flex justify-content-center'>
        { pagination }
      </div>
    );
  }
}

export default PaginationBar;