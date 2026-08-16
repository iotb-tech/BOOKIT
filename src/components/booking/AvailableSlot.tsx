"use client";

interface SlotProps {
  startTime: string;
  endTime: string;
  available: boolean;
}

interface AvailableSlotsProps {
  slots: SlotProps[];
  selectedSlot: string | null;
  onSlotSelect: (slot: string) => void;
}

export default function AvailableSlots({ slots,selectedSlot,onSlotSelect,}: AvailableSlotsProps) {
  
  return (
    <section className="mb-6">
      <h2 className="mb-2 text-lg font-semibold">
        Available Slots
      </h2>

      <p className="mb-4 text-sm text-gray-500">
        Select an available time slot.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {slots.map((slot) => {
          const slotId = `${slot.startTime}-${slot.endTime}`;

          return (
            <button
              key={slotId}
              type="button"
              disabled={!slot.available}
              onClick={() => onSlotSelect(slotId)}
              className={`rounded-lg border p-4 text-left ${
                selectedSlot === slotId
                  ? "border-black bg-gray-100"
                  : "border-gray-200"
              } ${
                !slot.available
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:bg-gray-50"
              }`}
            >
              <p className="font-medium">
                {slot.startTime} - {slot.endTime}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {slot.available
                  ? "Available"
                  : "Unavailable"}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}