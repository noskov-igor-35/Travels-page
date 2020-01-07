import { IListItem } from '../components/ITable';
import { IFilterState }  from '../reducers/IFilterState';

export interface IViewProps extends IFilterState{
    data: IListItem[],
    updateDate: Function,
    changeData: Function,
};