// Имитация API-запроса
export const fetchDataFromApi = async () => {
	// В реальном приложении здесь был бы fetch-запрос к серверу
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{ id: 1, name: 'Элемент 1', value: 42 },
				{ id: 2, name: 'Элемент 2', value: 17 },
				{ id: 3, name: 'Элемент 3', value: 73 },
				{ id: 4, name: 'Элемент 4', value: 29 },
				{ id: 5, name: 'Элемент 5', value: 56 }
			]);
		}, 1000); // Имитация задержки сети
	});
};