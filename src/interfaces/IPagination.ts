export interface IPaginationProps {
    page: number,
    pagesCount: number,
    onChangePage: Function,
};
export interface IPaginationState {
    minPage: number,
    maxPage: number,
};
