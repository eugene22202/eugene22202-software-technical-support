
# Інструкція з оновлення проєкту

## Підготовка
- Створити резервну копію поточного коду (див. інструкцію з резервного копіювання)
- Перевірити сумісність оновлень з існуючими залежностями

## Планування простою
- Якщо використовуєте production-сервер, узгодьте вікно для оновлення

## Процес оновлення
1. Зупиніть веб-сервер (наприклад, `sudo systemctl stop nginx`)
2. Отримайте оновлення коду:
```bash
git pull origin main
```
3. Встановіть оновлені залежності:
```bash
npm install
```
4. Запустіть збірку (якщо потрібно):
```bash
npm run build
```
5. Запустіть веб-сервер назад:
```bash
sudo systemctl start nginx
```
6. Перевірте працездатність
