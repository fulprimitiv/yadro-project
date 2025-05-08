import { fetchDataFromApi } from '../../services/api';

describe('API Service', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('должен возвращать данные после задержки', async () => {
		const dataPromise = fetchDataFromApi();

		jest.advanceTimersByTime(1000);

		const data = await dataPromise;

		expect(Array.isArray(data)).toBe(true);
		expect(data.length).toBeGreaterThan(0);

		const firstItem = data[0];
		expect(firstItem).toHaveProperty('name');
		expect(firstItem).toHaveProperty('performance');
		expect(firstItem).toHaveProperty('powerConsumption');
		expect(firstItem).toHaveProperty('temperature');
		expect(firstItem).toHaveProperty('price');
		expect(firstItem).toHaveProperty('reliability');
		expect(firstItem).toHaveProperty('marketShare');
		expect(firstItem).toHaveProperty('customerRating');
	});
});