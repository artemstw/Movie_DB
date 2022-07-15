"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const movieDB = {
        movies: [
            "Логан",
            "Мстители: Война бесконечности",
            "Марсианин",
            "Покемон: детектив Пикачу",
            "Властелин колец",
        ],
    };

    const adv = document.querySelectorAll(".promo__adv img"),
        poster = document.querySelector(".promo__bg"),
        movieGenre = poster.querySelector(".promo__genre"),
        movieList = document.querySelector(".promo__interactive-list"),
        addForm = document.querySelector("form.add"), // Ищем форму, у которой есть класс .add
        addInput = addForm.querySelector(".adding__input"), //Находим input внутри формы addForm
        checkbox = addForm.querySelector('[type = "checkbox"]'); //Находим checkbox прямо через атрибут

    addForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favourite = checkbox.checked;

        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favourite) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm); //Добавляет в базу данных - массив movies еще один фильм в строковом формате
            sortArray(movieDB.movies); //Сортирует все фильмы в movies по алфавиту

            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset();
    });

    const deleteAdv = (arr) => {
        arr.forEach((item) => {
            item.remove();
        });
    };

    const makeChanges = () => {
        movieGenre.textContent = "драма";
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };

    function sortArray(arr) {
        arr.sort();
    }

    function createMovieList(films, parent) {
        //Функция динамически добавляет новый фильм в список с номером
        parent.innerHTML = ""; //Заменяет содержимое пустой строкой
        sortArray(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
        <li class="promo__interactive-item">${i + 1} ${film}
            <div class="delete"></div>
        </li>
        `;
        });

        document.querySelectorAll(".delete").forEach((btn, i) => {
            //Удаляет фильм из списка при клике на корзину
            btn.addEventListener("click", () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent); //Заново строим список с помощью рекурсии
            });
        });
    }

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});
