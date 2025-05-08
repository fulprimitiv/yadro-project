import reducer from '../../store/reducers';
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  CLEAR_DATA,
  SELECT_ROW
} from '../../store/types/actionTypes';

describe('reducer', () => {
  const initialState = {
    data: [],
    loading: false,
    error: null,
    selectedRowId: null
  };

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('должен обрабатывать FETCH_DATA_REQUEST', () => {
    const action = { type: FETCH_DATA_REQUEST };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('должен обрабатывать FETCH_DATA_SUCCESS', () => {
    const mockData = [
      {
        name: "Процессор Intel Core i9",
        performance: 95,
        powerConsumption: 125,
        temperature: 75,
        price: 48000,
        reliability: 92,
        marketShare: 45,
        customerRating: 4.8
      }
    ];

    const action = {
      type: FETCH_DATA_SUCCESS,
      payload: mockData
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      data: mockData,
      loading: false
    });
  });

  it('должен обрабатывать FETCH_DATA_FAILURE', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = {
      type: FETCH_DATA_FAILURE,
      payload: errorMessage
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      error: errorMessage,
      loading: false
    });
  });

  it('должен обрабатывать CLEAR_DATA', () => {
    const stateWithData = {
      ...initialState,
      data: [{ name: 'Процессор Intel Core i9' }],
      selectedRowId: 0
    };

    const action = { type: CLEAR_DATA };

    expect(reducer(stateWithData, action)).toEqual(initialState);
  });

  it('должен обрабатывать SELECT_ROW', () => {
    const action = {
      type: SELECT_ROW,
      payload: 2
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      selectedRowId: 2
    });
  });
});