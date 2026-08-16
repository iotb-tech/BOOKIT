"use client"
interface EndTimeProps {
  value: string;
  onchange: (value: string) => void;
}

function EndTime({ value, onchange }: EndTimeProps) {
  return (
    <div>
      <label className="text-sm font-bold">End Time:</label>
      <input
        type="time"
        value={value}
        onChange={(event) => onchange(event.target.value)}
        className="w-1/2 mx-4 p-2 outline-none focus:ring-2 focus:ring-primary-500 rounded border "
      />
    </div>
  )     
  
}

export default EndTime