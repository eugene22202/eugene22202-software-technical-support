// ----------ГЛОБАЛЬНІ НАЛАШТУВАННЯ ЛОГУВАННЯ----------
const LOGGING_ENDPOINT = '/api/log_error'; // Уявна адреса вашого серверного ендпоінту для логів
const LOG_LEVEL = 'debug'; // 'info', 'warn', 'error', 'debug' - для фільтрації логів в консолі

// Функція для відправки логів на сервер
function sendLogToServer(logData) {
    // Перевіряємо, чи є ендпоінт для логування
    if (!LOGGING_ENDPOINT) {
        console.warn("LOGGING_ENDPOINT не визначено. Логи на сервер не відправляються.");
        return;
    }

    // Додаємо загальну контекстну інформацію до кожного логу
    const fullLogData = {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        ...logData, // Додаємо передані дані логу (рівень, повідомлення, стек, додаткові дані)
        // Приклад додавання ID користувача, якщо він є
        userId: localStorage.getItem('userId') || 'guest', // Припустимо, ви зберігаєте userId в localStorage
        sessionId: sessionStorage.getItem('sessionId') || 'unknown' // Припустимо, ви використовуєте sessionId
    };

    // Відправляємо лог на сервер
    fetch(LOGGING_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest' // Додатковий заголовок, якщо ваш бекенд його перевіряє
        },
        body: JSON.stringify(fullLogData)
    })
        .then(response => {
            if (!response.ok) {
                console.error(`Помилка відправки логу на сервер: ${response.status} ${response.statusText}`);
            }
        })
        .catch(error => {
            // Уникаємо нескінченної рекурсії, якщо помилка виникає при відправці логу
            console.error("Не вдалося відправити лог на сервер:", error);
        });
}

// Загальна функція логування, яка вирішує, куди відправити лог
function customLogger(level, message, error = null, context = {}) {
    const logEntry = {
        level: level,
        message: message,
        context: context
    };

    if (error) {
        logEntry.errorName = error.name;
        logEntry.errorMessage = error.message;
        logEntry.stack = error.stack;
    }

    // Логування в консоль (залежить від рівня LOG_LEVEL)
    if (level === 'debug' && ['debug'].includes(LOG_LEVEL)) {
        console.debug("DEBUG:", logEntry);
    } else if (level === 'info' && ['debug', 'info'].includes(LOG_LEVEL)) {
        console.info("INFO:", logEntry);
    } else if (level === 'warn' && ['debug', 'info', 'warn'].includes(LOG_LEVEL)) {
        console.warn("WARN:", logEntry);
    } else if (level === 'error' && ['debug', 'info', 'warn', 'error'].includes(LOG_LEVEL)) {
        console.error("ERROR:", logEntry);
    }

    // Відправка логу на сервер (для рівня 'warn' та 'error' зазвичай)
    if (['warn', 'error'].includes(level)) {
        sendLogToServer(logEntry);
    }
}

// ----------CALCULATOR----------

// Ограничение ввода до 3 символов в полях роста, веса и возраста
document.getElementById('height').addEventListener('input', function() {
    if (this.value.length > 3) this.value = this.value.slice(0, 3);
});

document.getElementById('weight').addEventListener('input', function() {
    if (this.value.length > 3) this.value = this.value.slice(0, 3);
});

document.getElementById('age').addEventListener('input', function() {
    if (this.value.length > 3) this.value = this.value.slice(0, 3);
});

console.log("Програма запущена — калькулятор готовий до роботи.");
document.getElementById('calculate').addEventListener('click', function() {
    customLogger('info', "Натиснута кнопка 'START' калькулятора.");

    try {
        const goal = document.getElementById('goal').value;
        const activity = parseFloat(document.getElementById('activity').value);
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const age = parseFloat(document.getElementById('age').value);

        // Валидация данных с уникальными ID и контекстом
        if (isNaN(activity) || activity <= 0) {
            alert("Будь ласка, оберіть коректний рівень активності.");
            customLogger('warn', "Некоректний рівень активності", null, { code: 'CALC_WARN_001', value: activity });
            return;
        }
        if (isNaN(height) || height < 50 || height > 250) {
            alert("Будь ласка, введіть коректний ріст (від 50 до 250 см).");
            customLogger('warn', "Некоректний ріст", null, { code: 'CALC_WARN_002', value: height });
            return;
        }
        if (isNaN(weight) || weight < 30 || weight > 300) {
            alert("Будь ласка, введіть коректну вагу (від 30 до 300 кг).");
            customLogger('warn', "Некоректна вага", null, { code: 'CALC_WARN_003', value: weight });
            return;
        }
        if (isNaN(age) || age < 10 || age > 120) {
            alert("Будь ласка, введіть коректний вік (від 10 до 120 років).");
            customLogger('warn', "Некоректний вік", null, { code: 'CALC_WARN_004', value: age });
            return;
        }

        let B = (weight * 10 + height * 6.25 - (age * 5 + 5)) * activity;
        if (isNaN(B) || !isFinite(B)) {
            const error = new Error("Помилка розрахунку базового обміну речовин (B).");
            customLogger('error', error.message, error, { code: 'CALC_ERR_001', inputs: { weight, height, age, activity } });
            alert(`Виникла помилка: ${error.message}. Будь ласка, перевірте введені дані.`);
            return; // Додано return, щоб зупинити виконання
        }

        let C;
        if (goal === 'stay') {
            C = B;
        } else if (goal === 'gain') {
            C = B * 1.03;
        } else if (goal === 'lose') {
            C = B * 0.7;
        } else {
            const error = new Error("Невідома мета розрахунку калорій.");
            customLogger('error', error.message, error, { code: 'CALC_ERR_002', goal: goal });
            alert(`Виникла помилка: ${error.message}. Будь ласка, перевірте введені дані.`);
            return; // Додано return
        }

        if (isNaN(C) || !isFinite(C)) {
            const error = new Error("Помилка розрахунку кінцевих калорій (C).");
            customLogger('error', error.message, error, { code: 'CALC_ERR_003', valueB: B, goal: goal });
            alert(`Виникла помилка: ${error.message}. Будь ласка, перевірте введені дані.`);
            return; // Додано return
        }

        const userData = {
            goal: goal,
            activity: activity,
            height: height,
            weight: weight,
            age: age,
            result: C.toFixed(2)
        };

        try {
            localStorage.setItem('userData', JSON.stringify(userData));
            customLogger('info', "Дані користувача успішно збережено.", null, { code: 'STORAGE_INFO_001' });
        } catch (e) {
            customLogger('error', "Помилка збереження даних у localStorage.", e, { code: 'STORAGE_ERR_001', key: 'userData' });
            alert("Не вдалося зберегти дані. Можливо, localStorage переповнено або недоступне.");
        }

        showResult(C.toFixed(2));

    } catch (error) {
        customLogger('error', "Виникла несподівана помилка в калькуляторі.", error, { code: 'CALC_UNEXPECTED_ERR' });
        alert(`Виникла невідома помилка: ${error.message || "Невідома помилка"}. Будь ласка, перевірте введені дані.`);
    }
});

function showResult(result) {
    const resultElement = document.getElementById('result-value');
    if (resultElement) {
        resultElement.textContent = `${result} ккал`;
    } else {
        customLogger('error', "Елемент 'result-value' не знайдено.", null, { code: 'DOM_ERR_001', elementId: 'result-value' });
    }

    const overlay = document.getElementById('result-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        overlay.style.animation = 'fadeIn 0.3s ease-in-out';
    } else {
        customLogger('error', "Елемент 'result-overlay' не знайдено.", null, { code: 'DOM_ERR_002', elementId: 'result-overlay' });
    }
}

document.getElementById('close-result').addEventListener('click', function() {
    customLogger('info', "Закриття блоку результату калькулятора.");
    const overlay = document.getElementById('result-overlay');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease-in-out';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }
});

document.getElementById('clear-data').addEventListener('click', function() {
    customLogger('info', "Очищення даних калькулятора та форми.");
    try {
        localStorage.removeItem('userData');
        customLogger('info', "Дані користувача видалено з localStorage.", null, { code: 'STORAGE_INFO_002' });
    } catch (e) {
        customLogger('error', "Помилка видалення даних з localStorage.", e, { code: 'STORAGE_ERR_002', key: 'userData' });
    }

    document.getElementById('goal').value = 'stay';
    document.getElementById('activity').value = '1.38';
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('age').value = '';

    const overlay = document.getElementById('result-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    customLogger('info', "Сторінка завантажена. Спроба завантажити збережені дані.");
    try {
        const savedData = localStorage.getItem('userData');
        if (savedData) {
            let userData;
            try {
                userData = JSON.parse(savedData);
                customLogger('info', "Збережені дані успішно завантажено та розпарсено.", null, { code: 'STORAGE_INFO_003' });
            } catch (e) {
                customLogger('error', "Помилка парсингу JSON з localStorage.", e, { code: 'STORAGE_ERR_003', rawData: savedData });
                localStorage.removeItem('userData');
                return;
            }

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
        } else {
            customLogger('info', "Не знайдено збережених даних у localStorage.", null, { code: 'STORAGE_INFO_004' });
        }
    } catch (error) {
        customLogger('error', "Помилка при завантаженні збережених даних на DOMContentLoaded.", error, { code: 'PAGE_LOAD_ERR_001' });
    }
});


// ----------RAZION----------
// !!! Важливо: Об'єкт 'recipes' повинен бути глобально доступним або імпортований.
// Якщо 'recipes' не визначений, цей код видасть помилку.

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("meal-modal");
    // Переконайтеся, що ID кнопки відповідає вашому HTML
    const calculateBtn = document.getElementById("start"); // Або 'generate-meal-plan'
    const regenerateBtn = document.getElementById("regenerate-btn");
    const closeBtn = document.getElementById("close-modal-btn");
    const closeModalBtn = document.querySelector(".meal-modal-close");

    if (!modal || !calculateBtn || !regenerateBtn) {
        customLogger('error', "Деякі необхідні елементи DOM для розділу RAZION не знайдені.", null, { code: 'RAZION_DOM_ERR_001' });
        return;
    }

    const closeResultTwo = document.getElementById('close-result-two');
    if (closeResultTwo) {
        closeResultTwo.addEventListener('click', function() {
            customLogger('info', "Закриття модального вікна раціону.");
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

    if (calculateBtn) calculateBtn.addEventListener("click", generateMealPlan);
    if (regenerateBtn) regenerateBtn.addEventListener("click", regenerateMealPlan);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

    function closeModal() {
        if (modal) {
            modal.style.display = "none";
            customLogger('info', "Модальне вікно раціону закрито.");
        }
    }

    function generateMealPlan() {
        customLogger('info', "Початок генерації плану харчування.");
        try {
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

            // Перевірка введення з унікальними ID та контекстом
            if (isNaN(calories) || calories < 1000 || calories > 5000) {
                alert("Будь ласка, введіть коректну кількість калорій (від 1000 до 5000).");
                customLogger('warn', "Некоректна кількість калорій для раціону.", null, { code: 'RAZION_WARN_001', value: calories });
                return;
            }
            if (isNaN(mealsPerDay) || mealsPerDay < 1 || mealsPerDay > 6) {
                alert("Будь ласка, введіть коректну кількість прийомів їжі (від 1 до 6).");
                customLogger('warn', "Некоректна кількість прийомів їжі.", null, { code: 'RAZION_WARN_002', value: mealsPerDay });
                return;
            }
            if (isNaN(days) || days < 1 || days > 7) {
                alert("Будь ласка, введіть коректну кількість днів (від 1 до 7).");
                customLogger('warn', "Некоректна кількість днів.", null, { code: 'RAZION_WARN_003', value: days });
                return;
            }

            if (typeof recipes === 'undefined' || !recipes.mainCourses || !recipes.sides || !recipes.vegetables || !recipes.additions) {
                const error = new Error("Об'єкт 'recipes' не визначений або відсутні необхідні дані про рецепти.");
                customLogger('error', error.message, error, { code: 'RAZION_ERR_001', recipesDefined: typeof recipes !== 'undefined' });
                throw error; // Викидаємо, щоб Catch блок його спіймав
            }

            currentPlan = [];
            usedMeals = new Set();
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
                        const side = getRandomSide(mainCourse ? mainCourse.type : null); // Передаємо тип лише якщо mainCourse існує
                        const vegetable = getRandomVegetable();
                        const addition = getRandomAddition();

                        if (!mainCourse || !side || !vegetable || !addition) {
                            customLogger('warn', "Не вдалося знайти достатньо унікальних компонентів для прийому їжі.", null, {
                                code: 'RAZION_WARN_004',
                                mealNumber: meal,
                                dayNumber: day,
                                foundMain: !!mainCourse,
                                foundSide: !!side,
                                foundVegetable: !!vegetable,
                                foundAddition: !!addition
                            });
                            // Пропускаємо цей прийом їжі або робимо його неповним
                            continue;
                        }

                        const mealComponents = [
                            calculateComponent(mainCourse, mealCalories * 0.50, 'main'),
                            calculateComponent(side, mealCalories * 0.30, 'side'),
                            calculateComponent(vegetable, mealCalories * 0.15, 'vegetable'),
                            calculateComponent(addition, mealCalories * 0.05, 'addition')
                        ];

                        const isValidMeal = mealComponents.every(comp =>
                            !isNaN(comp.calories) && !isNaN(comp.weight) && comp.weight >= 0
                        ); // weight >= 0, тому що може бути 0г для добавок з 0 кал

                        if (!isValidMeal) {
                            customLogger('error', "Помилка розрахунку компонентів страви.", null, {
                                code: 'RAZION_ERR_002',
                                mealNumber: meal,
                                dayNumber: day,
                                components: mealComponents.map(c => ({ name: c.name, cal: c.calories, weight: c.weight }))
                            });
                            continue;
                        }

                        const totalMealCalories = mealComponents.reduce((sum, c) => sum + c.calories, 0);
                        const difference = mealCalories - totalMealCalories;

                        if (Math.abs(difference) > 10) {
                            const main = mealComponents[0];
                            if (main.weight === 0 || isNaN(main.calories / main.weight) || main.calories === 0) {
                                customLogger('warn', "Некоректні дані для головної страви при коригуванні ваги. Пропуск коригування.", null, { code: 'RAZION_WARN_005', mainItem: main });
                            } else {
                                const caloriesPerGram = main.calories / main.weight;
                                const adjustment = difference / caloriesPerGram;

                                main.weight = Math.max(50, Math.round(main.weight + adjustment));
                                main.calories = Math.round((main.weight * main.caloriesPer100g) / 100); // Corrected calculation
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

                        if (mainCourse) usedMeals.add(mainCourse.name);
                        if (side) usedMeals.add(side.name);

                    } catch (e) {
                        customLogger('error', "Помилка генерації окремого прийому їжі.", e, { code: 'RAZION_ERR_003', mealNumber: meal, dayNumber: day });
                    }
                }

                dayPlans.push({
                    day,
                    meals: dayMeals,
                    totalCalories: Math.round(dayCalories)
                });
                totalDaysCalories += dayCalories;
            }

            const totalTargetCalories = calories * days;
            const totalDifference = totalTargetCalories - totalDaysCalories;

            if (Math.abs(totalDifference) > 50 && totalDaysCalories > 0) { // Перевірка, щоб уникнути ділення на нуль
                currentPlan = adjustTotalCalories(dayPlans, totalTargetCalories, totalDaysCalories);
                customLogger('info', "Загальна калорійність скоригована.", null, { code: 'RAZION_INFO_001', target: totalTargetCalories, actual: totalDaysCalories });
            } else if (totalDaysCalories === 0) {
                customLogger('warn', "Загальна калорійність дорівнює нулю, коригування неможливе.", null, { code: 'RAZION_WARN_006' });
            }


            displayMealPlan();
            if (modal) {
                modal.style.display = "block";
            }
            customLogger('info', "План харчування успішно згенеровано.", null, { code: 'RAZION_INFO_002' });

        } catch (error) {
            customLogger('error', "Виникла несподівана помилка в генераторі раціону.", error, { code: 'RAZION_UNEXPECTED_ERR' });
            alert(`Виникла помилка при генерації раціону: ${error.message}. Будь ласка, спробуйте ще раз або зверніться до адміністратора.`);
            if (modal) {
                modal.style.display = "none";
            }
        }
    }

    function calculateComponent(item, targetCalories, type) {
        if (!item || isNaN(item.caloriesPer100g) || item.caloriesPer100g <= 0) {
            customLogger('warn', `Некоректні дані для компонента: ${item ? item.name : 'Невідомо'}.`, null, { code: 'RAZION_COMP_WARN_001', item: item });
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
        // Перевірка на від'ємну вагу, якщо раптом targetCalories надто низькі або item.caloriesPer100g надто високі
        if (isNaN(weight) || weight < 0) {
            customLogger('warn', `Розрахована вага компонента є некоректною (${weight}г). Встановлено 0г.`, null, { code: 'RAZION_COMP_WARN_002', item: item, targetCalories, calculatedWeight: weight });
            return {
                name: item.name,
                type: type === 'main' ? (item.type === 'fish' ? 'fish' : 'meat') : type,
                weight: 0,
                calories: 0,
                proteinPer100g: item.proteinPer100g,
                carbsPer100g: item.carbsPer100g,
                fatPer100g: item.fatPer100g,
                protein: 0,
                carbs: 0,
                fat: 0
            };
        }

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
            customLogger('warn', "Поточна сума калорій для коригування дорівнює нулю. Коригування неможливе.", null, { code: 'RAZION_ADJUST_WARN_001' });
            return dayPlans;
        }
        const factor = targetCalories / currentCalories;
        return dayPlans.map(day => {
            const adjustedMeals = day.meals.map(meal => {
                const adjustedComponents = meal.components.map(comp => {
                    const newCalories = Math.round(comp.calories * factor);
                    let newWeight;
                    if (comp.calories === 0 || comp.weight === 0 || isNaN(comp.calories / comp.weight)) {
                        newWeight = comp.weight;
                        customLogger('warn', "Некоректні дані компонента для коригування ваги. Збережена поточна вага.", null, { code: 'RAZION_ADJUST_WARN_002', component: comp });
                    } else {
                        newWeight = Math.max(0, Math.round((newCalories * comp.weight) / comp.calories)); // Ensure non-negative weight
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
            customLogger('warn', "Спроба регенерації плану без існуючого плану.", null, { code: 'RAZION_WARN_005' });
            return;
        }
        customLogger('info', "Регенерація плану харчування.");
        generateMealPlan();
    }

    // Функції для вибору страв
    function getRandomMainCourse() {
        if (!recipes || !recipes.mainCourses || recipes.mainCourses.length === 0) {
            customLogger('error', "Відсутні дані про основні страви (recipes.mainCourses).", null, { code: 'RECIPE_ERR_001' });
            return null;
        }
        const available = recipes.mainCourses.filter(m => !usedMeals.has(m.name));
        const pool = available.length > 0 ? available : recipes.mainCourses;
        if (pool.length === 0) {
            customLogger('warn', "Немає доступних основних страв для вибору (пул порожній).", null, { code: 'RECIPE_WARN_001' });
            return null;
        }
        return pool[Math.floor(Math.random() * pool.length)];
    }

    function getRandomSide(mainType) {
        if (!recipes || !recipes.sides || recipes.sides.length === 0) {
            customLogger('error', "Відсутні дані про гарніри (recipes.sides).", null, { code: 'RECIPE_ERR_002' });
            return null;
        }
        const available = recipes.sides.filter(s =>
            s.pairsWith.includes(mainType) && !usedMeals.has(s.name)
        );
        const pool = available.length > 0 ? available :
            recipes.sides.filter(s => s.pairsWith.includes(mainType));
        if (pool.length === 0) {
            customLogger('warn', "Немає доступних гарнірів для вибору (пул порожній або немає відповідних для типу).", null, { code: 'RECIPE_WARN_002', mainType: mainType });
            return null;
        }
        return pool[Math.floor(Math.random() * pool.length)];
    }

    function getRandomVegetable() {
        if (!recipes || !recipes.vegetables || recipes.vegetables.length === 0) {
            customLogger('error', "Відсутні дані про овочі (recipes.vegetables).", null, { code: 'RECIPE_ERR_003' });
            return null;
        }
        const available = recipes.vegetables.filter(v => !usedMeals.has(v.name));
        const pool = available.length > 0 ? available : recipes.vegetables;
        if (pool.length === 0) {
            customLogger('warn', "Немає доступних овочів для вибору (пул порожній).", null, { code: 'RECIPE_WARN_003' });
            return null;
        }
        return pool[Math.floor(Math.random() * pool.length)];
    }

    function getRandomAddition() {
        if (!recipes || !recipes.additions || recipes.additions.length === 0) {
            customLogger('error', "Відсутні дані про добавки (recipes.additions).", null, { code: 'RECIPE_ERR_004' });
            return null;
        }
        return recipes.additions[Math.floor(Math.random() * recipes.additions.length)];
    }

    function displayMealPlan() {
        const mealPlanResultElement = document.getElementById("meal-plan-result");
        if (!mealPlanResultElement) {
            customLogger('error', "Елемент 'meal-plan-result' не знайдено для відображення плану.", null, { code: 'DOM_ERR_003', elementId: 'meal-plan-result' });
            return;
        }

        let html = '';
        if (currentPlan.length === 0) {
            html = "<p>План харчування не згенеровано або сталася помилка.</p>";
            mealPlanResultElement.innerHTML = html;
            customLogger('warn', "Спроба відобразити порожній план харчування.", null, { code: 'RAZION_DISPLAY_WARN_001' });
            return;
        }

        const caloriesInput = document.getElementById("calories");
        const daysInput = document.getElementById("days");
        const targetCaloriesVal = caloriesInput ? parseInt(caloriesInput.value) : 2000;
        const daysVal = daysInput ? parseInt(daysInput.value) : 1;
        // const totalTargetCalories = targetCaloriesVal * daysVal; // Ця змінна більше не використовується для відображення загальної статистики


        currentPlan.forEach(dayPlan => {
            html += `<div class="meal-day"><h3>День ${dayPlan.day} (${dayPlan.totalCalories} ккал)</h3>`;

            dayPlan.meals.forEach((meal, index) => {
                html += `
                    <div class="meal-item">
                        <strong>Прийом їжі ${index + 1}: ${meal.totalCalories} ккал</strong>
                        ${meal.components.map(comp => {
                    if (!comp || isNaN(comp.weight) || isNaN(comp.calories) || isNaN(comp.protein) || isNaN(comp.carbs) || isNaN(comp.fat)) {
                        customLogger('warn', "Некоректні дані компонента для відображення.", null, { code: 'RAZION_DISPLAY_WARN_002', componentData: comp });
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

        mealPlanResultElement.innerHTML = html;
        customLogger('info', "План харчування успішно відображено.", null, { code: 'RAZION_DISPLAY_INFO_001', daysDisplayed: currentPlan.length });
    }

    function getComponentName(type) {
        const names = {
            'meat': 'М\'ясо',
            'poultry': 'Пташина',
            'fish': 'Риба',
            'side': 'Гарнір',
            'vegetable': 'Овочі',
            'addition': 'Добавка',
        };
        return names[type] || type;
    }
});