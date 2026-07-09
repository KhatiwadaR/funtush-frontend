export const exportToCsv = <T extends object>(data: T[], fileName: string) => {
  if (!data.length) return;

  const headers = Object.keys(data[0]) as (keyof T)[];

  const csvRows = [
    headers.join(','),
    ...data.map((row) => headers.map((header) => `"${String(row[header] ?? '').replace(/"/g, '""')}"`).join(',')),
  ];

  const csvContent = csvRows.join('\n');

  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.csv`;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
