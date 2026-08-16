import React from 'react'
import Button from '../ui/Button'

function BookingHeader() {
  return (
    
    <div className="flex flex-col items-center justify-center p-6 ">
        <Button label='Back to resources'/>
        <p className="text-sm font-bold">Bookings</p>
        <h2 className="text-2xl font-bold mb-4">Book a Slot</h2>



    </div>
)
}

export default BookingHeader