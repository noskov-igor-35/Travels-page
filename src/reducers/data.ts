import { IDataState, IDataAction } from '../interfaces/reducers/IDataState';


const initialState: IDataState = {
    data: null,
    pagesCount: null,
    filters: {
        filter: null,
        sorting: null,
        page: null,
    },
};;

export default function(state: IDataState = initialState, action: IDataAction): IDataState {
    const { type, payload } = action;
    
    if (type === 'UPDATE_FILTERS') {
        const { filter, sorting } = payload.filters;

        // Если фильтры не сопадют, то забываем кол-во страниц в таблице, иначе трем только данные
        if (state.filters.filter !== filter || state.filters.sorting !== sorting) {
            return {
                ...state,
                data: null,
                pagesCount: null,
                ...payload,
            };
        } else {
            return {
                ...state,
                data: null,
            };
        }
    } else if (type === 'CHANGE_DATA') {
        const { filter, sorting, page } = payload.filters;
        
        // Если последние считанные фильтры совпадают, то данные актуальны, проставим их
        if (state.filters.filter === filter || state.filters.sorting === sorting && state.filters.page === page) {
            return {
                ...state,
                ...payload,
            }
        }
    }

    return state;
}