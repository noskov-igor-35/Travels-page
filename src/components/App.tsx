import * as React from 'react';
import { IPageState, IListItem } from '../interfaces';
import Table from './App/Table';
import GroupButtons from './App/GroupButtons';
import Dropdown from './App/Dropdown';
import Pagination from './App/GroupButtons/Pagination';
import RequestPath from '../requestPath';
import './App/App.less';

const PAGE_SIZE: number = 10;

class App extends React.Component<{}, IPageState> {
    constructor(props: {}) {
        super(props);

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleSortingChange = this.handleSortingChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);

        this.state = {
            data: null,
            filter: 'all',
            sorting: 'date',
            page: 1
        };
    }

    // Метод загрщуки данных, предпологаем что они могут меняться
    getData(filter: string, sorting: string, page: number): void {
        fetch(RequestPath)
        .then((res: any) => res.json())
        .then((res: IListItem[]) => {
            // Приводим к удобному формату
            let data: IListItem[] = res.map((item: IListItem) => {
                item.date = new Date(item.date);
                return item;
            });

            // Фильтруем данные
            if (filter !== 'all') {
                data = data.filter(item => item.type === filter);
            }

            // Сортируем
            data.sort((prev, curr) => curr[sorting] - prev[sorting]);

            //  Получем количество страниц
            const pagesCount: number = Math.ceil(data.length / PAGE_SIZE);

            // Сохранияем данные и связаное с ними состояние
            this.setState({data: {
                data: data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
                filter,
                sorting,
                page,
                pagesCount
            }});
        });
    }

    // Метод обработчик изменения фильтра
    handleFilterChange(filter: string): void {
        this.setState({ filter, page: 1 });
        this.getData(filter, this.state.sorting, 1);
    }

    // Метод обработчик изменения сотриовки
    handleSortingChange(sorting: string): void {
        this.setState({ sorting, page: 1 });
        this.getData(this.state.filter, sorting, 1);
    }

    // Метод обработчик изменения страницы
    handlePageChange(page: number): void {
        this.setState({ page });
        this.getData(this.state.filter, this.state.sorting, page);
    }

    shouldComponentUpdate(nextProp: {}, nextState: IPageState): boolean {
        // Если фильтры совподают с тебе на которых получены данныеб отрисовываем
        const { filter, sorting, page } = this.state;
        return filter === nextState.filter && sorting === nextState.sorting && page === nextState.page;
    }

    render(): JSX.Element {
        let page;
        // Если полцчили данные, то постоим верстку
        if (this.state.data) {
            const { data, pagesCount } = this.state.data;
            page = <div className='flexbox flex-direction--column padding--xl default-font-size'>
                <div className='flexbox justify-content--space-between flex-direction--column-sm'>
                    <div className='padding-bottom--l'>
                        <GroupButtons selectedKey = { this.state.filter }
                                      items = {[
                                          { id: 'all', title: 'Все заказы' },
                                          { id: 'avia', title: 'Авиабилеты' },
                                          { id: 'hotel', title: 'Отели' },
                                          { id: 'railways', title: 'ЖД билеты' },
                                          { id: 'cars', title: 'Аренда авто' }
                                      ]}
                                      handleChange = { this.handleFilterChange }/>
                    </div>
                    <div className='padding-bottom--l'>
                        <Dropdown selectedKey = { this.state.sorting }
                                  items = {[
                                      { id: 'date', title: 'По дате создания' },
                                      { id: 'amount', title: 'По стоимости' }
                                  ]}
                                  handleChange = {this.handleSortingChange}/>
                    </div>
                </div>
                <div className='padding-bottom--xl'>
                    <Table data = { data }/>
                </div>
                <div className='flexbox justify-content--center'>
                    <Pagination page = { this.state.page } 
                                maxPage = { pagesCount }
                                handleChange = {this.handlePageChange}/>
                </div>
            </div>;
        }
        
        return (
            <div className='App'>{ page }</div>
        )
    }

    // Первичная загрузка данных
    componentDidMount(): void {
        this.getData( this.state.filter, this.state.sorting, this.state.page);
    }
};

export default App;
