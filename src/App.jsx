import Dashboard from "./Components/Dashboard.jsx"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import AddExpenses from './Components/AddExpenses.jsx'
import Expenses from "./Components/Expenses.jsx"

function App() {
  

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/add" element={<AddExpenses/>}></Route>
          <Route path="/expenses" element={<Expenses/>}></Route> 
          <Route path="/edit/:id" element={<AddExpenses/>}></Route>
        </Routes>
      </Router> 

    </>
  )
}

export default App
