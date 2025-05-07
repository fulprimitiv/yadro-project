import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRow } from '../store/actions';

export const useAutoSelectMaxRow = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  useEffect(() => {
    if (data && data.length > 0) {
      const maxRow = data.reduce((prev, current) =>
        prev.value > current.value ? prev : current
      );
      dispatch(selectRow(maxRow.id));
    }
  }, [data, dispatch]);
};
