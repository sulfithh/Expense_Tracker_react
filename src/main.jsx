import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import ExpenseContext from './Context/ExpenseContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExpenseContext>
      <App />
    </ExpenseContext>
  </StrictMode>,
)
