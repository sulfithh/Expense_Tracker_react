import {z} from "zod"
import { useContext,useEffect } from "react"
import { MyContext } from "../Context/ExpenseContext"
const ExpenseSchema=z.object({
    title:z.string().min(1,"title required"),
    amount:z.number({invalid_type_error:"amount must be a number"}),
    category:z.enum(["Food","Travel","Utilities","Miscellaneous"]),
    date:z.string().min(1,"date required").refine((value)=>!isNaN(Date.parse(value)),{message:"date is invalid",}),
})
import { useState } from "react"
import { useParams,useNavigate } from "react-router-dom"

const AddExpenses = ({defaultValues={},onSubmit}) => {
    const [exp,setExp]=useState({
        title:"",
        amount:"",
        category:"Food",
        date:""
    })
    const [err,setErr]=useState({})
    const {addexpense,getexpense,editexpense}=useContext(MyContext)
    const {id}=useParams()
    const navigate =useNavigate()
    useEffect(() => {
        if (id) {
            const existing = getexpense(id);
            if (existing) {
            setExp({
                title: existing.title,
                amount: existing.amount,
                category: existing.category,
                date: existing.date,
            });
            }
        }
    }, [id, getexpense]);
    

    function handleSubmit(event){
        event.preventDefault()
        const result=ExpenseSchema.safeParse({...exp,amount:Number(exp.amount)})
        if(!result.success){
            const erroredFields={}
            result.error.errors.forEach((er)=>{erroredFields[er.path[0]]=er.message})
            setErr(erroredFields)
        }
        else{
            if(id){
                editexpense(id,result.data)
            }
            else{
                addexpense(result.data)
            }
            setExp({ title: "", amount: "", category: "", date: "" }); // Clear form
            setErr({})
            navigate("/")
        }
    }
    function handleChange(event){
        const {name,value}=event.target
        setExp((prevExp)=>({...prevExp,[name]:value}))
    }
  return (
    <>
    <h1 className="text-center mt-5" style={{ color: "aquamarine" }}> Add ur Expenses here...</h1>
    <div className="d-flex justify-content-center align-items-center min-vh-100">
        <form onSubmit={handleSubmit}> 
            <div className="mb-3">  
                <label className="form-label fs-5">Title:</label>&nbsp; 
                <input type="text" name="title" onChange={handleChange} value={exp.title}></input>
                {err.title && <p>{err.title}</p>}
            </div>
            <div className="mb-3"> 
                <label className="form-label fs-5">Amount:</label>&nbsp;
                <input type="number" name="amount" onChange={handleChange} value={exp.amount}></input>
                {err.amount && <p>{err.amount}</p>}
            </div>
            <div className="mb-3">  
                <label className="form-label fs-5">Category:</label>&nbsp;
                <select name="category" onChange={handleChange} value={exp.category}>
                    <option value="" disabled>--Select--</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                </select>
                {err.category && <p>{err.category}</p>}
            </div>
            <div className="mb-3"> 
                <label className="form-label fs-5" >Date:</label>&nbsp;
                <input type="date" name="date" onChange={handleChange} value={exp.date}></input>
                {err.date && <p>{err.date}</p>}
            </div>  
            <button type="submit" className="btn btn-primary btn-lg rounded" >ADD</button>
        </form> 
    </div>
    </>
  )
}

export default AddExpenses
