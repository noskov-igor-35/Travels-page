import * as React from 'react';
import Button from './GroupButtons/Button';
import { IGroupBtnProps, IGroupBtnItem } from '../interfaces/IGroupBtns';
import './GroupButtons/GroupButtons.less';

function GroupButtons (props: IGroupBtnProps):JSX.Element {
    // Сформируем набор кнопок
    const items: JSX.Element[] = props.items.map((item: IGroupBtnItem): JSX.Element => {
        // Выделим желтым выбранный фильтр
        const isSelected: boolean = item.id === props.selectedKey;
        return (
            <Button isSelected={ isSelected } 
                    key = { item.id }
                    id = { item.id }
                    title={ item.title }
                    handleClick = { props.handleChange }/>
        );
    });

    return <div className='GroupButtons flexbox'>{ items }</div>
}

export default GroupButtons;
