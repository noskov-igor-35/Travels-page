export interface IState {
    filter?: string,
    sorting?: string,
    page?: number,
    pagesCount?: number,
};

export interface IAction {
    type: string,
    payload?: IState
};
