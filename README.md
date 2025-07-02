#  Expense Tracker Application

A responsive expense tracker web application built using **React**, **React Router**, **Bootstrap**, and **Recharts**. It allows users to:

- Add, edit, and delete expenses
- View expenses by category
- See summary statistics and visual breakdowns (pie chart)
- Store data in `localStorage` for persistence
- Switch between "This Month" and "All Time" views



##  Features

-  Add expenses with title, amount, category, and date
-  Filter expenses by category
-  Dashboard with:
  - Total spent this month
  - Category-wise breakdown
  - Pie chart using `Recharts`
-  All data is stored locally in browser's `localStorage`
-  Dark/light mode toggle (planned)
-  Built with clean navigation using `react-router-dom`



##  Tech Stack

- React
- React Router DOM
- Bootstrap
- Recharts
- Zod (for schema validation)
- UUID (for unique ID generation)
- LocalStorage 



##  Project Structure

Expense-Tracker/
├── public/
├── src/
│ ├── Components/
│ │ ├── AddExpenses.jsx
│ │ ├── Dashboard.jsx
│ │ └── Expenses.jsx
│ ├── Context/
│ │ └── ExpenseContext.jsx
│ ├── App.jsx
│ ├── index.js
│ └── index.css
├── package.json
└── README.md

