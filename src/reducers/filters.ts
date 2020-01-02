const initialState = {
    filter: 'all',
    sorting: 'date',
    page: 1,
    pagesCount: null
};;

export default function(state = initialState, action) {
    if (action.type === 'CHANGE_FILTER') {
        return {
            ...state,
            filter: action.payload, 
            page: 1, 
            pagesCount: null,
        };
    } else if (action.type === 'CHANGE_SORTING') {
        return {
            ...state,
            sorting: action.payload, 
            page: 1, 
            pagesCount: null,
        };
    } else if (action.type === 'CHANGE_PAGE') {
        return {
            ...state,
            page: action.payload,
        };
    } else if (action.type === 'CHANGE_COUNT_PAGES') {
        return {
            ...state,
            pagesCount: action.payload,
        }
    }
    return state;
}