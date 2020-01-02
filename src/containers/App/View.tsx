import * as React from 'react';
import { connect } from 'react-redux';
import { IViewProps, IViewState } from '../../interfaces/IView';
import { IListItem } from '../../interfaces/ITable';
import Table from '../../components/Table';
import Indicator from '../../components/Indicator';
import RequestPath from '../../requestPath';

const PAGE_SIZE: number = 10;

class Sorting extends React.Component<IViewProps, IViewState> {
    constructor(props: IViewProps) {
        super(props);
        this.state = {
            data: null
        }
    }

    // Метод загрщуки данных, предпологаем что они могут меняться
    getData(filter: string, sorting: string, page: number): void {
        //Сбросим данные
        this.setState({
            data: null,
        });

        fetch(RequestPath)
        .then((res: Response) => res.json())
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

            // Если состояние ещё акутально, сохранияем данные и обновим кол-во страниц
            if (filter === this.props.filter && sorting === this.props.sorting && page === this.props.page) {
                // Запоминаем состояние
                this.setState({
                    data: data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
                });
    
                // Получем количество страниц
                this.props.onChangePageCount(Math.ceil(data.length / PAGE_SIZE));
            }
        });
    }

    render(): JSX.Element {
        const {data} = this.state;
        const view = data ? <Table data={ data }/> : <Indicator/>
        return (
            <div>
                { view }
            </div>
        );
    }

    componentDidMount(): void {
        this.getData(this.props.filter, this.props.sorting, this.props.page);
    }

    componentDidUpdate(prevProps) {
        const {filter, sorting, page} = this.props;
        if (prevProps.filter !== filter || prevProps.sorting !== sorting || prevProps.page !== page) {
            this.getData(filter, sorting, page);
        }
    }
}

export default connect(
    state => ({
        ...state
    }),
    dispatch => ({
        onChangePageCount: (pagesCount) => {
            dispatch({ type: 'CHANGE_COUNT_PAGES', payload: pagesCount });
        }
    })
)(Sorting);