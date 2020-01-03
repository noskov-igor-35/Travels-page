import * as React from 'react';
import { IGroupBtnItem } from '../../interfaces/IGroupBtns';

class Button extends React.Component<IGroupBtnItem> {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    // Метод клика, отсылает id во внешний обработчик
    handleClick(): void {
        if (!this.props.isSelected) {
            this.props.handleClick(this.props.id);
        }
    }

    render(): JSX.Element {
        const colorClass: string = this.props.isSelected ? ' GroupButtons__item_active' : '';
        return (
            <div className={`GroupButtons__item${ colorClass } padding--m`} onClick = { this.handleClick }>
                { this.props.title } 
            </div>
        );
    }
}

export default Button;
