import { IFilterState } from './IFilterState';
import { IListItem } from '../components/ITable';

export interface IDataState {
    data?: IListItem[],
    pagesCount?: number,
    filters: IFilterState,
};

export interface IDataAction {
    type: string,
    payload?: IDataState
};
