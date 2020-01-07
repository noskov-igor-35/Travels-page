import RequestPath from '../requestPath';
import { IDataAction } from '../interfaces/reducers/IDataState';
import { IFilterState } from '../interfaces/reducers/IFilterState';
import { IListItem } from '../interfaces/components/ITable';
import { Dispatch } from 'react';

const PAGE_SIZE: number = 10;

export function updateFulters(filters: IFilterState): IDataAction {
    return {
        type: 'UPDATE_FILTERS',
        payload: {
            filters
        },
    };
}

export function changeData (filters: IFilterState): Function {
    const { sorting, filter, page} = filters;
    return (dispatch: Dispatch<IDataAction>): void => {
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

            dispatch({
                type: 'CHANGE_DATA', 
                payload: {
                    data: data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
                    pagesCount: Math.ceil(data.length / PAGE_SIZE),
                    filters
                }
            })
        });
    }
}