// ----------ГЛОБАЛЬНІ НАЛАШТУВАННЯ ЛОГУВАННЯ ТА ЛОКАЛІЗАЦІЇ----------
const LOGGING_ENDPOINT = '/api/log_error'; // Уявна адреса вашого серверного ендпоінту для логів
const LOG_LEVEL = 'debug'; // 'info', 'warn', 'error', 'debug' - для фільтрації логів в консолі

// Визначення поточної мови (можна отримати з localStorage, navigator.language тощо)
const currentLanguage = 'uk'; // 'uk' для української, 'en' для англійської

// Об'єкт для локалізації повідомлень про помилки
const errorMessages = {
    uk: {
        // Загальні помилки
        'GENERIC_ERROR_TITLE': 'Виникла помилка',
        'GENERIC_ERROR_MESSAGE': 'Щось пішло не так. Будь ласка, спробуйте ще раз або зверніться до підтримки, якщо проблема повториться.',
        'CONTACT_SUPPORT_INSTRUCTIONS': 'Ви можете повідомити про цю проблему, натиснувши кнопку нижче. Це допоможе нам швидко її вирішити.',
        'REPORT_BUTTON_TEXT': 'Повідомити про проблему',
        'CLOSE_BUTTON_TEXT': 'Закрити',

        // Помилки калькулятора
        'CALC_WARN_001_TITLE': 'Некоректний рівень активності',
        'CALC_WARN_001_MESSAGE': 'Будь ласка, оберіть дійсний рівень фізичної активності.',
        'CALC_WARN_002_TITLE': 'Некоректний ріст',
        'CALC_WARN_002_MESSAGE': 'Будь ласка, введіть коректний ріст (від 50 до 250 см).',
        'CALC_WARN_003_TITLE': 'Некоректна вага',
        'CALC_WARN_003_MESSAGE': 'Будь ласка, введіть коректну вагу (від 30 до 300 кг).',
        'CALC_WARN_004_TITLE': 'Некоректний вік',
        'CALC_WARN_004_MESSAGE': 'Будь ласка, введіть коректний вік (від 10 до 120 років).',
        'CALC_ERR_001_TITLE': 'Помилка розрахунку',
        'CALC_ERR_001_MESSAGE': 'Не вдалося розрахувати базовий обмін речовин. Перевірте введені дані.',
        'CALC_ERR_002_TITLE': 'Невідома мета',
        'CALC_ERR_002_MESSAGE': 'Вибрана мета розрахунку калорій є недійсною. Будь ласка, оберіть одну з доступних цілей.',
        'CALC_ERR_003_TITLE': 'Помилка розрахунку калорій',
        'CALC_ERR_003_MESSAGE': 'Кінцевий розрахунок калорій неможливий. Перевірте всі введені дані.',

        // Помилки localStorage
        'STORAGE_ERR_001_TITLE': 'Помилка збереження даних',
        'STORAGE_ERR_001_MESSAGE': 'Ваші дані не вдалося зберегти. Можливо, ваш браузер переповнений або налаштований на приватний режим.',
        'STORAGE_ERR_003_TITLE': 'Помилка завантаження даних',
        'STORAGE_ERR_003_MESSAGE': 'Не вдалося завантажити збережені дані. Можливо, вони були пошкоджені.',

        // Помилки DOM
        'DOM_ERR_001_TITLE': 'Помилка відображення',
        'DOM_ERR_001_MESSAGE': 'Не вдалося знайти необхідний елемент для відображення результату. Будь ласка, спробуйте оновити сторінку.',
        'DOM_ERR_002_TITLE': 'Помилка відображення',
        'DOM_ERR_002_MESSAGE': 'Не вдалося знайти елемент для відображення оверлея. Будь ласка, спробуйте оновити сторінку.',
        'DOM_ERR_003_TITLE': 'Помилка відображення',
        'DOM_ERR_003_MESSAGE': 'Деякі елементи інтерфейсу відсутні. Будь ласка, спробуйте оновити сторінку.',

        // Помилки генератора раціону
        'RAZION_DOM_ERR_001_TITLE': 'Помилка інтерфейсу',
        'RAZION_DOM_ERR_001_MESSAGE': 'Деякі необхідні елементи для генератора раціону не знайдено. Будь ласка, оновіть сторінку.',
        'RAZION_WARN_001_TITLE': 'Некоректні калорії для раціону',
        'RAZION_WARN_001_MESSAGE': 'Будь ласка, введіть кількість калорій для раціону від 1000 до 5000.',
        'RAZION_WARN_002_TITLE': 'Некоректна кількість прийомів їжі',
        'RAZION_WARN_002_MESSAGE': 'Будь ласка, введіть кількість прийомів їжі від 1 до 6.',
        'RAZION_WARN_003_TITLE': 'Некоректна кількість днів',
        'RAZION_WARN_003_MESSAGE': 'Будь ласка, введіть кількість днів для раціону від 1 до 7.',
        'RAZION_ERR_001_TITLE': 'Відсутні дані про рецепти',
        'RAZION_ERR_001_MESSAGE': 'Не вдалося завантажити дані про рецепти. Функціонал генератора раціону недоступний.',
        'RAZION_WARN_004_TITLE': 'Неповний план харчування',
        'RAZION_WARN_004_MESSAGE': 'Не вдалося знайти достатньо унікальних компонентів для всіх прийомів їжі. Спробуйте ще раз.',
        'RAZION_ERR_002_TITLE': 'Помилка розрахунку страви',
        'RAZION_ERR_002_MESSAGE': 'Виникла помилка при розрахунку компонентів однієї зі страв. Це може призвести до неточних значень.',
        'RAZION_ERR_003_TITLE': 'Помилка генерації прийому їжі',
        'RAZION_ERR_003_MESSAGE': 'Під час генерації плану виникла проблема з одним із прийомів їжі. Спробуйте ще раз.',
        'RAZION_ADJUST_WARN_001_TITLE': 'Проблема з коригуванням калорій',
        'RAZION_ADJUST_WARN_001_MESSAGE': 'Не вдалося скоригувати загальну калорійність плану, оскільки вона дорівнює нулю.',
        'RAZION_ADJUST_WARN_002_TITLE': 'Проблема з коригуванням ваги',
        'RAZION_ADJUST_WARN_002_MESSAGE': 'Виникла проблема при коригуванні ваги компонента. Це може вплинути на точність калорій.',
        'RAZION_WARN_005_TITLE': 'План не згенеровано',
        'RAZION_WARN_005_MESSAGE': 'Будь ласка, спочатку згенеруйте план харчування, натиснувши кнопку "START".',
        'RECIPE_ERR_001_TITLE': 'Відсутні рецепти',
        'RECIPE_ERR_001_MESSAGE': 'Відсутні дані про основні страви. Будь ласка, зверніться до адміністратора.',
        'RECIPE_ERR_002_TITLE': 'Відсутні рецепти',
        'RECIPE_ERR_002_MESSAGE': 'Відсутні дані про гарніри. Будь ласка, зверніться до адміністратора.',
        'RECIPE_ERR_003_TITLE': 'Відсутні рецепти',
        'RECIPE_ERR_003_MESSAGE': 'Відсутні дані про овочі. Будь ласка, зверніться до адміністратора.',
        'RECIPE_ERR_004_TITLE': 'Відсутні рецепти',
        'RECIPE_ERR_004_MESSAGE': 'Відсутні дані про добавки. Будь ласка, зверніться до адміністратора.'
    },
    en: {
        // Generic Errors
        'GENERIC_ERROR_TITLE': 'An error occurred',
        'GENERIC_ERROR_MESSAGE': 'Something went wrong. Please try again or contact support if the problem persists.',
        'CONTACT_SUPPORT_INSTRUCTIONS': 'You can report this issue by clicking the button below. This helps us resolve it quickly.',
        'REPORT_BUTTON_TEXT': 'Report Issue',
        'CLOSE_BUTTON_TEXT': 'Close',

        // Calculator Errors
        'CALC_WARN_001_TITLE': 'Invalid Activity Level',
        'CALC_WARN_001_MESSAGE': 'Please select a valid physical activity level.',
        'CALC_WARN_002_TITLE': 'Invalid Height',
        'CALC_WARN_002_MESSAGE': 'Please enter a valid height (between 50 and 250 cm).',
        'CALC_WARN_003_TITLE': 'Invalid Weight',
        'CALC_WARN_003_MESSAGE': 'Please enter a valid weight (between 30 and 300 kg).',
        'CALC_WARN_004_TITLE': 'Invalid Age',
        'CALC_WARN_004_MESSAGE': 'Please enter a valid age (between 10 and 120 years).',
        'CALC_ERR_001_TITLE': 'Calculation Error',
        'CALC_ERR_001_MESSAGE': 'Could not calculate basal metabolic rate. Please check your input.',
        'CALC_ERR_002_TITLE': 'Unknown Goal',
        'CALC_ERR_002_MESSAGE': 'The selected calorie calculation goal is invalid. Please choose from the available goals.',
        'CALC_ERR_003_TITLE': 'Calorie Calculation Error',
        'CALC_ERR_003_MESSAGE': 'Final calorie calculation is not possible. Please check all entered data.',

        // LocalStorage Errors
        'STORAGE_ERR_001_TITLE': 'Data Saving Error',
        'STORAGE_ERR_001_MESSAGE': 'Your data could not be saved. Your browser might be full or in private Browse mode.',
        'STORAGE_ERR_003_TITLE': 'Data Loading Error',
        'STORAGE_ERR_003_MESSAGE': 'Failed to load saved data. It might be corrupted.',

        // DOM Errors
        'DOM_ERR_001_TITLE': 'Display Error',
        'DOM_ERR_001_MESSAGE': 'Could not find the necessary element to display the result. Please try refreshing the page.',
        'DOM_ERR_002_TITLE': 'Display Error',
        'DOM_ERR_002_MESSAGE': 'Could not find the overlay element. Please try refreshing the page.',
        'DOM_ERR_003_TITLE': 'Display Error',
        'DOM_ERR_003_MESSAGE': 'Some UI elements are missing. Please try refreshing the page.',

        // Meal Plan Generator Errors
        'RAZION_DOM_ERR_001_TITLE': 'UI Error',
        'RAZION_DOM_ERR_001_MESSAGE': 'Some required elements for the meal plan generator were not found. Please refresh the page.',
        'RAZION_WARN_001_TITLE': 'Invalid Calories for Plan',
        'RAZION_WARN_001_MESSAGE': 'Please enter a calorie amount for the meal plan between 1000 and 5000.',
        'RAZION_WARN_002_TITLE': 'Invalid Number of Meals',
        'RAZION_WARN_002_MESSAGE': 'Please enter a number of meals between 1 and 6.',
        'RAZION_WARN_003_TITLE': 'Invalid Number of Days',
        'RAZION_WARN_003_MESSAGE': 'Please enter a number of days for the plan between 1 and 7.',
        'RAZION_ERR_001_TITLE': 'Missing Recipe Data',
        'RAZION_ERR_001_MESSAGE': 'Could not load recipe data. The meal plan generator is unavailable.',
        'RAZION_WARN_004_TITLE': 'Incomplete Meal Plan',
        'RAZION_WARN_004_MESSAGE': 'Could not find enough unique components for all meals. Please try again.',
        'RAZION_ERR_002_TITLE': 'Meal Component Calculation Error',
        'RAZION_ERR_002_MESSAGE': 'An error occurred while calculating meal components. This might lead to inaccurate values.',
        'RAZION_ERR_003_TITLE': 'Meal Generation Error',
        'RAZION_ERR_003_MESSAGE': 'A problem occurred with one of the meals during plan generation. Please try again.',
        'RAZION_ADJUST_WARN_001_TITLE': 'Calorie Adjustment Issue',
        'RAZION_ADJUST_WARN_001_MESSAGE': 'Could not adjust the total plan calories because it is zero.',
        'RAZION_ADJUST_WARN_002_TITLE': 'Weight Adjustment Issue',
        'RAZION_ADJUST_WARN_002_MESSAGE': 'A problem occurred while adjusting a component\'s weight. This may affect calorie accuracy.',
        'RAZION_WARN_005_TITLE': 'Plan Not Generated',
        'RAZION_WARN_005_MESSAGE': 'Please generate a meal plan first by clicking the "START" button.',
        'RECIPE_ERR_001_TITLE': 'Missing Recipes',
        'RECIPE_ERR_001_MESSAGE': 'Missing main course data. Please contact the administrator.',
        'RECIPE_ERR_002_TITLE': 'Missing Recipes',
        'RECIPE_ERR_002_MESSAGE': 'Missing side dish data. Please contact the administrator.',
        'RECIPE_ERR_003_TITLE': 'Missing Recipes',
        'RECIPE_ERR_003_MESSAGE': 'Missing vegetable data. Please contact the administrator.',
        'RECIPE_ERR_004_TITLE': 'Missing Recipes',
        'RECIPE_ERR_004_MESSAGE': 'Missing addition data. Please contact the administrator.'
    }
};

// Функція для отримання локалізованого повідомлення
function getLocalizedMessage(code, type = 'message') {
    const langMessages = errorMessages[currentLanguage] || errorMessages['en']; // Запасний варіант на англійську
    return langMessages[`${code}_${type.toUpperCase()}`] || langMessages['GENERIC_ERROR_MESSAGE'];
}

// Функція для відправки логів на сервер (без змін від попередньої версії)
function sendLogToServer(logData) {
    if (!LOGGING_ENDPOINT) {
        console.warn("LOGGING_ENDPOINT не визначено. Логи на сервер не відправляються.");
        return;
    }

    const fullLogData = {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        ...logData,
        userId: localStorage.getItem('userId') || 'guest',
        sessionId: sessionStorage.getItem('sessionId') || 'unknown'
    };

    fetch(LOGGING_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(fullLogData)
    })
        .then(response => {
            if (!response.ok) {
                console.error(`Помилка відправки логу на сервер: ${response.status} ${response.statusText}`);
            }
        })
        .catch(error => {
            console.error("Не вдалося відправити лог на сервер:", error);
        });
}

// Загальна функція логування, яка вирішує, куди відправити лог
// Тепер приймає errorKey для локалізованих повідомлень
function customLogger(level, errorKey, error = null, context = {}) {
    const logEntry = {
        level: level,
        errorKey: errorKey, // Унікальний ідентифікатор помилки
        message: getLocalizedMessage(errorKey, 'message'), // Локалізоване повідомлення для користувача (за замовчуванням)
        context: context // Додаткова контекстна інформація
    };

    if (error) {
        logEntry.errorName = error.name;
        logEntry.errorMessage = error.message; // Детальніше технічне повідомлення
        logEntry.stack = error.stack;
    }

    // Логування в консоль (залежить від рівня LOG_LEVEL)
    if (level === 'debug' && ['debug'].includes(LOG_LEVEL)) {
        console.debug(`DEBUG [${errorKey}]:`, logEntry);
    } else if (level === 'info' && ['debug', 'info'].includes(LOG_LEVEL)) {
        console.info(`INFO [${errorKey}]:`, logEntry);
    } else if (level === 'warn' && ['debug', 'info', 'warn'].includes(LOG_LEVEL)) {
        console.warn(`WARN [${errorKey}]:`, logEntry);
    } else if (level === 'error' && ['debug', 'info', 'warn', 'error'].includes(LOG_LEVEL)) {
        console.error(`ERROR [${errorKey}]:`, logEntry);
    }

    // Відправка логу на сервер (для рівня 'warn' та 'error' зазвичай)
    if (['warn', 'error'].includes(level)) {
        sendLogToServer(logEntry);
    }

    // Показуємо користувачеві спеціалізоване повідомлення, якщо це 'warn' або 'error'
    if (['warn', 'error'].includes(level)) {
        displayUserFriendlyError(errorKey, error, context);
    }
}

// Функція для відображення дружнього повідомлення про помилку користувачеві
function displayUserFriendlyError(errorKey, error, context) {
    const errorModal = document.getElementById('error-modal');
    const errorTitle = document.getElementById('error-modal-title');
    const errorMessage = document.getElementById('error-modal-message');
    const errorInstructions = document.getElementById('error-modal-instructions');
    const reportButton = document.getElementById('error-modal-report-btn');
    const closeButton = document.getElementById('error-modal-close-btn');

    // Перевіряємо наявність елементів модального вікна
    if (!errorModal || !errorTitle || !errorMessage || !errorInstructions || !reportButton || !closeButton) {
        console.error("Не знайдено всі необхідні елементи для відображення модального вікна помилок.");
        // Якщо модалка не працює, повертаємось до простого alert
        alert(`${getLocalizedMessage(errorKey, 'title') || getLocalizedMessage('GENERIC_ERROR_TITLE')}\n\n${getLocalizedMessage(errorKey, 'message') || getLocalizedMessage('GENERIC_ERROR_MESSAGE')}`);
        return;
    }

    errorTitle.textContent = getLocalizedMessage(errorKey, 'title') || getLocalizedMessage('GENERIC_ERROR_TITLE');
    errorMessage.textContent = getLocalizedMessage(errorKey, 'message') || getLocalizedMessage('GENERIC_ERROR_MESSAGE');
    errorInstructions.textContent = getLocalizedMessage('CONTACT_SUPPORT_INSTRUCTIONS');
    reportButton.textContent = getLocalizedMessage('REPORT_BUTTON_TEXT');
    closeButton.textContent = getLocalizedMessage('CLOSE_BUTTON_TEXT');

    // Налаштовуємо кнопку "Повідомити про проблему"
    reportButton.onclick = function() {
        // Ми вже відправили лог на сервер через customLogger
        // Можна додати візуальний зворотний зв'язок (наприклад, "Дякуємо, ваш звіт відправлено!")
        alert(getLocalizedMessage('REPORT_SENT_CONFIRMATION', 'message') || "Дякуємо! Вашу проблему було надіслано.");
        errorModal.style.display = 'none'; // Закрити модалку після відправки
    };

    closeButton.onclick = function() {
        errorModal.style.display = 'none';
    };

    errorModal.style.display = 'flex'; // Показати модальне вікно
}

//----------CALCULATOR----------
// (Весь код калькулятора, як і раніше, але замість console.warn/alert
// та console.error використовуватимемо customLogger з відповідними errorKey)

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
    customLogger('info', 'CALC_INFO_001'); // Інформаційний лог

    try {
        const goal = document.getElementById('goal').value;
        const activity = parseFloat(document.getElementById('activity').value);
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const age = parseFloat(document.getElementById('age').value);

        if (isNaN(activity) || activity <= 0) {
            customLogger('warn', 'CALC_WARN_001', null, { value: activity });
            return;
        }
        if (isNaN(height) || height < 50 || height > 250) {
            customLogger('warn', 'CALC_WARN_002', null, { value: height });
            return;
        }
        if (isNaN(weight) || weight < 30 || weight > 300) {
            customLogger('warn', 'CALC_WARN_003', null, { value: weight });
            return;
        }
        if (isNaN(age) || age < 10 || age > 120) {
            customLogger('warn', 'CALC_WARN_004', null, { value: age });
            return;
        }

        let B = (weight * 10 + height * 6.25 - (age * 5 + 5)) * activity;
        if (isNaN(B) || !isFinite(B)) {
            const error = new Error("Calculation of basal metabolic rate (B) failed.");
            customLogger('error', 'CALC_ERR_001', error, { inputs: { weight, height, age, activity } });
            return;
        }

        let C;
        if (goal === 'stay') {
            C = B;
        } else if (goal === 'gain') {
            C = B * 1.03;
        } else if (goal === 'lose') {
            C = B * 0.7;
        } else {
            const error = new Error("Unknown calorie calculation goal.");
            customLogger('error', 'CALC_ERR_002', error, { goal: goal });
            return;
        }

        if (isNaN(C) || !isFinite(C)) {
            const error = new Error("Final calorie calculation (C) failed.");
            customLogger('error', 'CALC_ERR_003', error, { valueB: B, goal: goal });
            return;
        }

        const userData = {
            goal: goal, activity: activity, height: height, weight: weight, age: age,
            result: C.toFixed(2)
        };

        try {
            localStorage.setItem('userData', JSON.stringify(userData));
            customLogger('info', 'STORAGE_INFO_001');
        } catch (e) {
            customLogger('error', 'STORAGE_ERR_001', e, { key: 'userData' });
        }

        showResult(C.toFixed(2));

    } catch (error) {
        customLogger('error', 'GENERIC_ERROR', error); // Загальна помилка для непередбачених випадків
    }
});

function showResult(result) {
    const resultElement = document.getElementById('result-value');
    if (resultElement) {
        resultElement.textContent = `${result} ккал`;
    } else {
        customLogger('error', 'DOM_ERR_001', null, { elementId: 'result-value' });
    }

    const overlay = document.getElementById('result-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        overlay.style.animation = 'fadeIn 0.3s ease-in-out';
    } else {
        customLogger('error', 'DOM_ERR_002', null, { elementId: 'result-overlay' });
    }
}

document.getElementById('close-result').addEventListener('click', function() {
    customLogger('info', 'CALC_INFO_002');
    const overlay = document.getElementById('result-overlay');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease-in-out';
        setTimeout(() => { overlay.style.display = 'none'; }, 300);
    }
});

document.getElementById('clear-data').addEventListener('click', function() {
    customLogger('info', 'CALC_INFO_003');
    try {
        localStorage.removeItem('userData');
        customLogger('info', 'STORAGE_INFO_002');
    } catch (e) {
        customLogger('error', 'STORAGE_ERR_002', e, { key: 'userData' });
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
    customLogger('info', 'PAGE_LOAD_INFO_001');
    try {
        const savedData = localStorage.getItem('userData');
        if (savedData) {
            let userData;
            try {
                userData = JSON.parse(savedData);
                customLogger('info', 'STORAGE_INFO_003');
            } catch (e) {
                customLogger('error', 'STORAGE_ERR_003', e, { rawData: savedData });
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
            customLogger('info', 'STORAGE_INFO_004');
        }
    } catch (error) {
        customLogger('error', 'PAGE_LOAD_ERR_001', error);
    }
});


// ----------RAZION----------
// !!! Важливо: Об'єкт 'recipes' повинен бути глобально доступним або імпортований.
// Якщо 'recipes' не визначений, цей код видасть помилку.

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("meal-modal");
    const calculateBtn = document.getElementById("start");
    const regenerateBtn = document.getElementById("regenerate-btn");
    const closeBtn = document.getElementById("close-modal-btn");
    const closeModalBtn = document.querySelector(".meal-modal-close");

    if (!modal || !calculateBtn || !regenerateBtn) {
        customLogger('error', 'RAZION_DOM_ERR_001');
        return;
    }

    const closeResultTwo = document.getElementById('close-result-two');
    if (closeResultTwo) {
        closeResultTwo.addEventListener('click', function() {
            customLogger('info', 'RAZION_INFO_001_CLOSE_MODAL');
            const overlay = document.getElementById('meal-modal');
            if (overlay) {
                overlay.style.animation = 'fadeOut 0.3s ease-in-out';
                setTimeout(() => { overlay.style.display = 'none'; }, 300);
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
            customLogger('info', 'RAZION_INFO_002_MODAL_CLOSED');
        }
    }

    function generateMealPlan() {
        customLogger('info', 'RAZION_INFO_003_GENERATE_START');
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

            if (isNaN(calories) || calories < 1000 || calories > 5000) {
                customLogger('warn', 'RAZION_WARN_001', null, { value: calories });
                return;
            }
            if (isNaN(mealsPerDay) || mealsPerDay < 1 || mealsPerDay > 6) {
                customLogger('warn', 'RAZION_WARN_002', null, { value: mealsPerDay });
                return;
            }
            if (isNaN(days) || days < 1 || days > 7) {
                customLogger('warn', 'RAZION_WARN_003', null, { value: days });
                return;
            }

            if (typeof recipes === 'undefined' || !recipes.mainCourses || !recipes.sides || !recipes.vegetables || !recipes.additions) {
                const error = new Error("Об'єкт 'recipes' не визначений або відсутні необхідні дані про рецепти.");
                customLogger('error', 'RAZION_ERR_001', error, { recipesDefined: typeof recipes !== 'undefined' });
                throw error;
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
                        const side = getRandomSide(mainCourse ? mainCourse.type : null);
                        const vegetable = getRandomVegetable();
                        const addition = getRandomAddition();

                        if (!mainCourse || !side || !vegetable || !addition) {
                            customLogger('warn', 'RAZION_WARN_004', null, {
                                mealNumber: meal, dayNumber: day,
                                foundMain: !!mainCourse, foundSide: !!side, foundVegetable: !!vegetable, foundAddition: !!addition
                            });
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
                        );

                        if (!isValidMeal) {
                            customLogger('error', 'RAZION_ERR_002', null, {
                                mealNumber: meal, dayNumber: day,
                                components: mealComponents.map(c => ({ name: c.name, cal: c.calories, weight: c.weight }))
                            });
                            continue;
                        }

                        const totalMealCalories = mealComponents.reduce((sum, c) => sum + c.calories, 0);
                        const difference = mealCalories - totalMealCalories;

                        if (Math.abs(difference) > 10) {
                            const main = mealComponents[0];
                            if (main.weight === 0 || isNaN(main.calories / main.weight) || main.calories === 0) {
                                customLogger('warn', 'RAZION_ADJUST_WARN_002', null, { mainItem: main });
                            } else {
                                const caloriesPerGram = main.calories / main.weight;
                                const adjustment = difference / caloriesPerGram;

                                main.weight = Math.max(50, Math.round(main.weight + adjustment));
                                main.calories = Math.round((main.weight * main.caloriesPer100g) / 100);
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
                        customLogger('error', 'RAZION_ERR_003', e, { mealNumber: meal, dayNumber: day });
                    }
                }

                dayPlans.push({
                    day, meals: dayMeals, totalCalories: Math.round(dayCalories)
                });
                totalDaysCalories += dayCalories;
            }

            const totalTargetCalories = calories * days;
            const totalDifference = totalTargetCalories - totalDaysCalories;

            if (Math.abs(totalDifference) > 50 && totalDaysCalories > 0) {
                currentPlan = adjustTotalCalories(dayPlans, totalTargetCalories, totalDaysCalories);
                customLogger('info', 'RAZION_INFO_004_ADJUSTED', null, { target: totalTargetCalories, actual: totalDaysCalories });
            } else if (totalDaysCalories === 0) {
                customLogger('warn', 'RAZION_ADJUST_WARN_001');
            }


            displayMealPlan();
            if (modal) {
                modal.style.display = "block";
            }
            customLogger('info', 'RAZION_INFO_005_GENERATED');

        } catch (error) {
            customLogger('error', 'GENERIC_ERROR', error); // Загальна помилка для непередбачених випадків
        }
    }

    function calculateComponent(item, targetCalories, type) {
        if (!item || isNaN(item.caloriesPer100g) || item.caloriesPer100g <= 0) {
            customLogger('warn', 'RAZION_COMP_WARN_001', null, { item: item });
            return { name: item ? item.name : "Невідомо", type: type, weight: 0, calories: 0, proteinPer100g: 0, carbsPer100g: 0, fatPer100g: 0, protein: 0, carbs: 0, fat: 0 };
        }
        const weight = Math.round((targetCalories * 100) / item.caloriesPer100g);
        if (isNaN(weight) || weight < 0) {
            customLogger('warn', 'RAZION_COMP_WARN_002', null, { item: item, targetCalories, calculatedWeight: weight });
            return { name: item.name, type: type === 'main' ? (item.type === 'fish' ? 'fish' : 'meat') : type, weight: 0, calories: 0, proteinPer100g: item.proteinPer100g, carbsPer100g: item.carbsPer100g, fatPer100g: item.fatPer100g, protein: 0, carbs: 0, fat: 0 };
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
            customLogger('warn', 'RAZION_ADJUST_WARN_001');
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
                        customLogger('warn', 'RAZION_ADJUST_WARN_002', null, { component: comp });
                    } else {
                        newWeight = Math.max(0, Math.round((newCalories * comp.weight) / comp.calories));
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
                    ...meal, components: adjustedComponents,
                    totalCalories: adjustedComponents.reduce((sum, c) => sum + c.calories, 0)
                };
            });

            return {
                ...day, meals: adjustedMeals,
                totalCalories: adjustedMeals.reduce((sum, m) => sum + m.totalCalories, 0)
            };
        });
    }

    function regenerateMealPlan() {
        if (currentPlan.length === 0) {
            customLogger('warn', 'RAZION_WARN_005');
            return;
        }
        customLogger('info', 'RAZION_INFO_006_REGENERATE');
        generateMealPlan();
    }

    function getRandomMainCourse() {
        if (!recipes || !recipes.mainCourses || recipes.mainCourses.length === 0) {
            customLogger('error', 'RECIPE_ERR_001');
            return null;
        }
        const available = recipes.mainCourses.filter(m => !usedMeals.has(m.name));
        const pool = available.length > 0 ? available : recipes.mainCourses;
        if (pool.length === 0) {
            customLogger('warn', 'RECIPE_WARN_001');
            return null;
        }
        return pool[Math.floor(Math.random() * pool.length)];
    }

    function getRandomSide(mainType) {
        if (!recipes || !recipes.sides || recipes.sides.length === 0) {
            customLogger('error', 'RECIPE_ERR_002');
            return null;
        }
        const available = recipes.sides.filter(s => s.pairsWith.includes(mainType) && !usedMeals.has(s.name));
        const pool = available.length > 0 ? available : recipes.sides.filter(s => s.pairsWith.includes(mainType));
        if (pool.length === 0) {
            customLogger('warn', 'RECIPE_WARN_002', null, { mainType: mainType });
            return null;
        }
        return pool[Math.floor(Math.random() * pool.length)];
    }

    function getRandomVegetable() {
        if (!recipes || !recipes.vegetables || recipes.vegetables.length === 0) {
            customLogger('error', 'RECIPE_ERR_003');
            return null;
        }
        const available = recipes.vegetables.filter(v => !usedMeals.has(v.name));
        const pool = available.length > 0 ? available : recipes.vegetables;
        if (pool.length === 0) {
            customLogger('warn', 'RECIPE_WARN_003');
            return null;
        }
        return pool[Math.floor(Math.random() * pool.length)];
    }

    function getRandomAddition() {
        if (!recipes || !recipes.additions || recipes.additions.length === 0) {
            customLogger('error', 'RECIPE_ERR_004');
            return null;
        }
        return recipes.additions[Math.floor(Math.random() * recipes.additions.length)];
    }

    function displayMealPlan() {
        const mealPlanResultElement = document.getElementById("meal-plan-result");
        if (!mealPlanResultElement) {
            customLogger('error', 'DOM_ERR_003', null, { elementId: 'meal-plan-result' });
            return;
        }

        let html = '';
        if (currentPlan.length === 0) {
            html = "<p>План харчування не згенеровано або сталася помилка.</p>";
            mealPlanResultElement.innerHTML = html;
            customLogger('warn', 'RAZION_DISPLAY_WARN_001');
            return;
        }

        currentPlan.forEach(dayPlan => {
            html += `<div class="meal-day"><h3>День ${dayPlan.day} (${dayPlan.totalCalories} ккал)</h3>`;

            dayPlan.meals.forEach((meal, index) => {
                html += `
                    <div class="meal-item">
                        <strong>Прийом їжі ${index + 1}: ${meal.totalCalories} ккал</strong>
                        ${meal.components.map(comp => {
                    if (!comp || isNaN(comp.weight) || isNaN(comp.calories) || isNaN(comp.protein) || isNaN(comp.carbs) || isNaN(comp.fat)) {
                        customLogger('warn', 'RAZION_DISPLAY_WARN_002', null, { componentData: comp });
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
        customLogger('info', 'RAZION_DISPLAY_INFO_001', null, { daysDisplayed: currentPlan.length });
    }

    function getComponentName(type) {
        const names = {
            'meat': 'М\'ясо', 'poultry': 'Пташина', 'fish': 'Риба', 'side': 'Гарнір',
            'vegetable': 'Овочі', 'addition': 'Добавка',
        };
        return names[type] || type;
    }
});