document.addEventListener('DOMContentLoaded', () => {
    const handleAsideButtonClick = (e) => {
        const elem = e.target;
        const activeButton = e.currentTarget.querySelector('.button--active');

        if (activeButton) {
            activeButton.classList.remove('button--active');
        }

        if (elem.classList.contains('button')) {
            elem.classList.add('button--active');
        }
    }

    const aside = document.querySelector('.aside');
    aside.addEventListener('click', handleAsideButtonClick);
});