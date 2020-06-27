Проект для образовательной платформы SuHaRi.

Ссылка на список страниц:
- http://goiteens.club/hse/

Правила, которым следуем при разработке:
- Добавляем script перед закрытием тега body
- В js файле обрабатываем событие DOMContentLoaded, а после пишем логику

Список эндпоинтов:

- GET http://goiteens.club/hse/back/hrs.php - получение всех HR
- GET http://goiteens.club/hse/back/hrs.php?id=:id - получение HR по :id
- GET http://goiteens.club/hse/back/students.php - получние всех студентов
- GET http://goiteens.club/hse/back/students.php?id=:id - получние студента по :id
- GET http://goiteens.club/hse/back/login.php?email=:email&password=:password - вход в систему с помощью :email, :password, 
- GET http://goiteens.club/hse/back/uploadReg.php?name=:name&company=:company&tel=:tel&email=:email&password=:pwd - регистрация по телефону, email , пароль
- GET http://goiteens.club/hse/back/studentshrstatusget.php?hr=:id&status=:status - получение студентов у HR по категории. id - число. status - число от 1 до 4

Список часто используемых событий:
- click
- change - ввод значений в input/textarea
- keyup/keydown - нажатие клавиш

Работаем с сетью с помощью объекта Promise.

- Пример: https://github.com/bmvskii/goit-frontend-js/blob/master/module-10/lesson/theory.js
- Больше информации: http://fecore.net.ua/books/m5ph3r-javascript/module-11/promise-api.html

TODO:
- Страница с балансом
- Пополнение счета
- Авторизация/регистрация
- Подвязка всего вместе
- Перевод студентов из категории в категорию
- Обработку ситуаций , когда данных нет
- Валидация форм
- Вывод модальный окон
