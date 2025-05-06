import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/components/Chart.css';

const Chart = () => {
	const { data, selectedRowId } = useSelector(state => state);

	// Находим выбранную строку
	const selectedRow = data.find(item => item.id === selectedRowId);

	// Подготавливаем данные для графика
	const chartData = selectedRow
		? [{ name: selectedRow.name, value: selectedRow.value }]
		: [];

	return (
		<div className="chart-container">
			<h2>График данных</h2>
			{selectedRow ? (
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={chartData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
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
