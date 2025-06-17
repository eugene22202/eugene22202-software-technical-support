# Eugene Software Technical Support

Це фронтенд-проєкт, створений для демонстрації технічної підтримки програмного забезпечення. Він містить базову HTML-сторінку зі скриптами JavaScript та налаштуванням лінтерів і документації.

## 🚀 Як розгорнути проект локально (для розробника)

Ця інструкція допоможе вам налаштувати середовище для розробки на новій системі.

---

### ✅ Необхідні інструменти

Перед початком переконайтесь, що у вас встановлені:

- **Git** – https://git-scm.com/downloads
- **Node.js** (версія 18 або новіша) – https://nodejs.org/

Перевірити встановлення:
```bash
git --version
node --version
npm --version
```

---

### 📥 Клонування репозиторію

```bash
git clone https://github.com/eugene22202/eugene22202-software-technical-support.git
cd eugene22202-software-technical-support
```

---

### 📦 Встановлення залежностей

```bash
npm install
```

Це встановить:
- ESLint
- Stylelint
- JSDoc

---

### 🛠 Налаштування середовища

Налаштовувати нічого не потрібно — всі конфігураційні файли (`.eslintrc.json`, `.stylelintrc.json`, `jsdoc.json`) вже у репозиторії.

---

### 💻 Запуск проекту

Для запуску сайту достатньо відкрити файл `index.html` у браузері.

Рекомендується встановити розширення типу [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) для автоматичного оновлення змін.

---

### 🧪 Базові команди

```bash
# Запустити лінтер для JavaScript
npx eslint script.js

# Запустити лінтер для стилів
npx stylelint "**/*.css"

# Генерація документації
npx jsdoc script.js -c jsdoc.json
```

---

### 📂 Структура проекту

```
├── index.html
├── script.js
├── package.json
├── .eslintrc.json
├── .stylelintrc.json
├── jsdoc.json
└── docs/
```

---

### 👨‍💻 Автор

- Eugene22202 — https://github.com/eugene22202
