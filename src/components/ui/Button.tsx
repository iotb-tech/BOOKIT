import React from 'react'

interface ButtonProps {
  label : string
  variants?:"primary" | "outline";
  onclick?: () => void;
}

function Button({ label, variants = "outline", onclick }: ButtonProps) {
  return (
    <div>
        <button className={
            variants === "primary"
            ? "bg-primary-700 text-white text-sm font-bold md:text-lg px-2 py-1 rounded-md hover:bg-primary-500"
            : "bg-transparent border border-primary-700 text-primary-500 font-bold text-sm md:text-lg px-2 py-1 rounded-md hover:bg-primary-500 hover:text-white"
        } onClick={onclick }>
            {label}
        </button>
    </div>
  )
}

export default Button