document.addEventListener('DOMContentLoaded', () => {
    const createStd = (stdData) => {
        const {id, fio, date, photo} = stdData;
        const std = document.createElement('div');
        std.className = 'student';
        std.innerHTML = `
            <h2 class="student__title">${fio}</h2>
             <div class="student__data-wrapper">
                <span class="student__data">ID:</span>
                <span class="student__value">${id}</span>
             </div>
             <div class="student__data-wrapper">
                 <span class="student__data">Дата сдачи:</span>
                 <span class="student__value">${date}</span>
             </div>
            
             <button class="button" data-toggle="modal" data-target="#studentModal">Подробнее</button>
       `;

        return std;
    };

    $('#studentModal').on('shown.bs.modal', function (e) {
        const studentId = e.relatedTarget
            .closest('.student')
            .querySelector('.student__value')
            .textContent;

        fetch(`http://goiteens.club/hse/back/students.php?id=${studentId}`)
            .then(data => data.json())
            .then(data => {
                const {date, email, fio, school, id, cv, sertificate, competitions, tel } = data;
                const modalTitle = document.querySelector('#studentModal .modal-title');
                const tableBody = document.querySelector('#studentModal .table-body');

                const itschoolElem = document.querySelector('#studentModal .it-school .student-info-value');
                const phoneElem = document.querySelector('#studentModal .phone .student-info-value');
                const emailElem = document.querySelector('#studentModal .email .student-info-value');
                const idElem = document.querySelector('#studentModal .id .student-info-value');
                const cvElem = document.querySelector('#studentModal .cv');
                const sertificateElem = document.querySelector('#studentModal .sertificate');

                idElem.textContent = id || 'Отсутствует';
                emailElem.textContent = email || "Отсутствует";
                phoneElem.textContent = tel || "Отсутствует";
                itschoolElem.textContent = school || "Отсутствует";

                if (cv) {
                    cvElem.href = cv;
                    cvElem.innerHTML = 'Открыть';
                } else {
                    cvElem.href = '#';
                    cvElem.innerHTML = 'Отсутствует';
                }

                if (sertificate) {
                    sertificateElem.href = sertificate;
                    sertificateElem.innerHTML = 'Открыть';
                } else {
                    sertificateElem.href = '#';
                    sertificateElem.innerHTML = 'Отсутствует';
                }

                let competitionsRow = '';
                for (const comp of competitions) {
                    competitionsRow += `<td class="table-data">${comp}</td>`
                }

                tableBody.innerHTML = `<tr class="table-row">
                    ${competitionsRow}
                    <td class="table-data">${date}</td>
                </tr>`

                modalTitle.innerHTML = fio;
            });
    });

    const handleButtonClick = (type = 'all') => {
        fetch('http://goiteens.club/hse/back/students.php')
            .then(data => data.json())
            .then(data => {
                const studentsWrapper = document.querySelector('.students')
                studentsWrapper.innerHTML = '';

                if (type !== 'all') {
                    for (let i = 0; i < data.length; i++) {
                        const studentType = data[i].competitionType.toLowerCase();
                        if (studentType === type) {
                            const newStd = createStd(data[i]);
                            studentsWrapper.append(newStd);
                        }
                    }
                } else {
                    for (let i = 0; i < data.length; i++) {
                        const newStd = createStd(data[i]);
                        studentsWrapper.append(newStd);
                    }
                }
            });
    };
    const getAllStudents = () => handleButtonClick('all');

    getAllStudents();
});