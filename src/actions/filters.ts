import { IAction } from '../interfaces/IState';

export function changeFilter(filter: string): IAction {
    return {
        type: 'CHANGE_FILTERS',
        payload: {
            filter,
            page: 1,
            pagesCount: null
        }
    }
}

export function changeSorting(sorting: string): IAction {
    return {
        type: 'CHANGE_FILTERS',
        payload: {
            sorting,
            page: 1,
            pagesCount: null
        }
    }
}

export function changePage(page: number): IAction {
    return {
        type: 'CHANGE_FILTERS',
        payload: {
            page,
        }
    }
}

export function changePagesCount(pagesCount: number): IAction {
    return {
        type: 'CHANGE_FILTERS',
        payload: {
            pagesCount,
        }
    }
}