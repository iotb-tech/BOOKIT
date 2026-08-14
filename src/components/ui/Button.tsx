import React from 'react'

interface ButtonProps {
  label : string
  variants?:"primary" | "outline";
}

function Button({ label, variants = "outline" }: ButtonProps) {
  return (
    <div>
        <button className={
            variants === "primary"
            ? "bg-primary-700 text-white text-sm font-bold md:text-lg px-2 py-1 rounded-md hover:bg-primary-500"
            : "bg-transparent border border-primary-700 text-primary-500 font-bold text-sm md:text-lg px-2 py-1 rounded-md hover:bg-primary-500 hover:text-white"
        }>
            {label}
        </button>
    </div>
  )
}

export default Button