# Red Collar Test Assignment

This is a test assignment project built with **React**, **Vite**, **TypeScript**, and **Zustand**. It demonstrates searching and filtering books using the Google Books API, with features like infinite scroll, debounced search, and a responsive UI.

## 📦 Stack

- React 19 + TypeScript
- Vite
- Zustand (state management)
- TanStack React Query (data fetching & caching)
- React Router v7
- Axios
- SCSS Modules
- Eslint + Prettier (code quality)
- React Toastify (notifications)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/red-collar.git
cd red-collar
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create an .env file in the root of the project based on the provided .env.example
```bash
cp .env.example .env
```
Then replace YOUR_KEY with your own Google Books API key.


### 4. Start development server
```bash
npm run dev
```


## 📁 Project Structure (Simplified)
```graphql

src/
├── app/               # App root & providers
├── entities/          # API types & logic
├── features/          # Search, filter, favourites
├── shared/            # Shared UI components, styles, constants
├── widgets/           # BookList and composite UI parts
└── pages/             # Page components (e.g., HomePage)

```