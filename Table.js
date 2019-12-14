import React from 'react';

const DOUBLE_DIGIT = 10;

function Table(props) {
  // Формируем набор данных
  let items;
  if (props.data.length) {
    items = props.data.map(item => {
      // Сформируем даты в нужных форматах
      const day = item.date.getDate() < DOUBLE_DIGIT ? `0${ item.date.getDate() }` : item.date.getDate();
      const month = item.date.getMonth() + 1 < DOUBLE_DIGIT
        ? `0${ item.date.getMonth() + 1 }`
        : item.date.getMonth() + 1;
      const hour = item.date.getHours() < DOUBLE_DIGIT ? `0${ item.date.getHours() }` : item.date.getHours();
      const minutes = item.date.getMinutes() < DOUBLE_DIGIT ? `0${ item.date.getMinutes() }` : item.date.getMinutes();
      
      // Переведенм тип на русский язык
      let type;
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
      return <tr key = { item.orderNumber }>
        <th scope="row"> { item.orderNumber } </th>
        <td> { type } </td>
        <td> { `${ day }.${ month }.${ item.date.getFullYear() } ${ hour }:${ minutes }` } </td>
        <td>
          <div className='d-flex justify-content-end'>{ `${item.amount.toLocaleString('ru-RU')} ₽` }</div>
        </td>
      </tr>
    })
  }

  // Если есть данные выведем таблицу, иначе заглушку
  const content = props.data.length ? <table className="table table-responsive-sm">
      <thead>
        <tr>
          <th width="auto" scope="col">#</th>
          <th nowrap="true" width="auto" scope="col">Вид заказа</th>
          <th width="60%" scope="col">Дата</th>
          <th width="auto" scope="col">
            <div className='d-flex justify-content-end'>Стоимость</div>
          </th>
        </tr>
      </thead>
      <tbody>
        { items }
      </tbody>
    </table> : <div className='d-flex justify-content-center py-5'><b>Нет данных</b></div>
  return content;
}

export default Table;
