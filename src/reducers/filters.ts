import { IFilterState, IFilterAction } from '../interfaces/reducers/IFilterState';

const initialState: IFilterState = {
    filter: 'all',
    sorting: 'date',
    page: 1,
};;

export default function(state: IFilterState = initialState, action: IFilterAction): IFilterState {
    if (action.type === 'CHANGE_FILTERS') {
        return {
            ...state,
            ...action.payload,
        };
    }
    return state;
}
