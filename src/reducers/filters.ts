import { IState, IAction } from '../interfaces/IState'

const initialState: IState = {
    filter: 'all',
    sorting: 'date',
    page: 1,
    pagesCount: null
};;

export default function(state: IState = initialState, action: IAction): IState {
    if (action.type === 'CHANGE_FILTERS') {
        return {
            ...state,
            ...action.payload,
        };
    }
    return state;
}
