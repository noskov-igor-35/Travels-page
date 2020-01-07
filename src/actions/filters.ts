import { IFilterAction } from '../interfaces/reducers/IFilterState';

export function changeFilter(filter: string): IFilterAction {
    return {
        type: 'CHANGE_FILTERS',
        payload: {
            filter,
            page: 1,
        },
    };
}

export function changeSorting(sorting: string): IFilterAction {
    return {
        type: 'CHANGE_FILTERS',
        payload: {
            sorting,
            page: 1,
        }
    };
}

export function changePage(page: number): IFilterAction {
    return {
        type: 'CHANGE_FILTERS',
        payload: {
            page,
        }
    };
}