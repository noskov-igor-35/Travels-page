export interface IListItem {
    orderNumber: string, 
    type: string, 
    date: Date, 
    amount: number,
};

export interface ITableProps {
    data: IListItem[],
};
