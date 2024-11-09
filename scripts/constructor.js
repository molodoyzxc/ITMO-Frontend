document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tableForm');
    const tableContainer = document.getElementById('tableContainer');
    loadFormData();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const days = document.getElementById('days').value;
        const classesPerDay = document.getElementById('classesPerDay').value;
        const language = document.getElementById('language').value;

        if (classesPerDay > 10) {
            Toastify({
                text: language === 'ru' ? 'Ошибка: Уроков не может быть больше 10' : 'Error: Classes per day must not exceed 10',
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                backgroundColor: "red",
            }).showToast();
            return;
        }

        saveFormData(days, classesPerDay, language);
        generateTable(days, classesPerDay, language);
    });

    function saveFormData(days, classesPerDay, language) {
        const formData = {
            days,
            classesPerDay,
            language
        };
        localStorage.setItem('tableFormData', JSON.stringify(formData));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('tableFormData');
        if (savedData) {
            const { days, classesPerDay, language } = JSON.parse(savedData);
            document.getElementById('days').value = days;
            document.getElementById('classesPerDay').value = classesPerDay;
            document.getElementById('language').value = language;
        }
    }

    function generateTable(days, classesPerDay, language) {
        tableContainer.innerHTML = '';
        const table = document.createElement('table');
        table.classList.add('generated-table');
        const headerRow = document.createElement('tr');

        for (let i = 0; i <= classesPerDay; i++) {
            const headerCell = document.createElement('th');
            if (i === 0) {
                headerCell.textContent = language === 'ru' ? 'День' : 'Day';
            } else {
                headerCell.textContent = `${language === 'ru' ? 'Урок' : 'Class'} ${i}`;
            }
            headerRow.appendChild(headerCell);
        }
        table.appendChild(headerRow);

        for (let day = 1; day <= days; day++) {
            const row = document.createElement('tr');
            const dayCell = document.createElement('td');
            dayCell.textContent = `${language === 'ru' ? 'День' : 'Day'} ${day}`;
            row.appendChild(dayCell);

            for (let classNum = 1; classNum <= classesPerDay; classNum++) {
                const cell = document.createElement('td');
                cell.contentEditable = 'true';
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        tableContainer.appendChild(table);
    }
});
