'use client'
import { useState } from "react"

function Signup(){
    return (
        <>
        <form className="p-8 bg-primary-300 flex flex-col gap-3 w-100">
            <div className="text-white text-4xl">Book<span className="text-primary-500">IT</span></div>
            <div className="gap-2">
            <label htmlFor="mail">Email</label>
            <input className="bg-white border border-2-solid block w-full" type="email" id="mail" placeholder="email@example.com"/>

            </div>
            <div className="gap-2 flex-col">
            <label htmlFor="password">Password</label>
            <input className="w-full bg-white block" type="password" id="password" placeholder=""/>

            </div>

            <button className="bg-green-400 ">Login</button>
        </form>
        </>
    )
}

export default Signup