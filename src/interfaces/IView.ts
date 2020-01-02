import { IListItem } from './ITable';

export interface IViewProps {
    filter: string,
    sorting: string,
    page: number,
    pagesCount: number,
    onChangePageCount: Function,
};

export interface IViewState {
    data: IListItem[],
};