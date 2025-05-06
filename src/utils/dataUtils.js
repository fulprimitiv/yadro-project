// Функция для поиска строки с максимальным значением
export const findMaxValueRow = (data) => {
	if (!data || data.length === 0) return null;

	return data.reduce((prev, current) =>
		(prev.value > current.value) ? prev : current
	);
};

// Функция для форматирования значений
export const formatValue = (value) => {
	return typeof value === 'number' ? value.toLocaleString() : value;
};