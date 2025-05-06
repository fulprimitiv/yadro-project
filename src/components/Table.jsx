import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRow } from '../store/actions';
import '../styles/components/Table.css';

const Table = () => {
	const { data, loading, error, selectedRowId } = useSelector(state => state);
	const dispatch = useDispatch();

	if (loading) {
		return <div className="loading">Загрузка данных...</div>;
	}

	if (error) {
		return <div className="error">Ошибка: {error}</div>;
	}

	if (!data || data.length === 0) {
		return <div className="table-container">
			<h2>Таблица данных</h2>
			<div className="no-data">Нет данных для отображения</div>
		</div>;
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
						<th>ID</th>
						<th>Название</th>
						<th>Значение</th>
					</tr>
				</thead>
				<tbody>
					{data.map(row => (
						<tr
							key={row.id}
							className={selectedRowId === row.id ? 'selected' : ''}
							onClick={() => dispatch(selectRow(row.id))}
						>
							<td>{row.id}</td>
							<td>{row.name}</td>
							<td>{formatValue(row.value)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
