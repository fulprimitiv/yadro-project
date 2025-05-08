import React from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import '../styles/components/Chart.css';

const Chart = () => {
  const { data, selectedRowId } = useSelector((state) => state);

  const selectedRow = selectedRowId !== null && data.length > 0
    ? data[selectedRowId]
    : null;

  const chartData = selectedRow
    ? [
      { category: 'Произв. (GHz)', value: selectedRow.performance },
      { category: 'Энергия (Вт)', value: selectedRow.powerConsumption },
      { category: 'Темп. (°C)', value: selectedRow.temperature },
      { category: 'Цена (т.₽)', value: selectedRow.price / 1000 },
      { category: 'Надежн. (%)', value: selectedRow.reliability },
      { category: 'Доля рынка (%)', value: selectedRow.marketShare },
      { category: 'Рейтинг (×20)', value: selectedRow.customerRating * 20 },
    ]
    : [];

  return (
    <div className="chart-container">
      <h2>График данных: {selectedRow ? selectedRow.name : ''}</h2>
      {selectedRow ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="chart-placeholder">
          Выберите строку в таблице для отображения данных
        </div>
      )}
    </div>
  );
};

export default Chart;
