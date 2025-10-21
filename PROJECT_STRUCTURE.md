# 📁 Структура Проекта

## Обзор

Проект использует **Feature-Sliced Design** архитектуру с четким разделением слоев и ответственности.

## 🎯 Технологический Стек

- **React** 19.1
- **TypeScript** 5.9
- **Vite** (Rolldown)
- **React Router** v7.9
- **MobX** 6.15 (State Management)
- **SCSS** + CSS Modules

## 📁 Структура Директорий

```
src/
├── app/              # Входная точка приложения
│   ├── assets/       # Статика (стили, иконки, шрифты)
│   ├── layout/       # Каркас приложения
│   ├── navigation/   # Роутинг
│   ├── App.tsx       # Главный компонент
│   └── main.tsx      # Entry point
│
├── views/            # Страницы приложения
│   └── [view-name]/
│       ├── desktop/
│       ├── mobile/
│       ├── hooks/
│       ├── constants/
│       └── interfaces/
│
├── features/         # Фичи приложения (UI + логика)
│   └── [feature-name]/
│       ├── index.ts  # Public API
│       ├── ui/
│       ├── hooks/
│       ├── constants/
│       └── interfaces/
│
├── components/       # Переиспользуемые компоненты
│   ├── simple/       # Простые компоненты
│   └── composite/    # Сложные компоненты
│
├── providers/        # Провайдеры контекстов
│
├── services/         # Бизнес-логика
│   └── [service-name]/
│       ├── [service].service.ts
│       ├── [service].storage.ts
│       └── index.ts
│
├── state/            # MobX Stores
│   └── stores/
│
├── data/             # Слой данных
│   ├── api/          # API repositories
│   └── store/        # Storage adapters
│
├── core/             # Ядро проекта
│   ├── config/       # Конфигурация
│   ├── entities/     # Глобальные сущности
│   └── interfaces/   # Общие абстракции
│
└── utils/            # Утилиты
    ├── date-time/
    ├── string/
    ├── validation/
    └── ...
```

## 🔀 Правила Импортов

Строгая иерархия зависимостей:

- `core` → никто
- `data` → core
- `state` → core + data
- `services` → data + core
- `components` → services + core + providers (только контекст)
- `features` → components + services + providers (только контекст)
- `views` → features + components + providers (только контекст)
- `app` → всё собирает

**Исключения:**
- `utils` → доступны везде (кроме core)
- `providers` → для всего UI

## 🎨 Стили

### CSS Modules + SCSS

Все стили используют CSS Modules с SCSS:

```scss
// component.module.scss
.componentName {
  &__element { }
  &--modifier { }
}
```

### Глобальные стили

```
src/app/assets/styles/
├── app.scss           # Главный файл
├── bundle.scss        # Автоимпорт (переменные, миксины, функции)
└── scss/
    ├── variables.scss
    ├── mixins.scss
    ├── functions.scss
    └── reset.scss
```

`bundle.scss` автоматически импортируется во все `.scss` файлы через Vite.

## 📐 Именование

- **Директории**: `kebab-case`
- **Компоненты**: `PascalCase.tsx`
- **Стили**: `kebab-case.module.scss`
- **Интерфейсы**: `PascalCase` с префиксом `I`
- **Типы**: `PascalCase`
- **Enums**: `PascalCase`

## 🚀 Скрипты

```bash
npm run dev              # Запуск dev сервера
npm run build            # Сборка production
npm run lint             # Проверка ESLint
npm run lint:fix         # Автофикс ESLint
npm run lint:styles      # Проверка Stylelint
npm run lint:styles:fix  # Автофикс Stylelint
npm run preview          # Превью production сборки
```

## 🔧 Конфигурация

### TypeScript

- Строгая типизация
- Поддержка декораторов MobX
- Path aliases для всех слоев

### ESLint

- Запрещены: `as`, `typeof`, глобальные переменные
- Обязательны: explicit return types, типы параметров
- Интерфейсы с префиксом `I`

### Stylelint

- Запрещены: `!important`, `z-index`, статические цвета, `:global`
- Обязателен: rational order CSS свойств

## 📱 Адаптивность

Каждая view и feature имеет разделение на `desktop/` и `mobile/` версии.

**Breakpoints:**
- Mobile: 320px
- Tablet: 768px
- Desktop: 1280px
- Wide: 1920px

## 🔑 Environment Variables

Создайте `.env` файл на основе `.env.example`:

```bash
VITE_API_URL=http://localhost:3000
```

## 📚 Дополнительная Документация

См. файлы в корне проекта:
- `README.md` - Основная документация
- `PROJECT_STRUCTURE.md` - Эта документация

