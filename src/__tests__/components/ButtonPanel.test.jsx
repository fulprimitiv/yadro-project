import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import ButtonPanel from '../../components/ButtonPanel';
import * as actions from '../../store/actions';

jest.mock('../../store/actions', () => ({
	fetchData: jest.fn(() => ({ type: 'MOCKED_FETCH_DATA' })),
	clearData: jest.fn(() => ({ type: 'MOCKED_CLEAR_DATA' })),
	exportToCsv: jest.fn(() => ({ type: 'MOCKED_EXPORT_TO_CSV' }))
}));

const mockStore = configureMockStore([thunk]);

describe('ButtonPanel', () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			data: [],
			loading: false,
			error: null,
			selectedRowId: null
		});

		jest.clearAllMocks();
	});

	it('должен рендерить все кнопки', () => {
		render(
			<Provider store={store}>
				<ButtonPanel />
			</Provider>
		);

		expect(screen.getByText('Получить данные')).toBeInTheDocument();
		expect(screen.getByText('Очистить данные')).toBeInTheDocument();
		expect(screen.getByText('Сохранить в CSV')).toBeInTheDocument();
	});

	it('должен вызывать fetchData при клике на кнопку "Получить данные"', () => {
		render(
			<Provider store={store}>
				<ButtonPanel />
			</Provider>
		);

		fireEvent.click(screen.getByText('Получить данные'));
		expect(actions.fetchData).toHaveBeenCalled();
	});

	it('должен вызывать clearData при клике на кнопку "Очистить данные"', () => {
		render(
			<Provider store={store}>
				<ButtonPanel />
			</Provider>
		);

		fireEvent.click(screen.getByText('Очистить данные'));
		expect(actions.clearData).toHaveBeenCalled();
	});

	it('должен вызывать exportToCsv при клике на кнопку "Сохранить в CSV"', () => {
		render(
			<Provider store={store}>
				<ButtonPanel />
			</Provider>
		);

		fireEvent.click(screen.getByText('Сохранить в CSV'));
		expect(actions.exportToCsv).toHaveBeenCalled();
	});
});