document.addEventListener('DOMContentLoaded', () => {

    const QAbutton = document.querySelector('.button--qa');
    const JSbutton = document.querySelector('.button--js');
    const JavaButton = document.querySelector('.button--java');
    const PythonButton = document.querySelector('.button--python');

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
             <button class="button">Подробнее</button>
       `;

        return std;
    };

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
    const handleJSButtonClick = () => handleButtonClick('js');
    const handleQAButtonClick = () => handleButtonClick('qa');
    const handlePythonButtonClick = () => handleButtonClick('python');
    const handleJavaButtonClick = () => handleButtonClick('java');

    const getAllStudents = () => handleButtonClick('all');

    getAllStudents();

    JavaButton.addEventListener('click', handleJavaButtonClick);
    QAbutton.addEventListener('click', handleQAButtonClick);
    JSbutton.addEventListener('click', handleJSButtonClick);
    PythonButton.addEventListener('click', handlePythonButtonClick)
});