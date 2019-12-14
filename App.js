import React, { Component } from 'react';
import Table from './Table'
import FilterBtns from './FilterBtns'
import SortingDrpdown from './SortingDrpdown'
import PaginationBar from './PaginationBar'
import Data from './data.json';

const MOBILE_WIDTH_SCREEN = 768;
const MIDDLE_WIDTH_SCREEN = 1024;
const PAGE_SIZE = 10;

class App extends Component {
    constructor(props) {
        super(props);

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleSortingChange = this.handleSortingChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        
        // Связываем функцию обрабатывающию смену размера
        this.setSize = this.setSize.bind(this);

        this.state = {
            data: Data.map(item => {
                item.date = new Date(item.date);
                return item;
            }).sort((prev, curr) => curr.date - prev.date),
            filter: 'all',
            sorting: 'date',
            page: 1,
            maxPage: Math.ceil(Data.length / PAGE_SIZE),
            size: null
        };
    }
    
    // Метод формирующий размеры приложения в зависимоти от ширины
    setSize() {
        const width = window.innerWidth;
        this.setState(() => {
            let size;
            if (width < MOBILE_WIDTH_SCREEN) {
                size = 'sm';
            } else if (width < MIDDLE_WIDTH_SCREEN) {
                size = 'md';
            } else {
                size = 'lg';
            }
            return {size};
          });
    }

    componentDidMount() {
        this.setSize();
        window.addEventListener("resize", this.setSize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.setSize);
    }

    // Метод обработчик изменения фильтра
    handleFilterChange(filter) {
        this.setState((state) => {
            // При смене фильтра сразу отберем данные и отсортируем, что не делать этого при каждой смене страницы
            let data = Data.map(item => {
                item.date = new Date(item.date);
                return item;
            });
            if (filter !== 'all') {
                data = data.filter(item => item.type === filter);
            }
            data.sort((prev, curr) => curr[state.sorting] - prev[state.sorting]);
            const maxPage = Math.ceil(data.length / PAGE_SIZE);
            return { data, filter, page: 1, maxPage };
        });
    }

    // Метод обработчик изменения сотриовки
    handleSortingChange(sorting) {
        // При смене сортировки сразу отсортируем данные, что не делать этого при каждой смене страницы
        this.setState((state) => {
            return {
                data: state.data.sort((prev, curr) => curr[sorting] - prev[sorting]),
                sorting,
                page: 1
            };
        });
    }

    // Метод обработчик изменения страницы
    handlePageChange(page) {
        this.setState({ page });
    }

    render() {
        const { filter, sorting, page, size } = this.state;
        // Обрежем данные под страницу
        const data = this.state.data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
        return (
            <div className="py-4 px-4">
                <div className = 'd-flex justify-content-between pb-5 flex-md-row flex-column'>
                    <div className = 'pr-md-3 pb-md-5 pb-2'>
                        <FilterBtns size = { size }
                                    selectedKey = { filter }
                                    items = {[
                                        { id: 'all', title: 'Все заказы' },
                                        { id: 'avia', title: 'Авиабилеты' },
                                        { id: 'hotel', title: 'Отели' },
                                        { id: 'railways', title: 'ЖД билеты' },
                                        { id: 'cars', title: 'Аренда авто' }
                                    ]}
                                    onClick = { this.handleFilterChange }/>
                    </div>
                    <div className='pb-5'>
                        <SortingDrpdown size = { size }
                                        selectedKey = { sorting }
                                        items = {[
                                            { id: 'date', title: 'По дате создания' },
                                            { id: 'amount', title: 'По стоимости' }
                                        ]}
                                        onChange = {this.handleSortingChange}/>
                    </div>
                </div>
                <div>
                    <Table data = { data }/>
                </div>
                <div>
                    <PaginationBar size = { size } 
                                page = { this.state.page } 
                                maxPage = { this.state.maxPage }
                                onClick = {this.handlePageChange}/>
                </div>
            </div>
        );
    }
};

export default App;