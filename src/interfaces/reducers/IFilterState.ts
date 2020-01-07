export interface IFilterState {
    filter?: string,
    sorting?: string,
    page?: number,
};

export interface IFilterAction {
    type: string,
    payload?: IFilterState
};
