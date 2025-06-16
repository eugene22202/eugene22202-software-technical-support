// ----------CALCULATOR----------

// Ограничение ввода до 3 символов в полях роста, веса и возраста
document.getElementById("height").addEventListener("input", function() {
    if (this.value.length > 3) this.value = this.value.slice(0, 3); // Ограничиваем ввод до 3 символов
});

document.getElementById("weight").addEventListener("input", function() {
    if (this.value.length > 3) this.value = this.value.slice(0, 3); // Ограничиваем ввод до 3 символов
});

document.getElementById("age").addEventListener("input", function() {
    if (this.value.length > 3) this.value = this.value.slice(0, 3); // Ограничиваем ввод до 3 символов
});

// Обработка кнопки "START" в калькуляторе
document.getElementById("calculate").addEventListener("click", function() {
    const goal = document.getElementById("goal").value; // Получаем выбранную цель
    const activity = parseFloat(document.getElementById("activity").value); // Получаем уровень активности
    const height = parseFloat(document.getElementById("height").value); // Получаем рост
    const weight = parseFloat(document.getElementById("weight").value); // Получаем вес
    const age = parseFloat(document.getElementById("age").value); // Получаем возраст

    // Валидация данных
    if (isNaN(height) || height < 50 || height > 250) {
        alert("Будь ласка, введіть коректний ріст (від 50 до 250 см).");
        return;
    }
    if (isNaN(weight) || weight < 30 || weight > 300) {
        alert("Будь ласка, введіть коректну вагу (від 30 до 300 кг).");
        return;
    }
    if (isNaN(age) || age < 10 || age > 120) {
        alert("Будь ласка, введіть коректний вік (від 10 до 120 років).");
        return;
    }

    // Выполняем расчет по формуле
    const B = (weight * 10 + height * 6.25 - (age * 5 + 5)) * activity;

    let C;
    if (goal === "stay") {
        C = B; // Остаться в весе
    } else if (goal === "gain") {
        C = B * 1.03; // Набрать вес (+3%)
    } else if (goal === "lose") {
        C = B * 0.7; // Сбросить вес (-30%)
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
    localStorage.setItem("userData", JSON.stringify(userData));

    // Показываем результат
    showResult(C.toFixed(2));
});

// Функция для отображения результата
function showResult(result) {
    const resultElement = document.getElementById("result-value");
    resultElement.textContent = `${result} ккал`; // Выводим результат

    const overlay = document.getElementById("result-overlay");
    overlay.style.display = "flex"; // Показываем оверлей
    overlay.style.animation = "fadeIn 0.3s ease-in-out"; // Анимация появления
}

// Закрываем блок с результатом
document.getElementById("close-result").addEventListener("click", function() {
    const overlay = document.getElementById("result-overlay");
    overlay.style.animation = "fadeOut 0.3s ease-in-out"; // Анимация исчезновения

    // Скрываем оверлей после завершения анимации
    setTimeout(() => {
        overlay.style.display = "none";
    }, 300); // 300ms — длительность анимации
});

// Очистка данных из localStorage и формы
document.getElementById("clear-data").addEventListener("click", function() {
    localStorage.removeItem("userData"); // Удаляем данные из localStorage

    // Очищаем форму
    document.getElementById("goal").value = "stay";
    document.getElementById("activity").value = "1.38";
    document.getElementById("height").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("age").value = "";

    // Скрываем блок с результатом
    const overlay = document.getElementById("result-overlay");
    overlay.style.display = "none";
});

// Загрузка сохраненных данных при загрузке страницы
document.addEventListener("DOMContentLoaded", function() {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
        const userData = JSON.parse(savedData);

        // Заполняем форму сохраненными данными
        document.getElementById("goal").value = userData.goal;
        document.getElementById("activity").value = userData.activity;
        document.getElementById("height").value = userData.height;
        document.getElementById("weight").value = userData.weight;
        document.getElementById("age").value = userData.age;

        // Показываем результат
        const resultElement = document.getElementById("result-value");
        resultElement.textContent = `${userData.result} ккал`;

        // Показываем блок с результатом
        const overlay = document.getElementById("result-overlay");
        overlay.style.display = "flex";
    }
});





// ----------RAZION----------

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("meal-modal");
    const calculateBtn = document.getElementById("start");
    const regenerateBtn = document.getElementById("regenerate-btn");
    // const closeBtn = document.getElementById("close-modal-btn");
    // const closeModalBtn = document.querySelector(".meal-modal-close");

    document.getElementById("close-result-two").addEventListener("click", function() {
    const overlay = document.getElementById("meal-modal");
    overlay.style.animation = "fadeOut 0.3s ease-in-out"; // Анимация исчезновения
    // Скрываем оверлей после завершения анимации
    setTimeout(() => {
        overlay.style.display = "none";
    }, 300); // 300ms — длительность анимации
    });
    
    let currentPlan = [];
    let usedMeals = new Set();

    // Инициализация кнопок
    calculateBtn.addEventListener("click", generateMealPlan);
    regenerateBtn.addEventListener("click", regenerateMealPlan);
    closeBtn.addEventListener("click", closeModal);
    closeModalBtn.addEventListener("click", closeModal);

    function closeModal() {
        modal.style.display = "none";
    }

    function generateMealPlan() {
        // Получаем значения из формы
        const calories = parseInt(document.getElementById("calories").value) || 2000;
        const mealsPerDay = Math.min(6, Math.max(1, parseInt(document.getElementById("meals").value) || 3));
        const days = Math.min(7, Math.max(1, parseInt(document.getElementById("days").value) || 1));

        // Проверка ввода
        if (calories < 1000 || calories > 5000) {
            alert("Будь ласка, введіть коректну кількість калорій (від 1000 до 5000)");
            return;
        }

        // Сброс данных
        currentPlan = [];
        usedMeals = new Set();
        
        // Генерация плана
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
                    
                    const mealComponents = [
                        calculateComponent(mainCourse, mealCalories * 0.50, "main"),
                        calculateComponent(side, mealCalories * 0.30, "side"),
                        calculateComponent(vegetable, mealCalories * 0.15, "vegetable"),
                        calculateComponent(addition, mealCalories * 0.05, "addition")
                    ];
                    
                    // Корректировка веса
                    const totalMealCalories = mealComponents.reduce((sum, c) => sum + c.calories, 0);
                    const difference = mealCalories - totalMealCalories;
                    
                    if (Math.abs(difference) > 10) {
                        const main = mealComponents[0];
                        const caloriesPerGram = main.calories / main.weight;
                        const adjustment = difference / caloriesPerGram;
                        
                        main.weight = Math.max(50, Math.round(main.weight + adjustment));
                        main.calories = Math.round(main.weight * caloriesPerGram);
                        main.protein = Math.round((main.weight * main.proteinPer100g) / 100 * 10) / 10;
                        main.carbs = Math.round((main.weight * main.carbsPer100g) / 100 * 10) / 10;
                        main.fat = Math.round((main.weight * main.fatPer100g) / 100 * 10) / 10;
                    }
                    
                    dayMeals.push({
                        components: mealComponents,
                        totalCalories: mealComponents.reduce((sum, c) => sum + c.calories, 0)
                    });
                    
                    dayCalories += mealComponents.reduce((sum, c) => sum + c.calories, 0);
                    
                    usedMeals.add(mainCourse.name);
                    usedMeals.add(side.name);
                } catch (e) {
                    console.error("Помилка генерації:", e);
                }
            }
            
            dayPlans.push({ 
                day, 
                meals: dayMeals, 
                totalCalories: Math.round(dayCalories) 
            });
            totalDaysCalories += dayCalories;
        }

        // Финальная корректировка
        const totalTargetCalories = calories * days;
        const totalDifference = totalTargetCalories - totalDaysCalories;
        
        if (Math.abs(totalDifference) > 50) {
            currentPlan = adjustTotalCalories(dayPlans, totalTargetCalories, totalDaysCalories);
        } else {
            currentPlan = dayPlans;
        }
        
        displayMealPlan();
        modal.style.display = "block";
    }

    function calculateComponent(item, targetCalories, type) {
        const weight = Math.round((targetCalories * 100) / item.caloriesPer100g);
        return {
            name: item.name,
            type: type === "main" ? (item.type === "fish" ? "fish" : "meat") : type,
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
        const factor = targetCalories / currentCalories;
        return dayPlans.map(day => {
            const adjustedMeals = day.meals.map(meal => {
                const adjustedComponents = meal.components.map(comp => {
                    const newCalories = Math.round(comp.calories * factor);
                    const newWeight = Math.round((newCalories * 100) / (comp.calories / comp.weight * 100));
                    
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
        if (currentPlan.length === 0) return;
        generateMealPlan();
    }

    // Функции для выбора блюд
    function getRandomMainCourse() {
        const available = recipes.mainCourses.filter(m => !usedMeals.has(m.name));
        const pool = available.length > 0 ? available : recipes.mainCourses;
        return pool[Math.floor(Math.random() * pool.length)];
    }
    
    function getRandomSide(mainType) {
        const available = recipes.sides.filter(s => 
            s.pairsWith.includes(mainType) && !usedMeals.has(s.name)
        );
        const pool = available.length > 0 ? available : 
                     recipes.sides.filter(s => s.pairsWith.includes(mainType));
        return pool[Math.floor(Math.random() * pool.length)];
    }
    
    function getRandomVegetable() {
        const available = recipes.vegetables.filter(v => !usedMeals.has(v.name));
        const pool = available.length > 0 ? available : recipes.vegetables;
        return pool[Math.floor(Math.random() * pool.length)];
    }
    
    function getRandomAddition() {
        return recipes.additions[Math.floor(Math.random() * recipes.additions.length)];
    }

    function displayMealPlan() {
        let html = "";
        const totalTargetCalories = parseInt(document.getElementById("calories").value) * currentPlan.length;
        const totalActualCalories = currentPlan.reduce((sum, day) => sum + day.totalCalories, 0);
        const totalDifference = totalActualCalories - totalTargetCalories;
        
        currentPlan.forEach(dayPlan => {
            const dayTarget = totalTargetCalories / currentPlan.length;
            const dayDifference = dayPlan.totalCalories - dayTarget;
            
            html += `<div class="meal-day"><h3>День ${dayPlan.day} (${dayPlan.totalCalories} ккал)`;
            // html += `<span class="calorie-difference ${dayDifference > 0 ? 'over' : 'under'}">`;
            // html += `${dayDifference > 0 ? '+' : ''}${Math.round(dayDifference)} ккал</span></h3>`;
            
            dayPlan.meals.forEach((meal, index) => {
                html += `
                    <div class="meal-item">
                        <strong>Прийом їжі ${index + 1}: ${meal.totalCalories} ккал</strong>
                        ${meal.components.map(comp => `
                            <div class="meal-component">
                                <u>${getComponentName(comp.type)}:</u> 
                                ${comp.name} (${comp.weight}г) -
                                ${comp.calories} ккал 
                                (Б:${comp.protein}г Ж:${comp.fat}г В:${comp.carbs}г)
                            </div>
                        `).join("")}
                    </div>
                `;
            });
            
            html += "</div>";
        });
        
        // Общая статистика
        // html += `<div class="total-summary">
        //     <strong>Загалом:</strong> ${totalActualCalories} ккал 
        //     <span class="calorie-difference ${totalDifference > 0 ? 'over' : 'under'}">
        //     (${totalDifference > 0 ? '+' : ''}${Math.round(totalDifference)} ккал)
        //     </span>
        // </div>`;
        
        document.getElementById("meal-plan-result").innerHTML = html;
    }

    function getComponentName(type) {
        const names = {
            "meat": "М'ясо",
            "poultry": "Пташина",
            "fish": "Риба",
            "side": "Гарнір",
            "vegetable": "Овочі",
            "addition": "Добавка"
        };
        return names[type] || type;
    }
});

