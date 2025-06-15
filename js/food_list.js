const recipes = {
    mainCourses: [
        // М'ясні страви (25 варіантів)
        { 
            name: "Котлета по-київськи", 
            caloriesPer100g: 250, 
            proteinPer100g: 18, 
            carbsPer100g: 10, 
            fatPer100g: 15,
            type: "meat",
            standardWeight: 150
        },
        { 
            name: "Печена телятина", 
            caloriesPer100g: 180, 
            proteinPer100g: 26, 
            carbsPer100g: 0, 
            fatPer100g: 9,
            type: "meat",
            standardWeight: 150
        },
        { 
            name: "Голубці з м'ясом", 
            caloriesPer100g: 150, 
            proteinPer100g: 12, 
            carbsPer100g: 10, 
            fatPer100g: 7,
            type: "meat",
            standardWeight: 200
        },
        { 
            name: "Сало солоне", 
            caloriesPer100g: 800, 
            proteinPer100g: 2, 
            carbsPer100g: 0, 
            fatPer100g: 89,
            type: "meat",
            standardWeight: 30
        },
        { 
            name: "Ковбаса домашня", 
            caloriesPer100g: 300, 
            proteinPer100g: 15, 
            carbsPer100g: 1, 
            fatPer100g: 26,
            type: "meat",
            standardWeight: 80
        },
        { 
            name: "Буженина", 
            caloriesPer100g: 200, 
            proteinPer100g: 22, 
            carbsPer100g: 1, 
            fatPer100g: 12,
            type: "meat",
            standardWeight: 100
        },
        { 
            name: "М'ясо по-французьки", 
            caloriesPer100g: 220, 
            proteinPer100g: 18, 
            carbsPer100g: 6, 
            fatPer100g: 14,
            type: "meat",
            standardWeight: 150
        },
        { 
            name: "Тефтелі в соусі", 
            caloriesPer100g: 180, 
            proteinPer100g: 16, 
            carbsPer100g: 7, 
            fatPer100g: 10,
            type: "meat",
            standardWeight: 150
        },
        { 
            name: "Печеня з яловичини", 
            caloriesPer100g: 190, 
            proteinPer100g: 25, 
            carbsPer100g: 2, 
            fatPer100g: 9,
            type: "meat",
            standardWeight: 150
        },
        { 
            name: "Шашлик зі свинини", 
            caloriesPer100g: 280, 
            proteinPer100g: 20, 
            carbsPer100g: 1, 
            fatPer100g: 22,
            type: "meat",
            standardWeight: 150
        },

        // Пташина (20 варіантів)
        { 
            name: "Курка запечена з часником", 
            caloriesPer100g: 170, 
            proteinPer100g: 25, 
            carbsPer100g: 1, 
            fatPer100g: 8,
            type: "poultry",
            standardWeight: 150
        },
        { 
            name: "Качка з яблуками", 
            caloriesPer100g: 210, 
            proteinPer100g: 18, 
            carbsPer100g: 8, 
            fatPer100g: 12,
            type: "poultry",
            standardWeight: 150
        },
        { 
            name: "Курка в сметані", 
            caloriesPer100g: 190, 
            proteinPer100g: 22, 
            carbsPer100g: 3, 
            fatPer100g: 10,
            type: "poultry",
            standardWeight: 150
        },
        { 
            name: "Курячі котлети", 
            caloriesPer100g: 160, 
            proteinPer100g: 20, 
            carbsPer100g: 5, 
            fatPer100g: 7,
            type: "poultry",
            standardWeight: 120
        },
        { 
            name: "Печене каченя", 
            caloriesPer100g: 230, 
            proteinPer100g: 20, 
            carbsPer100g: 0, 
            fatPer100g: 17,
            type: "poultry",
            standardWeight: 150
        },
        { 
            name: "Фарширована курка", 
            caloriesPer100g: 200, 
            proteinPer100g: 23, 
            carbsPer100g: 5, 
            fatPer100g: 10,
            type: "poultry",
            standardWeight: 180
        },
        { 
            name: "Курячий рулет", 
            caloriesPer100g: 180, 
            proteinPer100g: 21, 
            carbsPer100g: 3, 
            fatPer100g: 9,
            type: "poultry",
            standardWeight: 120
        },

        // Риба (15 варіантів)
        { 
            name: "Лосось на грилі", 
            caloriesPer100g: 200, 
            proteinPer100g: 22, 
            carbsPer100g: 0, 
            fatPer100g: 13,
            type: "fish",
            standardWeight: 150
        },
        { 
            name: "Сом запечений", 
            caloriesPer100g: 180, 
            proteinPer100g: 20, 
            carbsPer100g: 1, 
            fatPer100g: 11,
            type: "fish",
            standardWeight: 180
        },
        { 
            name: "Оселедець з цибулею", 
            caloriesPer100g: 150, 
            proteinPer100g: 15, 
            carbsPer100g: 3, 
            fatPer100g: 9,
            type: "fish",
            standardWeight: 100
        },
        { 
            name: "Тріска з овочами", 
            caloriesPer100g: 120, 
            proteinPer100g: 18, 
            carbsPer100g: 5, 
            fatPer100g: 3,
            type: "fish",
            standardWeight: 200
        },
        { 
            name: "Форель у фользі", 
            caloriesPer100g: 170, 
            proteinPer100g: 20, 
            carbsPer100g: 1, 
            fatPer100g: 10,
            type: "fish",
            standardWeight: 180
        },
        { 
            name: "Карась смажений", 
            caloriesPer100g: 190, 
            proteinPer100g: 17, 
            carbsPer100g: 2, 
            fatPer100g: 12,
            type: "fish",
            standardWeight: 150
        }
    ],
    
    sides: [
        // Крупи та каші (15 варіантів)
        { 
            name: "Гречка з грибами", 
            caloriesPer100g: 120, 
            proteinPer100g: 4, 
            carbsPer100g: 25, 
            fatPer100g: 1,
            pairsWith: ["meat", "poultry"],
            standardWeight: 200
        },
        { 
            name: "Картопляне пюре", 
            caloriesPer100g: 90, 
            proteinPer100g: 2, 
            carbsPer100g: 18, 
            fatPer100g: 2,
            pairsWith: ["meat", "fish"],
            standardWeight: 200
        },
        { 
            name: "Перлова каша", 
            caloriesPer100g: 110, 
            proteinPer100g: 3, 
            carbsPer100g: 23, 
            fatPer100g: 1,
            pairsWith: ["meat", "poultry"],
            standardWeight: 200
        },
        { 
            name: "Кукурудзяна каша", 
            caloriesPer100g: 100, 
            proteinPer100g: 3, 
            carbsPer100g: 22, 
            fatPer100g: 1,
            pairsWith: ["meat", "fish"],
            standardWeight: 200
        },
        { 
            name: "Рис з овочами", 
            caloriesPer100g: 130, 
            proteinPer100g: 3, 
            carbsPer100g: 28, 
            fatPer100g: 1,
            pairsWith: ["meat", "poultry", "fish"],
            standardWeight: 200
        },
        { 
            name: "Пшоняна каша", 
            caloriesPer100g: 110, 
            proteinPer100g: 3, 
            carbsPer100g: 24, 
            fatPer100g: 1,
            pairsWith: ["meat", "poultry"],
            standardWeight: 200
        },
        { 
            name: "Мамалига", 
            caloriesPer100g: 140, 
            proteinPer100g: 3, 
            carbsPer100g: 30, 
            fatPer100g: 2,
            pairsWith: ["meat", "fish"],
            standardWeight: 200
        },

        // Макаронні вироби (10 варіантів)
        { 
            name: "Локшина домашня", 
            caloriesPer100g: 140, 
            proteinPer100g: 5, 
            carbsPer100g: 28, 
            fatPer100g: 1,
            pairsWith: ["meat", "poultry"],
            standardWeight: 200
        },
        { 
            name: "Паста з соусом", 
            caloriesPer100g: 160, 
            proteinPer100g: 5, 
            carbsPer100g: 30, 
            fatPer100g: 3,
            pairsWith: ["meat", "fish"],
            standardWeight: 200
        },
        { 
            name: "Вареники з картоплею", 
            caloriesPer100g: 150, 
            proteinPer100g: 4, 
            carbsPer100g: 30, 
            fatPer100g: 3,
            pairsWith: ["meat", "poultry"],
            standardWeight: 200
        }
    ],
    
    vegetables: [
        // Овочеві страви (25 варіантів)
        { 
            name: "Тушкована капуста", 
            caloriesPer100g: 50, 
            proteinPer100g: 2, 
            carbsPer100g: 8, 
            fatPer100g: 1,
            standardWeight: 150
        },
        { 
            name: "Салат з помідорів та огірків", 
            caloriesPer100g: 30, 
            proteinPer100g: 1, 
            carbsPer100g: 5, 
            fatPer100g: 0,
            standardWeight: 150
        },
        { 
            name: "Борщ український", 
            caloriesPer100g: 80, 
            proteinPer100g: 3, 
            carbsPer100g: 12, 
            fatPer100g: 3,
            standardWeight: 300
        },
        { 
            name: "Запечені овочі", 
            caloriesPer100g: 70, 
            proteinPer100g: 2, 
            carbsPer100g: 12, 
            fatPer100g: 2,
            standardWeight: 200
        },
        { 
            name: "Буряк з часником", 
            caloriesPer100g: 60, 
            proteinPer100g: 2, 
            carbsPer100g: 12, 
            fatPer100g: 0,
            standardWeight: 150
        },
        { 
            name: "Морква по-корейськи", 
            caloriesPer100g: 70, 
            proteinPer100g: 1, 
            carbsPer100g: 8, 
            fatPer100g: 4,
            standardWeight: 100
        },
        { 
            name: "Кабачкова ікра", 
            caloriesPer100g: 50, 
            proteinPer100g: 1, 
            carbsPer100g: 7, 
            fatPer100g: 2,
            standardWeight: 100
        },
        { 
            name: "Огірки квашені", 
            caloriesPer100g: 20, 
            proteinPer100g: 1, 
            carbsPer100g: 3, 
            fatPer100g: 0,
            standardWeight: 100
        },
        { 
            name: "Капуста квашена", 
            caloriesPer100g: 25, 
            proteinPer100g: 1, 
            carbsPer100g: 5, 
            fatPer100g: 0,
            standardWeight: 100
        }
    ],
    
    additions: [
        // Соуси та добавки (15 варіантів)
        { 
            name: "Сметана (20%)", 
            caloriesPer100g: 200, 
            proteinPer100g: 3, 
            carbsPer100g: 4, 
            fatPer100g: 20,
            standardWeight: 30
        },
        { 
            name: "Оливкова олія", 
            caloriesPer100g: 900, 
            proteinPer100g: 0, 
            carbsPer100g: 0, 
            fatPer100g: 100,
            standardWeight: 10
        },
        { 
            name: "Гірчиця", 
            caloriesPer100g: 70, 
            proteinPer100g: 4, 
            carbsPer100g: 5, 
            fatPer100g: 4,
            standardWeight: 10
        },
        { 
            name: "Кримський соус", 
            caloriesPer100g: 150, 
            proteinPer100g: 1, 
            carbsPer100g: 10, 
            fatPer100g: 12,
            standardWeight: 20
        },
        { 
            name: "Горіхи грецькі", 
            caloriesPer100g: 650, 
            proteinPer100g: 15, 
            carbsPer100g: 15, 
            fatPer100g: 60,
            standardWeight: 20
        },
        { 
            name: "Мед", 
            caloriesPer100g: 320, 
            proteinPer100g: 0, 
            carbsPer100g: 80, 
            fatPer100g: 0,
            standardWeight: 15
        },
        { 
            name: "Майонез домашній", 
            caloriesPer100g: 600, 
            proteinPer100g: 1, 
            carbsPer100g: 2, 
            fatPer100g: 65,
            standardWeight: 15
        }
    ]
};



