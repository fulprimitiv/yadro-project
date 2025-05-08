import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { fetchData, clearData, selectRow, exportToCsv } from '../../store/actions';
import { fetchDataFromApi } from '../../services/api';
import { exportTableToCsv } from '../../services/csvExport';
import {
	FETCH_DATA_REQUEST,
	FETCH_DATA_SUCCESS,
	FETCH_DATA_FAILURE,
	CLEAR_DATA,
	SELECT_ROW,
	EXPORT_TO_CSV
} from '../../store/types/actionTypes';

jest.mock('../../services/api');
jest.mock('../../services/csvExport');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('fetchData', () => {
		it('должен создавать FETCH_DATA_SUCCESS при успешной загрузке данных', async () => {
			const mockData = [{ id: 1, name: 'Элемент-1', value: 42 }];
			fetchDataFromApi.mockResolvedValue(mockData);

			const expectedActions = [
				{ type: FETCH_DATA_REQUEST },
				{ type: FETCH_DATA_SUCCESS, payload: mockData },
				{ type: SELECT_ROW, payload: 0 }
			];

			const store = mockStore({ data: [] });
			await store.dispatch(fetchData());
			expect(store.getActions()).toEqual(expectedActions);
		});

		it('должен создавать FETCH_DATA_FAILURE при ошибке загрузки', async () => {
			const errorMessage = 'Ошибка загрузки';
			fetchDataFromApi.mockRejectedValue(new Error(errorMessage));

			const expectedActions = [
				{ type: FETCH_DATA_REQUEST },
				{ type: FETCH_DATA_FAILURE, payload: errorMessage }
			];

			const store = mockStore({ data: [] });
			await store.dispatch(fetchData());
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	describe('clearData', () => {
		it('должен создавать действие CLEAR_DATA', () => {
			const expectedAction = { type: CLEAR_DATA };
			expect(clearData()).toEqual(expectedAction);
		});
	});

	describe('selectRow', () => {
		it('должен создавать действие SELECT_ROW с правильным payload', () => {
			const rowId = 3;
			const expectedAction = {
				type: SELECT_ROW,
				payload: rowId
			};
			expect(selectRow(rowId)).toEqual(expectedAction);
		});
	});

	describe('exportToCsv', () => {
		it('должен вызывать exportTableToCsv и создавать действие EXPORT_TO_CSV', () => {
			const mockData = [{ id: 1, name: 'Элемент-1', value: 42 }];
			const store = mockStore({ data: mockData });

			store.dispatch(exportToCsv());

			expect(exportTableToCsv).toHaveBeenCalledWith(mockData, expect.any(String));
			expect(store.getActions()).toEqual([{ type: EXPORT_TO_CSV }]);
		});

		it('не должен вызывать exportTableToCsv если данных нет', () => {
			const store = mockStore({ data: [] });

			store.dispatch(exportToCsv());

			expect(exportTableToCsv).not.toHaveBeenCalled();
			expect(store.getActions()).toEqual([{ type: EXPORT_TO_CSV }]);
		});
	});
});