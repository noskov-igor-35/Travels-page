import * as React from 'react';
import MenuItem from "./Dropdown/MenuItem";
import { IGroupBtnProps, IGroupBtnItem } from '../interfaces/components/IGroupBtns';
import { IDropdownState } from '../interfaces/components/IDropdown';
import './Dropdown/Dropdown.less'

class Dropdown extends React.Component<IGroupBtnProps, IDropdownState> {
    constructor(props: IGroupBtnProps) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
        dropdownOpen: false
        }
    }

    // Метод открытия / скрытия выпадашки
    toggle(): void {
        this.setState((state: IDropdownState): IDropdownState => {
        return { dropdownOpen: !state.dropdownOpen };
        });
    }

    render (): JSX.Element {
        let title: string;
        let titles: JSX.Element[]= [];
        
        // Сформируем набор значений
        const items:JSX.Element[] = this.props.items.map((item:IGroupBtnItem):JSX.Element => {
            const isSelected: boolean = item.id === this.props.selectedKey;

            // При встрече выбранного значения проставим заголовок, чтобы дважды не искать
            if (isSelected) {
                title = item.title;
            }

            // Запоминаем все знечения и складываем их в шапку для фиксации ширины
            titles.push(<div key = { item.id } className='Dropdown__Btn-fix '>{ item.title }</div>);

            return (
                <MenuItem isSelected={ isSelected } 
                        key = { item.id }
                        id = { item.id }
                        title={ item.title }
                        handleClick = { this.props.handleChange }/>
            );
        });
        
        return (
            <div className='Dropdown' onClick = { this.toggle }>
                <div className={`Dropdown__Btn${ this.state.dropdownOpen ? ' Dropdown__Btn_open' : '' } padding--m`}>
                    { title }
                </div>
                <div className='padding-left--m padding-right--m'>{ titles }</div>
                <div className={`Dropdown__List${ this.state.dropdownOpen ? ' Dropdown__List_open' : '' }`}>
                    { items }
                </div>
            </div>
        );
    };
}

export default Dropdown;
