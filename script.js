// ----------CALCULATOR----------

// Ограничение ввода до 3 символов в полях роста, веса и возраста
/**
 * Обмежує введення у полі 'height' до 3 символів.
 * Додає обробник події input, який обрізає введене значення.
 */
document.getElementById('height').addEventListener('input', function() {
    if (this.value.length > 3) this.value = this.value.slice(0, 3); // Ограничиваем ввод до 3 символов
});

document.getElementById('weight').addEventListener('input', function() {
    if (this.value.length > 3) this.value = this.value.slice(0, 3); // Ограничиваем ввод до 3 символов
});

document.getElementById('age').addEventListener('input', function() {
    if (this.value.length > 3) this.value = this.value.slice(0, 3); // Ограничиваем ввод до 3 символов
});

// Обработка кнопки "START" в калькуляторе
/**
 * Основний обробник натискання кнопки 'START'.
 * Виконує валідацію даних, розрахунок калорій в залежності від мети,
 * та зберігає результат у localStorage.
 */

console.log("Програма запущена — калькулятор готовий до роботи.");
document.getElementById('calculate').addEventListener('click', function() {
    console.log("Натиснута кнопка 'START'.");

    try {
        const goal = document.getElementById('goal').value; // Получаем выбранную цель
        // Використовуємо parseFloat і перевіряємо, чи є результат числом
        const activity = parseFloat(document.getElementById('activity').value);
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const age = parseFloat(document.getElementById('age').value);

        // Валидация данных
        if (isNaN(activity) || activity <= 0) {
            alert("Будь ласка, оберіть коректний рівень активності.");
            console.warn("Некоректне значення activity:", activity);
            return;
        }
        if (isNaN(height) || height < 50 || height > 250) {
            console.warn("Некоректне значення height:", height);
            alert("Будь ласка, введіть коректний ріст (від 50 до 250 см).");
            return;
        }
        if (isNaN(weight) || weight < 30 || weight > 300) {
            console.warn("Некоректне значення weight:", weight);
            alert("Будь ласка, введіть коректну вагу (від 30 до 300 кг).");
            return;
        }
        if (isNaN(age) || age < 10 || age > 120) {
            alert("Будь ласка, введіть коректний вік (від 10 до 120 років).");
            return;
        }

        // Выполняем расчет по формуле
        // Перевірка на можливі NaN або нескінченність після обчислень
        let B = (weight * 10 + height * 6.25 - (age * 5 + 5)) * activity;
        if (isNaN(B) || !isFinite(B)) {
            throw new Error("Помилка розрахунку базового обміну речовин (B).");
        }

        let C;
        if (goal === 'stay') {
            C = B; // Остаться в весе
        } else if (goal === 'gain') {
            C = B * 1.03; // Набрать вес (+3%)
        } else if (goal === 'lose') {
            C = B * 0.7; // Сбросить вес (-30%)
        } else {
            throw new Error("Невідома мета розрахунку калорій.");
        }

        if (isNaN(C) || !isFinite(C)) {
            throw new Error("Помилка розрахунку кінцевих калорій (C).");
        }

        // Сохраняем данные в localStorage
        const userData = {
            goal: goal,
            activity: activity,
            height: height,
            weight: weight,
            age: age,
            result: C.toFixed(2) // Округляем результат до 2 знаков после запятой
        };

        try {
            localStorage.setItem('userData', JSON.stringify(userData));
        } catch (e) {
            console.error("Помилка збереження даних у localStorage:", e);
            alert("Не вдалося зберегти дані. Можливо, localStorage переповнено або недоступне.");
        }

        // Показываем результат
        showResult(C.toFixed(2));

    } catch (error) {
        console.error("Виникла помилка в калькуляторі:", error);
        alert(`Виникла помилка: ${error.message || "Невідома помилка"}. Будь ласка, перевірте введені дані.`);
    }
});

// Функция для отображения результата
function showResult(result) {
    const resultElement = document.getElementById('result-value');
    if (resultElement) {
        resultElement.textContent = `${result} ккал`; // Выводим результат
    } else {
        console.error("Елемент 'result-value' не знайдено.");
        return;
    }

    const overlay = document.getElementById('result-overlay');
    if (overlay) {
        overlay.style.display = 'flex'; // Показываем оверлей
        overlay.style.animation = 'fadeIn 0.3s ease-in-out'; // Анимация появления
    } else {
        console.error("Елемент 'result-overlay' не знайдено.");
    }
}

// Закрываем блок с результатом
document.getElementById('close-result').addEventListener('click', function() {
    const overlay = document.getElementById('result-overlay');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease-in-out'; // Анимация исчезновения
        // Скрываем оверлей после завершения анимации
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300); // 300ms — длительность анимации
    }
});

// Очистка данных из localStorage и формы
document.getElementById('clear-data').addEventListener('click', function() {
    try {
        localStorage.removeItem('userData'); // Удаляем данные из localStorage
    } catch (e) {
        console.error("Помилка видалення даних з localStorage:", e);
    }

    // Очищаем форму
    document.getElementById('goal').value = 'stay';
    document.getElementById('activity').value = '1.38';
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('age').value = '';

    // Скрываем блок с результатом
    const overlay = document.getElementById('result-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
});

// Загрузка сохраненных данных при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    try {
        const savedData = localStorage.getItem('userData');
        if (savedData) {
            let userData;
            try {
                userData = JSON.parse(savedData);
            } catch (e) {
                console.error("Помилка парсингу JSON з localStorage:", e);
                localStorage.removeItem('userData'); // Очистити пошкоджені дані
                return;
            }

            // Перевіряємо, чи існують елементи перед доступом до .value
            const goalElement = document.getElementById('goal');
            const activityElement = document.getElementById('activity');
            const heightElement = document.getElementById('height');
            const weightElement = document.getElementById('weight');
            const ageElement = document.getElementById('age');
            const resultElement = document.getElementById('result-value');
            const overlay = document.getElementById('result-overlay');

            if (goalElement) goalElement.value = userData.goal || 'stay';
            if (activityElement) activityElement.value = userData.activity || '1.38';
            if (heightElement) heightElement.value = userData.height || '';
            if (weightElement) weightElement.value = userData.weight || '';
            if (ageElement) ageElement.value = userData.age || '';

            if (resultElement && userData.result) {
                resultElement.textContent = `${userData.result} ккал`;
            }

            if (overlay) {
                overlay.style.display = 'flex';
            }
        }
    } catch (error) {
        console.error("Помилка при завантаженні збережених даних:", error);
    }
});


// ----------RAZION----------
// !!! Увага: Не вистачає змінної 'recipes' та деяких елементів DOM (наприклад, closeBtn, closeModalBtn),
// які використовуються в цьому блоці. Для повної функціональності їх потрібно визначити.

document.addEventListener('DOMContentLoaded', function() {
    // Перевірка наявності елементів DOM
    const modal = document.getElementById("meal-modal");
    const calculateBtn = document.getElementById("start"); // У вашому HTML, можливо, це "generate-meal-plan" або щось схоже, а не "start"
    const regenerateBtn = document.getElementById("regenerate-btn");
    const closeBtn = document.getElementById("close-modal-btn"); // Це відсутній елемент
    const closeModalBtn = document.querySelector(".meal-modal-close"); // Це відсутній елемент

    // Додайте перевірки, щоб уникнути помилок, якщо елементи не існують
    if (!modal || !calculateBtn || !regenerateBtn) {
        console.error("Деякі необхідні елементи DOM для розділу RAZION не знайдені.");
        return; // Вийти, якщо основні елементи відсутні
    }

    // Обробник для другої кнопки закриття (якщо вона є в HTML)
    const closeResultTwo = document.getElementById('close-result-two');
    if (closeResultTwo) {
        closeResultTwo.addEventListener('click', function() {
            const overlay = document.getElementById('meal-modal');
            if (overlay) {
                overlay.style.animation = 'fadeOut 0.3s ease-in-out';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 300);
            }
        });
    }


    let currentPlan = [];
    let usedMeals = new Set();

    // Ініціалізація кнопок з перевірками
    if (calculateBtn) calculateBtn.addEventListener("click", generateMealPlan);
    if (regenerateBtn) regenerateBtn.addEventListener("click", regenerateMealPlan);
    // Ці кнопки можуть бути відсутні, тому перевіряємо
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);


    function closeModal() {
        if (modal) {
            modal.style.display = "none";
        }
    }

    function generateMealPlan() {
        try {
            // Перевірка наявності поля 'calories'
            const caloriesInput = document.getElementById("calories");
            if (!caloriesInput) {
                throw new Error("Поле введення калорій ('calories') не знайдено.");
            }
            const calories = parseInt(caloriesInput.value) || 2000;

            const mealsInput = document.getElementById("meals");
            if (!mealsInput) {
                throw new Error("Поле введення кількості прийомів їжі ('meals') не знайдено.");
            }
            const mealsPerDay = Math.min(6, Math.max(1, parseInt(mealsInput.value) || 3));

            const daysInput = document.getElementById("days");
            if (!daysInput) {
                throw new Error("Поле введення кількості днів ('days') не знайдено.");
            }
            const days = Math.min(7, Math.max(1, parseInt(daysInput.value) || 1));


            // Перевірка введення
            if (isNaN(calories) || calories < 1000 || calories > 5000) {
                alert("Будь ласка, введіть коректну кількість калорій (від 1000 до 5000).");
                return;
            }
            if (isNaN(mealsPerDay) || mealsPerDay < 1 || mealsPerDay > 6) {
                alert("Будь ласка, введіть коректну кількість прийомів їжі (від 1 до 6).");
                return;
            }
            if (isNaN(days) || days < 1 || days > 7) {
                alert("Будь ласка, введіть коректну кількість днів (від 1 до 7).");
                return;
            }

            // Перевірка наявності об'єкта recipes
            if (typeof recipes === 'undefined' || !recipes.mainCourses || !recipes.sides || !recipes.vegetables || !recipes.additions) {
                throw new Error("Об'єкт 'recipes' не визначений або відсутні необхідні дані про рецепти. Переконайтеся, що файл з рецептами підключено.");
            }


            // Скидання даних
            currentPlan = [];
            usedMeals = new Set();

            // Генерація плану
            let totalDaysCalories = 0;
            let dayPlans = [];

            for (let day = 1; day <= days; day++) {
                let dayCalories = 0;
                let dayMeals = [];

                const baseMealCalories = calories / mealsPerDay;
                const lastMealBonus = calories * 0.05;

                for (let meal = 1; meal <= mealsPerDay; meal++) {
                    let mealCalories = baseMealCalories;
                    if (meal === mealsPerDay) mealCalories += lastMealBonus;
                    mealCalories = Math.round(mealCalories / 10) * 10;

                    try {
                        const mainCourse = getRandomMainCourse();
                        const side = getRandomSide(mainCourse.type);
                        const vegetable = getRandomVegetable();
                        const addition = getRandomAddition();

                        // Перевірка, що всі компоненти були знайдені
                        if (!mainCourse || !side || !vegetable || !addition) {
                            throw new Error("Не вдалося знайти достатньо унікальних компонентів для плану харчування. Можливо, список рецептів занадто малий.");
                        }

                        const mealComponents = [
                            calculateComponent(mainCourse, mealCalories * 0.50, 'main'),
                            calculateComponent(side, mealCalories * 0.30, 'side'),
                            calculateComponent(vegetable, mealCalories * 0.15, 'vegetable'),
                            calculateComponent(addition, mealCalories * 0.05, 'addition')
                        ];

                        // Перевірка, чи всі компоненти були успішно розраховані (не містять NaN)
                        const isValidMeal = mealComponents.every(comp =>
                            !isNaN(comp.calories) && !isNaN(comp.weight) && comp.weight > 0
                        );

                        if (!isValidMeal) {
                            throw new Error("Помилка розрахунку компонентів страви. Перевірте дані рецептів.");
                        }


                        // Коригування ваги
                        const totalMealCalories = mealComponents.reduce((sum, c) => sum + c.calories, 0);
                        const difference = mealCalories - totalMealCalories;

                        if (Math.abs(difference) > 10) {
                            const main = mealComponents[0];
                            // Перевірка на ділення на нуль або нескінченність
                            if (main.weight === 0 || isNaN(main.calories / main.weight)) {
                                console.warn("Некоректні дані для головної страви при коригуванні ваги. Пропуск коригування.");
                            } else {
                                const caloriesPerGram = main.calories / main.weight;
                                const adjustment = difference / caloriesPerGram;

                                main.weight = Math.max(50, Math.round(main.weight + adjustment));
                                main.calories = Math.round(main.weight * caloriesPerGram);
                                main.protein = Math.round((main.weight * main.proteinPer100g) / 100 * 10) / 10;
                                main.carbs = Math.round((main.weight * main.carbsPer100g) / 100 * 10) / 10;
                                main.fat = Math.round((main.weight * main.fatPer100g) / 100 * 10) / 10;
                            }
                        }

                        dayMeals.push({
                            components: mealComponents,
                            totalCalories: mealComponents.reduce((sum, c) => sum + c.calories, 0)
                        });

                        dayCalories += mealComponents.reduce((sum, c) => sum + c.calories, 0);

                        usedMeals.add(mainCourse.name);
                        usedMeals.add(side.name);
                    } catch (e) {
                        console.error("Помилка генерації прийому їжі:", e.message);
                        // Можна додати alert або інший механізм сповіщення користувача
                        // Продовжуємо спробувати генерувати наступні прийоми їжі, якщо це можливо
                    }
                }

                dayPlans.push({
                    day,
                    meals: dayMeals,
                    totalCalories: Math.round(dayCalories)
                });
                totalDaysCalories += dayCalories;
            }

            // Фінальне коригування
            const totalTargetCalories = calories * days;
            const totalDifference = totalTargetCalories - totalDaysCalories;

            if (Math.abs(totalDifference) > 50) {
                currentPlan = adjustTotalCalories(dayPlans, totalTargetCalories, totalDaysCalories);
            } else {
                currentPlan = dayPlans;
            }

            displayMealPlan();
            if (modal) {
                modal.style.display = "block";
            }

        } catch (error) {
            console.error("Виникла помилка в генераторі раціону:", error);
            alert(`Виникла помилка при генерації раціону: ${error.message}. Будь ласка, спробуйте ще раз або зверніться до адміністратора.`);
            if (modal) {
                modal.style.display = "none"; // Приховати модальне вікно у випадку помилки
            }
        }
    }

    function calculateComponent(item, targetCalories, type) {
        if (!item || isNaN(item.caloriesPer100g) || item.caloriesPer100g <= 0) {
            console.warn(`Некоректні дані для компонента: ${item ? item.name : 'Невідомо'}. Пропуск.`);
            // Повернути "пусту" або стандартну компоненту, щоб уникнути помилок далі
            return {
                name: item ? item.name : "Невідомо",
                type: type,
                weight: 0,
                calories: 0,
                proteinPer100g: 0,
                carbsPer100g: 0,
                fatPer100g: 0,
                protein: 0,
                carbs: 0,
                fat: 0
            };
        }
        const weight = Math.round((targetCalories * 100) / item.caloriesPer100g);
        return {
            name: item.name,
            type: type === 'main' ? (item.type === 'fish' ? 'fish' : 'meat') : type,
            weight: weight,
            calories: Math.round((weight * item.caloriesPer100g) / 100),
            proteinPer100g: item.proteinPer100g,
            carbsPer100g: item.carbsPer100g,
            fatPer100g: item.fatPer100g,
            protein: Math.round((weight * item.proteinPer100g) / 100 * 10) / 10,
            carbs: Math.round((weight * item.carbsPer100g) / 100 * 10) / 10,
            fat: Math.round((weight * item.fatPer100g) / 100 * 10) / 10
        };
    }

    function adjustTotalCalories(dayPlans, targetCalories, currentCalories) {
        if (currentCalories === 0) {
            console.warn("Поточна сума калорій для коригування дорівнює нулю. Коригування неможливе.");
            return dayPlans;
        }
        const factor = targetCalories / currentCalories;
        return dayPlans.map(day => {
            const adjustedMeals = day.meals.map(meal => {
                const adjustedComponents = meal.components.map(comp => {
                    const newCalories = Math.round(comp.calories * factor);
                    let newWeight;
                    // Перевірка на ділення на нуль
                    if (comp.calories === 0 || comp.weight === 0) {
                        newWeight = comp.weight; // Зберігаємо поточну вагу, якщо калорійність 0
                    } else {
                        newWeight = Math.round((newCalories * 100) / (comp.calories / comp.weight * 100));
                    }


                    return {
                        ...comp,
                        weight: newWeight,
                        calories: newCalories,
                        protein: Math.round((newWeight * comp.proteinPer100g) / 100 * 10) / 10,
                        carbs: Math.round((newWeight * comp.carbsPer100g) / 100 * 10) / 10,
                        fat: Math.round((newWeight * comp.fatPer100g) / 100 * 10) / 10
                    };
                });

                return {
                    ...meal,
                    components: adjustedComponents,
                    totalCalories: adjustedComponents.reduce((sum, c) => sum + c.calories, 0)
                };
            });

            return {
                ...day,
                meals: adjustedMeals,
                totalCalories: adjustedMeals.reduce((sum, m) => sum + m.totalCalories, 0)
            };
        });
    }

    function regenerateMealPlan() {
        if (currentPlan.length === 0) {
            alert("Спочатку згенеруйте план харчування, натиснувши 'START'.");
            return;
        }
        generateMealPlan();
    }

    // Функції для вибору страв
    // Додаємо перевірку на порожній масив, щоб уникнути помилок
    function getRandomMainCourse() {
        const available = recipes.mainCourses.filter(m => !usedMeals.has(m.name));
        const pool = available.length > 0 ? available : recipes.mainCourses;
        if (pool.length === 0) {
            console.error("Немає доступних основних страв для вибору.");
            return null; // Повернути null або викинути помилку
        }
        return pool[Math.floor(Math.random() * pool.length)];
    }

    function getRandomSide(mainType) {
        const available = recipes.sides.filter(s =>
            s.pairsWith.includes(mainType) && !usedMeals.has(s.name)
        );
        const pool = available.length > 0 ? available :
            recipes.sides.filter(s => s.pairsWith.includes(mainType));
        if (pool.length === 0) {
            console.error("Немає доступних гарнірів для вибору або не знайдено відповідних для типу:", mainType);
            return null;
        }
        return pool[Math.floor(Math.random() * pool.length)];
    }

    function getRandomVegetable() {
        const available = recipes.vegetables.filter(v => !usedMeals.has(v.name));
        const pool = available.length > 0 ? available : recipes.vegetables;
        if (pool.length === 0) {
            console.error("Немає доступних овочів для вибору.");
            return null;
        }
        return pool[Math.floor(Math.random() * pool.length)];
    }

    function getRandomAddition() {
        if (recipes.additions.length === 0) {
            console.error("Немає доступних добавок для вибору.");
            return null;
        }
        return recipes.additions[Math.floor(Math.random() * recipes.additions.length)];
    }

    function displayMealPlan() {
        const mealPlanResultElement = document.getElementById("meal-plan-result");
        if (!mealPlanResultElement) {
            console.error("Елемент 'meal-plan-result' не знайдено.");
            return;
        }

        let html = '';
        // Перевірка на порожній currentPlan
        if (currentPlan.length === 0) {
            html = "<p>План харчування не згенеровано або сталася помилка.</p>";
            mealPlanResultElement.innerHTML = html;
            return;
        }

        const caloriesInput = document.getElementById("calories");
        const daysInput = document.getElementById("days");
        const targetCaloriesVal = caloriesInput ? parseInt(caloriesInput.value) : 2000;
        const daysVal = daysInput ? parseInt(daysInput.value) : 1;
        const totalTargetCalories = targetCaloriesVal * daysVal;


        currentPlan.forEach(dayPlan => {
            // Замість dayTarget можна використовувати встановлену calories
            // const dayTarget = totalTargetCalories / currentPlan.length;
            // const dayDifference = dayPlan.totalCalories - dayTarget; // Цю змінну ви не використовуєте для виводу

            html += `<div class="meal-day"><h3>День ${dayPlan.day} (${dayPlan.totalCalories} ккал)</h3>`;

            dayPlan.meals.forEach((meal, index) => {
                html += `
                    <div class="meal-item">
                        <strong>Прийом їжі ${index + 1}: ${meal.totalCalories} ккал</strong>
                        ${meal.components.map(comp => {
                    // Додано перевірку на коректність даних компонента
                    if (!comp || isNaN(comp.weight) || isNaN(comp.calories) || isNaN(comp.protein) || isNaN(comp.carbs) || isNaN(comp.fat)) {
                        console.warn("Некоректні дані компонента для відображення:", comp);
                        return `<div>Помилка завантаження компонента.</div>`;
                    }
                    return `
                            <div class="meal-component">
                                <u>${getComponentName(comp.type)}:</u>
                                ${comp.name} (${comp.weight}г) -
                                ${comp.calories} ккал
                                (Б:${comp.protein}г Ж:${comp.fat}г В:${comp.carbs}г)
                            </div>
                        `;
                }).join('')}
                    </div>
                `;
            });
            html += `</div>`;
        });

        document.getElementById("meal-plan-result").innerHTML = html;
    }

    function getComponentName(type) {
        const names = {
            'meat': 'М\'ясо',
            'poultry': 'Пташина',
            'fish': 'Риба',
            'side': 'Гарнір',
            'vegetable': 'Овочі',
            'addition': 'Добавка',
            // Додайте інші типи, якщо вони використовуються
        };
        return names[type] || type; // Повернути тип, якщо він не знайдений у словнику
    }
});