import * as React from 'react';
import { connect } from 'react-redux';
import { IPaginationProps, IPaginationState } from '../../interfaces/IPagination';
import GroupButtons from '../../components/GroupButtons'

const DELTA_SHOW_PAGES: number = 2;
const ID_FIRST: string = 'first';
const ID_LAST: string = 'last';

class Pagination extends React.Component<IPaginationProps, IPaginationState> {
  // Метод клика, отсылает id во внешний обработчик
  handlePageChange(page: string) {
    this.props.onChangePage(page === ID_FIRST ? 1 : page === ID_LAST ? this.props.pagesCount : Number(page));
  }

  constructor(props: IPaginationProps) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      minPage: null,
      maxPage: null
    };
  }

  static getDerivedStateFromProps(props: IPaginationProps): IPaginationState {
    // При изменении props обновим крайние значения
    return {
      minPage: props.page - DELTA_SHOW_PAGES > 0 ? props.page - DELTA_SHOW_PAGES : 1,
      maxPage: props.page + DELTA_SHOW_PAGES < props.pagesCount ? props.page + DELTA_SHOW_PAGES : props.pagesCount
    }
  }

  render(): JSX.Element {
    const { page } = this.props;
    let pagination;

    // Если пришла максимальная страница и вычислина ширина, то сфомируем пагинацию
    if (this.state.maxPage && this.state.maxPage !== this.state.minPage) {
      
      // Формируем набор, начнем с перехода на первую страницу, потом страницы и в конце переход на последнию страницу
      const items = [{ id: ID_FIRST, title: '<<' }];
      for (let page = this.state.minPage; page <= this.state.maxPage; page++) {
        items.push({ id: `${ page }`, title: `${ page }` });
      }
      items.push({ id: ID_LAST, title: '>>'})

      // Формируем пагинатор из набора
      pagination = <GroupButtons selectedKey = { `${page}` }
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

export default connect(
  state => ({
    page: state.page,
    pagesCount: state.pagesCount,
  }),
  dispatch => ({
    onChangePage: (page) => {
      dispatch({ type: 'CHANGE_PAGE', payload: page });
    }
  })
)(Pagination);