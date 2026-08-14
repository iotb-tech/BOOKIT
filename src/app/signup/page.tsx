'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

function Signup(){
  const router = useRouter()
  const supabase = createClient()
  
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event:React.FormEvent){
      event.preventDefault();
      setError(null)

      const {error: hotError} = await supabase.auth.signUp({email,password})

      if(hotError){
        setError(hotError.message)
        return;
      }

      router.refresh()
      router.push('/resources');
      
    }


    return (
        <>
        <form onSubmit={handleSubmit} className="p-8 bg-primary-300 flex flex-col gap-3 w-100">
            <div className="text-white text-4xl">Book<span className="text-primary-500">IT</span></div>
            <div className="gap-2">
            <label htmlFor="mail">Email</label>
            <input value={email} onChange={e=> setEmail(e.target.value)}  className="bg-white border border-2-solid block w-full" type="email" id="mail" placeholder="email@example.com"/>

            </div>
            <div className="gap-2 flex-col">
            <label htmlFor="password">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white block" type="password" id="password" placeholder=""/>

            </div>

           

            <button className="bg-green-400 ">SignUp</button>
        </form>
        </>
    )
}

export default Signup