import React, { Component } from 'react';
import GroupButtons from '../GroupButtons'

const DELTA_SHOW_PAGES = 2;
const ID_FIRST = 'first';
const ID_LAST = 'last';

class Pagination extends Component {
  // Метод клика, отсылает id во внешний обработчик
  handlePageChange(page) {
    this.props.handleChange(page === ID_FIRST ? 1 : page === ID_LAST ? this.props.maxPage : Number(page));
  }

  constructor(props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      minPage: null,
      maxPage: null
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
    const { page } = this.props;
    let pagination;

    // Если пришла максимальная страница и вычислина ширина, то сфомируем пагинацию
    if (this.state.maxPage && this.state.maxPage !== this.state.minPage) {
      
      // Формируем набор, начнем с перехода на первую страницу, потом страницы и в конце переход на последнию страницу
      const items = [{ id: ID_FIRST, title: '<<' }];
      for (let page = this.state.minPage; page <= this.state.maxPage; page++) {
        items.push({ id: page, title: page });
      }
      items.push({ id: ID_LAST, title: '>>'})

      // Формируем пагинатор из набора
      pagination = <GroupButtons selectedKey = { page }
                                 items = { items }
                                 handleChange = { this.handlePageChange }/>
    }
    return (
      <div>
        { pagination }
      </div>
    );
  }
}

export default Pagination;