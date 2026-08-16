"use client"

import AvailableSlot from '@/components/booking/AvailableSlot';
import BookingHeader from '@/components/booking/BookingHeader'
import DateSelector from '@/components/booking/DateSelector'
import EndTime from '@/components/booking/EndTime';
import StartTime from '@/components/booking/StartTime';
import Button from '@/components/ui/Button';
import React, { useState } from 'react'


function Page() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");

const handleConfirmBooking = () => {

    if(!selectedStartTime || !selectedEndTime || !selectedDate) {
        alert('Please select a date, start time, and end time before confirming the booking.');
    } else {
        alert('Booking confirmed!');
    }

}

const slots = [
  {
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    available: true,
  },
  {
    startTime: "10:00 AM",
    endTime: "14:00 AM",
    available: true,
  },
  {
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    available: false,
  },
  {
    startTime: "12:00 PM",
    endTime: "01:00 PM",
    available: true,
  },
];


  return (
    <main className='text-white my-4 mx-auto border p-6 rounded-lg shadow-md max-w-md flex flex-col items-center justify-center gap-4'>

    <BookingHeader />
    <DateSelector value={selectedDate} onchange={setSelectedDate} />
    <StartTime value={selectedStartTime} onchange={setSelectedStartTime} />
    <EndTime value={selectedEndTime} onchange={setSelectedEndTime} />
    <AvailableSlot slots={slots} selectedSlot={null} onSlotSelect={() => {}} />      
      <Button label="Confirm Booking" variants='primary' onclick={handleConfirmBooking} />    
    </main>
  )
}
export default Page
