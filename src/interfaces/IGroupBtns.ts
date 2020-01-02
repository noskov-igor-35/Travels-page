export interface IGroupBtnItem {
    id: string,
    title: string,
    isSelected?: boolean,
    handleClick?: Function,
};
export interface IGroupBtnProps {
    selectedKey: string,
    items: IGroupBtnItem[],
    handleChange: Function,
};