import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRow } from '../store/actions';
import '../styles/components/Table.css';

const Table = () => {
  const { data, loading, error, selectedRowId } = useSelector((state) => state);
  const dispatch = useDispatch();

  if (loading) {
    return <div className="loading">Загрузка данных...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="table-container">
        <h2>Таблица данных</h2>
        <div className="no-data">Нет данных для отображения</div>
      </div>
    );
  }

  const formatValue = (value) => {
    return typeof value === 'number' ? value.toLocaleString() : value;
  };

  return (
    <div className="table-container">
      <h2>Таблица данных</h2>
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Производительность</th>
            <th>Энергопотребление</th>
            <th>Температура</th>
            <th>Цена</th>
            <th>Надежность</th>
            <th>Доля рынка</th>
            <th>Рейтинг</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={selectedRowId === index ? 'selected' : ''}
              onClick={() => dispatch(selectRow(index))}
            >
              <td>{row.name}</td>
              <td>{formatValue(row.performance)}</td>
              <td>{formatValue(row.powerConsumption)}</td>
              <td>{formatValue(row.temperature)}</td>
              <td>{formatValue(row.price)}</td>
              <td>{formatValue(row.reliability)}</td>
              <td>{formatValue(row.marketShare)}</td>
              <td>{formatValue(row.customerRating)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
