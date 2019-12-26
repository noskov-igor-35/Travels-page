export interface IListItem {
    orderNumber: string, 
    type: string, 
    date: Date, 
    amount: number,
};
interface IFilters {
    filter: string,
    sorting: string,
    page: number,
};
interface IData extends IFilters {
    data: IListItem[],
    pagesCount: number,
};
export interface IPageState extends IFilters {
    data: IData,
};
export interface IFilterItem {
    id: string,
    title: string,
    isSelected?: boolean,
    handleClick?: Function,
};
export interface IFilterProps {
    selectedKey: string,
    items: IFilterItem[],
    handleChange: Function,
};
export interface IDropdownState {
    dropdownOpen: boolean,
}
export interface IPaginationProps {
    page: number,
    maxPage: number,
    handleChange: Function,
};
export interface IPaginationState {
    minPage: number,
    maxPage: number,
};
export interface ITableProps {
    data: IListItem[],
};