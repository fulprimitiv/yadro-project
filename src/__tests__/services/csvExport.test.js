import { exportTableToCsv } from '../../services/csvExport';

describe('CSV Export Service', () => {
	let originalCreateObjectURL;
	let originalAppendChild;
	let originalRemoveChild;
	let mockLink;

	beforeEach(() => {
		originalCreateObjectURL = URL.createObjectURL;
		originalAppendChild = document.body.appendChild;
		originalRemoveChild = document.body.removeChild;

		mockLink = {
			href: '',
			download: '',
			click: jest.fn()
		};

		window.Blob = jest.fn((content, options) => ({
			content,
			options
		}));

		URL.createObjectURL = jest.fn(() => 'mock-url');

		document.createElement = jest.fn(() => mockLink);

		document.body.appendChild = jest.fn();
		document.body.removeChild = jest.fn();
	});
	afterEach(() => {
		URL.createObjectURL = originalCreateObjectURL;
		document.body.appendChild = originalAppendChild;
		document.body.removeChild = originalRemoveChild;
	});

	it('должен создавать CSV файл с правильными заголовками и данными', () => {
		const testData = [
			{ id: 1, name: 'Элемент-1', value: 42 }
		];

		const filename = 'test.csv';

		exportTableToCsv(testData, filename);

		expect(window.Blob).toHaveBeenCalled();

		expect(mockLink.download).toBe(filename);
		expect(mockLink.href).toBe('mock-url');

		expect(document.body.appendChild).toHaveBeenCalledWith(mockLink);
		expect(mockLink.click).toHaveBeenCalled();
		expect(document.body.removeChild).toHaveBeenCalledWith(mockLink);
	});

	it('должен обрабатывать пустой массив данных', () => {
		const testData = [];
		const filename = 'empty.csv';

		exportTableToCsv(testData, filename);

		expect(window.Blob).toHaveBeenCalled();
		expect(mockLink.click).toHaveBeenCalled();
	});
});
