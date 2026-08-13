'use client'
import { useState } from "react"
function Signup(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    function handleSubmit(){
        
    }
    return (
        <>
        <form onSubmit={handleSubmit} className="p-8 bg-primary-300 flex flex-col gap-3">
            <div className="flex justify-between gap-2">
            <label htmlFor="mail">Email</label>
            <input className="bg-white border border-2-solid" type="email" id="mail"/>

            </div>
            <div className="flex justify-between gap-2">
            <label htmlFor="password">Password</label>
            <input className="bg-white" type="password" id="password"/>

            </div>

            <button>SignUp</button>
        </form>
        </>
    )
}

export default Signup