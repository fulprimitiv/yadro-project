// Функция для экспорта данных в CSV
export const exportTableToCsv = (data, filename) => {
  // Заголовки CSV
  const headers = ['ID', 'Название', 'Значение'];

  // Преобразуем данные в строки CSV
  const csvRows = [
    headers.join(','), // Заголовки
    ...data.map((row) => [row.id, row.name, row.value].join(',')), // Данные
  ];

  // Объединяем строки в одну строку с переносами
  const csvString = csvRows.join('\n');

  // Создаем Blob с данными CSV
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

  // Создаем ссылку для скачивания
  const link = document.createElement('a');

  // Поддержка для разных браузеров
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    // Для других браузеров
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
