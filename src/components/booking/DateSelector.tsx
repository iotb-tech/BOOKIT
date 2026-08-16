"use client"
interface DateSelectorProps {
  value: string;
  onchange: (value: string) => void;
}

function DateSelector({ value, onchange }: DateSelectorProps) {
  return (
    <div>

      <label htmlFor="date" className=" text-sm font-bold">
    Select Date:
      </label>
      <input
        type="date"
        id="date"
        value={value}
        onChange={(event) => onchange(event.target.value)}
        className="w-1/2 rounded border mx-4 p-2 outline-none focus:ring-2 focus:ring-primary-500"
      />
    </div>
  )
}

export default DateSelector