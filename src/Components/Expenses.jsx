import { useContext, useState } from 'react'
import { MyContext } from '../Context/ExpenseContext'
import { Link } from 'react-router-dom'
const Expenses = () => {
    const {expenses,editexpense,deleteexpense}=useContext(MyContext)
    const [filteredByCategory,setFilteredByCategory]=useState("All")
    const filteredexpenses = filteredByCategory === "All" ? expenses : 
                          expenses.filter((f) => f.category === filteredByCategory);

  return (
    <div>
        <header className="d-flex justify-content-center align-items-center">
            <h1 className='m-5' style={{ color: "aquamarine" }}>Expenses</h1>
            <select value={filteredByCategory} onChange={(event)=>setFilteredByCategory(event.target.value)}>
                <option value="All">All</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Utilities">Utilities</option>
                <option value="Miscellaneous">Miscellaneous</option>
            </select>
      </header>
      <div className='ms-4'>
        <h4>{filteredByCategory} Expenses</h4>
        {filteredexpenses.length===0 ? (<p>no expenses </p>) : (
            <ul>
                
                {filteredexpenses.map((ex)=>(
                    
                    <li key={ex.id} className="border border-1 border rounded p-3 mb-3"> {ex.title} | {ex.amount} | {ex.category} | {ex.date} 
                        <br></br>
                        <Link to={`/edit/${ex.id}`} className="me-2 text-white">Edit</Link>
                        <button onClick={()=>deleteexpense(ex.id)} className="mt-3 btn btn-primary"> delete</button>
                    </li>
                    
                ))}
            </ul>
        )}
      </div>
    </div>
  )
}

export default Expenses
