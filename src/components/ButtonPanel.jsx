import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchData, clearData, exportToCsv } from '../store/actions';
import '../styles/components/ButtonPanel.css';

const ButtonPanel = () => {
	const dispatch = useDispatch();

	return (
		<>
			<h1>Тестовое задание для компании YADRO™</h1>
			<div className="button-panel">
				<button
					onClick={() => dispatch(fetchData())}
					className="button button-primary"
				>
					Получить данные
				</button>
				<button
					onClick={() => dispatch(clearData())}
					className="button button-secondary"
				>
					Очистить данные
				</button>
				<button
					onClick={() => dispatch(exportToCsv())}
					className="button button-success"
				>
					Сохранить в CSV
				</button>
			</div>
		</>
	);
};

export default ButtonPanel;
