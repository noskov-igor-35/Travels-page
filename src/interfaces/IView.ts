import { IListItem } from './ITable';
import { IState }  from './IState'

export interface IViewProps extends IState{
    onChangePageCount: Function,
};

export interface IViewState {
    data: IListItem[],
};