import { createContext, useEffect, useState } from "react";
export const MyContext=createContext()
import {v4} from "uuid"
import React from 'react'

const ExpenseContext = ({children}) => {
    const [expenses,setExpenses]=useState(()=>{
        return JSON.parse(localStorage.getItem("expenses_store")) || []
    })
    useEffect(()=>{
        localStorage.setItem("expenses_store",JSON.stringify(expenses))
    },[expenses])

    function addexpense(xpense){
        const newExpense={...xpense,id:v4()}
        setExpenses((prev)=>[...prev,newExpense])
        return newExpense
    }
    function editexpense(id,updatedExpenses){
        setExpenses((prevExp)=>prevExp.map((ex)=> ex.id===(id) ? {...ex,...updatedExpenses} : ex))
    }
    function deleteexpense(id){
        setExpenses((prevexp)=>prevexp.filter((ex)=>
            ex.id!==(id)
        ))
    }
    function getexpense(id){
        return expenses.find((ex)=>ex.id===(id))
    }
  return (
    <div>
      <MyContext.Provider value={{expenses,addexpense,editexpense,deleteexpense,getexpense}}>
        {children}
      </MyContext.Provider>

    </div>
  )
}

export default ExpenseContext

