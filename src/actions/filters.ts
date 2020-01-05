export function changeFilter(filter) {
    return {
        type: 'CHANGE_FILTERS',
        payload: {
            filter,
            page: 1,
            pagesCount: null
        }
    }
}

export function changeSorting(sorting) {
    return {
        type: 'CHANGE_FILTERS',
        payload: {
            sorting,
            page: 1,
            pagesCount: null
        }
    }
}

export function changePage(page) {
    return {
        type: 'CHANGE_FILTERS',
        payload: {
            page,
        }
    }
}

export function changePagesCount(pagesCount) {
    return {
        type: 'CHANGE_FILTERS',
        payload: {
            pagesCount,
        }
    }
}