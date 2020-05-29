document.addEventListener('DOMContentLoaded', () => {
    const buttonQA = document.querySelector('.button--qa');
    const buttonJS = document.querySelector('.button--js');
    const buttonJava = document.querySelector('.button--java');
    const buttonPython = document.querySelector('.button--python');

    const createStudent = (studentData) => {
        const { competitions, competitionType, date, id, average } = studentData;

        const infoStudent = document.createElement("tr");
        infoStudent.className = 'table-row';

        const averageFunc = () => {
            var average = 0;
            for (let i = 0; i < studentData.competitions.length; i++) {
                average += studentData.competitions[i];

            }
            average = Math.round(average / 7);

            return average;
        };


        infoStudent.innerHTML = `
                                    <td class="table-data id" data-toggle="modal" data-target="#studentModal">${id}</td>
                                    <td class="table-data">${averageFunc()}</td>
                                    <td class="table-data">${competitions[0]}</td>
                                    <td class="table-data">${competitions[1]}</td>
                                    <td class="table-data">${competitions[2]}</td>
                                    <td class="table-data">${competitions[3]}</td>
                                    <td class="table-data">${competitions[4]}</td>
                                    <td class="table-data">${competitions[5]}</td>
                                    <td class="table-data">${competitions[6]}</td>
                                    <td class="table-data">${date}</td>
        `;

        return infoStudent;
    };

    $('#studentModal').on('shown.bs.modal', function (e) {
        const studentId = e.relatedTarget.textContent;

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
    })

    const handleClick = (type) => {
        fetch('http://goiteens.club/hse/back/students.php')
            .then(data => data.json())
            .then(data => {

                const tableStudent = document.querySelector('.table-body');
                tableStudent.innerHTML = '';

                for (let i = 0; i < data.length; i++) {
                    const infoStudent = {
                        ...data[i],

                    };
                    if (type !== "all") {
                        if (infoStudent.competitionType.toUpperCase() === type) {
                            const newStudent = createStudent(infoStudent);
                            tableStudent.append(newStudent);
                        };
                    } else {
                        const newStudent = createStudent(infoStudent);
                        tableStudent.append(newStudent);
                    }
                }

            });
    };
    handleClick("all");

    const handleButtonQAClick = () => handleClick("QA");
    const handleButtonJSClick = () => handleClick("JS");
    const handleButtonPythonClick = () => handleClick("PYTHON");
    const handleButtonJavaClick = () => handleClick("JAVA");

    buttonQA.addEventListener('click', handleButtonQAClick);
    buttonJS.addEventListener('click', handleButtonJSClick);
    buttonJava.addEventListener('click', handleButtonJavaClick);
    buttonPython.addEventListener('click', handleButtonPythonClick);
});