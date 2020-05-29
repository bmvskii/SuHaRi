//1. Получить данные всех HR с сервера
//2. Написать функцию которая принимает с данными о HR и создает HTML элемент
//3. В зависимости от статуса HR добавляем либо в левую либо в правую колонку

document.addEventListener("DOMContentLoaded", () => {
    const request = document.querySelector('.asideRequest .hrs-wrapper');
    const verified = document.querySelector('.asideVerify .hrs-wrapper');
    const verificatedButton = document.querySelector('.button--verficate');
    const removeButton = document.querySelector('.button--remove');


    const createHR = (HRdata) => {
        const {name, company, tel, photo, id} = HRdata;
        const HR = document.createElement('div');
        let photoSrc = '../../../img/man.png';

        if (!name || !tel) {
            return null;
        }

        if (photo) {
            photoSrc = photo;
        }
        HR.className = 'hr visible';

        HR.setAttribute('data-toggle', "modal");
        HR.setAttribute('data-target', "#hrModal");
        HR.setAttribute('data-id', id);

        HR.innerHTML = `
            <div class="hr__left">
                <h3 class="title hr__name">${name}</h3>
                <div class="hr__data-wrapper">
                    <span class="hr__data">Компания:</span>
                    <span class="hr__value company">${company}</span>
                </div>
                <div class="hr__data-wrapper">
                    <span class="hr__data">Телефон:</span>
                    <span class="hr__value">${tel}</span>
                </div>
            </div>
            <div class="hr__right">
               <img class="hr__photo" src="${photoSrc}" alt="${name}" />
            </div>
        `;
        return HR;
    };

    const updateHRStatus = (e) => {
        const { id, status } = e.currentTarget.dataset;
        fetch(`https://goiteens.club/hse/back/hrchangestatus.php?id=${id}&status=${status}`)
            .then(() => {
                getAllHrs();
                $('#hrModal').modal('hide');
            })

    }

    const checkColumnOnEmpty = () => {
        const requestElems = request.querySelectorAll('.visible');
        const verifiedElems = request.querySelectorAll('.visible');

        if (requestElems.length === 0) {
            request.innerHTML = "Отсутствуют";
        }
        if (verifiedElems.length === 0) {
            verified.innerHTML = "Отсутствуют";
        }
    };

    const getAllHrs = () => {
        fetch('http://goiteens.club/hse/back/hrs.php')
            .then(data => data.json())
            .then(data => {
                request.innerHTML = '';
                verified.innerHTML = '';
                for(let i = 0;i < data.length; i++){
                    const newHR = createHR(data[i]);
                    if (!newHR) {
                        continue;
                    }
                    if(data[i].status === '0'){
                        request.append(newHR)
                    }else{
                        verified.append(newHR)
                    }
                }
            })
    }

    function search(evt) {
        const filter = evt.target.value.toUpperCase();
        const hrs = document.querySelectorAll(".hr");

        for (let i = 0; i < hrs.length; i++) {
            const companyElem = hrs[i].querySelector(".company");
            const company = companyElem.textContent.toUpperCase();
            let isEqual = true;

            for (let j = 0; j < filter.length; j++) {
                if (company[j] !== filter[j]) {
                    isEqual = false
                }
            }

            if (isEqual) {
                hrs[i].style.display = "flex";
                hrs[i].classList.remove('hidden');
                hrs[i].classList.add('visible');
            } else {
                hrs[i].style.display = "none";
                hrs[i].classList.remove('visible');
                hrs[i].classList.add('hidden');
            }
        }

    }

    verificatedButton.addEventListener('click', updateHRStatus);
    removeButton.addEventListener('click', updateHRStatus);

    $('#hrModal').on('shown.bs.modal', function (e) {
        const hrId = e.relatedTarget.dataset.id;

        fetch(`http://goiteens.club/hse/back/hrs.php?id=${hrId}`)
            .then(data => data.json())
            .then(data => {
                const {email, name, lastName , id, tel } = data;

                const modal = document.querySelector('#hrModal');

                verificatedButton.removeAttribute('data-id');
                verificatedButton.setAttribute('data-id', id);

                removeButton.removeAttribute('data-id');
                removeButton.setAttribute('data-id', id);

                const modalTitle = modal.querySelector('.modal-title');

                const telElem = modal.querySelector('.phone .student-info-value');
                const emailElem = modal.querySelector('.email .student-info-value');

                telElem.textContent = tel || "Отсутсвует";
                emailElem.textContent = email || "Отсутсвует";

                modalTitle.innerHTML = `${name} ${lastName}`;
            });
    });


    getAllHrs();

    const input = document.querySelector(".search-form");
    input.addEventListener("keyup", search);
})