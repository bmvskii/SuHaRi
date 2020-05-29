//1. Получить данные всех HR с сервера
//2. Написать функцию которая принимает с данными о HR и создает HTML элемент
//3. В зависимости от статуса HR добавляем либо в левую либо в правую колонку

document.addEventListener("DOMContentLoaded", () => {
    const request = document.querySelector('.asideRequest .hrs-wrapper')
    const verified = document.querySelector('.asideVerify .hrs-wrapper')

    const createHR = (HRdata) => {
        const {name, company, tel, photo} = HRdata;
        const HR = document.createElement('div');
        let photoSrc = '../../../img/man.png';

        if (!name || !tel) {
            return null;
        }

        if (photo) {
            photoSrc = photo;
        }
        HR.className = 'hr';
        HR.innerHTML = `
            <div class="hr__left">
                <h3 class="title hr__name">${name}</h3>
                <div class="hr__data-wrapper">
                    <span class="hr__data">Компания:</span>
                    <span class="hr__value">${company}</span>
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
    const getAllHrs = () => {
        fetch('http://goiteens.club/hse/back/hrs.php')
            .then(data => data.json())
            .then(data => {
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
    getAllHrs();
    function search(evt) {
        const filter = evt.target.value.toUpperCase();
        const hrs = document.querySelectorAll(".hr");
        for (let i = 0; i < hrs.length; i++) {
            const company = hrs[i].querySelector(".company").textContent.toUpperCase();
            let isEqual = true;
            for (let j = 0; j < filter.length; j++) {
                if (company[j] !== filter[j]) {
                    isEqual = false
                }


            }

            if (isEqual) {
                hrs[i].style.display = "block";
            } else {
                hrs[i].style.display = "none";
            }
        }
    }
    const input = document.querySelector(".search-form");
    input.addEventListener("keyup", search);

})