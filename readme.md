# Игра Flappy Bird на [Phaser](https://github.com/photonstorm/phaser)

## Сборка проекта

Проект работает на webpack

## Просмотр сборки локально

Выполнить в терминале

```
npm i
npm run dev
```

## Структура проекта

Приведена к общепринятой архитектуре фронта.

Включает в себя блоки:
- app.js - корень проекта, занимается логикой работы со сценами (далее вью);
- views (scenes) - страницы игры. Включает в себя логику организации объектов (далее компонентов), организация их физики и взаимодействия; 
- components (objects) - объекты игры. Объект игры включает в себя свои визуальные характеристики и анимации.
