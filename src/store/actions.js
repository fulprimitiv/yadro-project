import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  CLEAR_DATA,
  SELECT_ROW,
  EXPORT_TO_CSV,
} from './types/actionTypes';
import { fetchDataFromApi } from '../services/api';
import { exportTableToCsv } from '../services/csvExport';

// Действие для запроса данных
export const fetchData = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });

    try {
      const data = await fetchDataFromApi();
      dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: data,
      });

      // Автоматически выбираем строку с максимальным значением
      if (data.length > 0) {
        const maxRow = data.reduce((prev, current) =>
          prev.value > current.value ? prev : current
        );
        dispatch(selectRow(maxRow.id));
      }
    } catch (error) {
      dispatch({
        type: FETCH_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};

// Действие для очистки данных
export const clearData = () => {
  return {
    type: CLEAR_DATA,
  };
};

// Действие для выбора строки
export const selectRow = (id) => {
  return {
    type: SELECT_ROW,
    payload: id,
  };
};

// Действие для экспорта в CSV
export const exportToCsv = () => {
  return (dispatch, getState) => {
    const { data } = getState();

    if (data && data.length > 0) {
      exportTableToCsv(data, 'table-data.csv');
    }

    dispatch({
      type: EXPORT_TO_CSV,
    });
  };
};
