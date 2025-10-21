# RandomGeneratorFrontend

Фронтенд приложение для генератора случайных значений, построенное на современном стеке технологий с использованием Feature-Sliced Design архитектуры.

## 🎯 Технологический Стек

- **React** 19.1 - UI библиотека
- **TypeScript** 5.9 - Статическая типизация
- **Vite** (Rolldown) - Сборщик и dev сервер
- **React Router** v7.9 - Роутинг
- **MobX** 6.15 - State management
- **SCSS** + CSS Modules - Стилизация

## 📁 Архитектура

Проект использует **Feature-Sliced Design** с четким разделением слоев:

```
src/
├── app/          # Входная точка и конфигурация
├── views/        # Страницы приложения
├── features/     # Бизнес-фичи
├── components/   # Переиспользуемые компоненты
├── providers/    # React контексты
├── services/     # Бизнес-логика
├── state/        # MobX stores
├── data/         # API и хранилища
├── core/         # Типы и конфигурация
└── utils/        # Утилиты
```

Подробнее см. [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

## 🚀 Быстрый Старт

### Установка зависимостей

```bash
npm install
```

### Настройка окружения

Создайте файл `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

Отредактируйте переменные окружения при необходимости:

```env
VITE_API_URL=http://localhost:3000
```

### Запуск Dev Сервера

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`

### Сборка для Production

```bash
npm run build
```

### Превью Production Сборки

```bash
npm run preview
```

## 🔧 Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev сервера |
| `npm run build` | Production сборка |
| `npm run preview` | Превью production сборки |
| `npm run lint` | Проверка ESLint |
| `npm run lint:fix` | Автофикс ESLint |
| `npm run lint:styles` | Проверка Stylelint |
| `npm run lint:styles:fix` | Автофикс Stylelint |

## 📝 Правила Разработки

### Именование

- **Директории**: `kebab-case`
- **Компоненты**: `PascalCase.tsx`
- **Стили**: `kebab-case.module.scss`
- **Интерфейсы**: `IPascalCase` (с префиксом I)

### Стили

- Использовать **CSS Modules** + **SCSS**
- Запрещены: `!important`, `z-index`, статические цвета
- Использовать CSS переменные для цветов: `var(--color-primary)`
- SCSS переменные и миксины доступны автоматически

### TypeScript

- Строгая типизация
- Explicit return types для функций
- Поддержка MobX декораторов (`@observable`, `@action`, `@computed`)
- Запрещены: `as`, `typeof`, глобальные переменные

### Импорты

Используйте path aliases:

```typescript
import { API_CONFIG } from '@core/config';
import { AuthService } from '@services/auth';
import { AppButton } from '@components/simple/app-button';
```

Доступные алиасы:
- `@/` - src/
- `@app/` - src/app/
- `@views/` - src/views/
- `@features/` - src/features/
- `@components/` - src/components/
- `@providers/` - src/providers/
- `@services/` - src/services/
- `@state/` - src/state/
- `@data/` - src/data/
- `@core/` - src/core/
- `@utils/` - src/utils/

## 📱 Адаптивность

Каждая view и feature должна иметь разделение на `desktop/` и `mobile/` версии.

**Breakpoints:**
- Mobile: 320px - 767px
- Tablet: 768px - 1279px
- Desktop: 1280px+
- Wide: 1920px+

## 🎨 Темизация

Проект поддерживает светлую и темную темы через CSS переменные:

```typescript
// Переключение темы
document.documentElement.setAttribute('data-theme', 'dark');
```

## 📚 Дополнительная Документация

- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Подробная структура проекта
- [Архитектурные правила](./docs/architecture.md) - Полный гайд по архитектуре (см. описание в начале проекта)

## 🤝 Вклад в Проект

При разработке следуйте установленным правилам архитектуры и кодстайла:

1. Создавайте фичи в соответствии с Feature-Sliced Design
2. Используйте строгую типизацию TypeScript
3. Покрывайте утилиты JSDoc комментариями
4. Следуйте правилам именования
5. Проверяйте код линтерами перед коммитом

## 📄 Лицензия

Проект является частным (private).

---

**Команда разработки** | 2025
