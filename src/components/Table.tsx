import * as React from 'react';
import { ITableProps, IListItem } from '../interfaces/ITable';
import './Table/Table.less';

const DOUBLE_DIGIT = 10;

function Table(props: ITableProps):JSX.Element {
    // Формируем набор данных
    let items: JSX.Element[];
    if (props.data.length) {
        items = props.data.map((item: IListItem): JSX.Element => {
            // Сформируем даты в нужных форматах
            const day: string|number = item.date.getDate() < DOUBLE_DIGIT 
                ? `0${ item.date.getDate() }` 
                : item.date.getDate();
            const month: string|number = item.date.getMonth() + 1 < DOUBLE_DIGIT
                ? `0${ item.date.getMonth() + 1 }`
                : item.date.getMonth() + 1;
            const hour: string|number = item.date.getHours() < DOUBLE_DIGIT 
                ? `0${ item.date.getHours() }` 
                : item.date.getHours();
            const minutes: string|number = item.date.getMinutes() < DOUBLE_DIGIT 
                ? `0${ item.date.getMinutes() }` 
                : item.date.getMinutes();
            
            // Переведенм тип на русский язык
            let type: string;
            switch (item.type) {
                case 'avia':
                    type = 'Авиа';
                    break;
                case 'hotel':
                    type = 'Отель';
                    break;
                case 'railways':
                    type = 'ЖД';
                    break;
                default:
                    type = 'Авто';
            }

            // Соберем верстку для строки
            return (
                <tr key = { item.orderNumber }>
                    <th scope='row'>
                        <div className='flexbox'>{ item.orderNumber }</div>
                    </th>
                    <td>
                        <div className='flexbox justify-content--center'>{ type }</div>
                    </td>
                    <td>
                        <div className='flexbox justify-content--center'>
                            { `${ day }.${ month }.${ item.date.getFullYear() } ${ hour }:${ minutes }` }
                        </div>
                    </td>
                    <td>
                        <div className='flexbox justify-content--end'>
                            { `${item.amount.toLocaleString('ru-RU')} р.` }
                        </div>
                    </td>
                </tr>
            );
        });
    }

    // Если есть данные выведем таблицу, иначе заглушку
    const content: JSX.Element = props.data.length
        ? <table className='Table'>
            <thead>
                <tr>
                <th className='Table__idCol' scope='col'>
                    <div className='flexbox'>#</div>
                </th>
                <th className='Table__idCol' scope='col'>Вид заказа</th>
                <th className='Table__dateCol' scope='col'>Дата</th>
                <th className='Table__idCol' scope='col'>
                    <div className='flexbox justify-content--end'>Стоимость</div>
                </th>
                </tr>
            </thead>
            <tbody>
                { items }
            </tbody>
        </table>
        : <div className='flexbox justify-content--center padding-top--xxl'><b>Нет данных</b></div>
    return content;
}

export default Table;
