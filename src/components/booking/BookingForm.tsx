"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormValues } from "@/schemas/bookingSchema";
import { useCreateBooking } from "@/hooks/useBookings";
import { useResource } from "@/hooks/useResource";

const TIME_SLOTS = [
  { value: "10:00-11:00", label: "10:00 AM – 11:00 AM" },
  { value: "11:00-12:00", label: "11:00 AM – 12:00 PM" },
  { value: "14:00-15:00", label: "2:00 PM – 3:00 PM" },
  { value: "15:00-16:00", label: "3:00 PM – 4:00 PM" },
];

function formatDate(value: string) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

export default function BookingForm({ resourceId }: { resourceId: string }) {
  const router = useRouter();
  const { data: resource } = useResource(resourceId);
  const mutation = useCreateBooking();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const today = useMemo(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookingFormValues>({ resolver: zodResolver(bookingSchema), defaultValues: { date: today, timeSlot: "10:00-11:00", note: "" } });

  const [date = today, timeSlot = "10:00-11:00", note = ""] = useWatch({ control, name: ["date", "timeSlot", "note"] });
  const selectedLabel = TIME_SLOTS.find((slot) => slot.value === timeSlot)?.label ?? "—";
  const [start, end] = timeSlot.split("-");

  const onSubmit = async (values: BookingFormValues) => {
    setSubmitError(null);
    const [startTime, endTime] = values.timeSlot.split("-");
    const startDate = new Date(`${values.date}T${startTime}:00`);
    const endDate = new Date(`${values.date}T${endTime}:00`);
    const result = await mutation.mutateAsync({
      resourceId,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
    });

    if (!result.success) {
      setSubmitError(result.error);
      return;
    }
    router.push("/my-bookings?created=1");
    router.refresh();
  };

const resourceName =
  resource?.name ?? "Session";

const isStudyGroup =
  resource?.type === "Study Group";

const duration =
  resource?.duration_minutes ?? 60;

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
      <Link href={`/resources/${resourceId}`} className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-primary-700">
        <ArrowLeft size={14} /> Back to Resource
      </Link>

      <div className="mt-6 grid gap-7 lg:grid-cols-[1.8fr_0.9fr]">
        <section>
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-[#1e1d31]">Book a Session</h1>
            <p className="mt-1 text-sm text-slate-500"> {isStudyGroup ? resourceName : `with ${resourceName}`}
            </p>
          </div>

          <form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="date" className="mb-1.5 block text-xs font-semibold text-neutral-800">Select Date</label>
              <div className="relative">
                <input id="date" type="date" min={today} className="h-11 w-full rounded-md border border-neutral-200 bg-white px-3 pr-10 text-sm focus:border-primary-300 focus:ring-2 focus:ring-primary-100" {...register("date")} />
                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
              </div>
              {errors.date && <p className="mt-1 text-xs text-error">{errors.date.message}</p>}
            </div>

            <div>
              <label htmlFor="timeSlot" className="mb-1.5 block text-xs font-semibold text-neutral-800">Select Time</label>
              <select id="timeSlot" className="h-11 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm focus:border-primary-300 focus:ring-2 focus:ring-primary-100" {...register("timeSlot")}>
                {TIME_SLOTS.map((slot) => <option key={slot.value} value={slot.value}>{slot.label}</option>)}
              </select>
              {errors.timeSlot && <p className="mt-1 text-xs text-error">{errors.timeSlot.message}</p>}
            </div>

            <div>
              <label htmlFor="note" className="mb-1.5 block text-xs font-semibold text-neutral-800">Add a note <span className="font-normal text-neutral-400">(optional)</span></label>
              <textarea id="note" rows={4} placeholder="What would you like to discuss?" className="w-full resize-none rounded-md border border-neutral-200 bg-white px-3 py-3 text-sm placeholder:text-neutral-400 focus:border-primary-300 focus:ring-2 focus:ring-primary-100" {...register("note")} />
              <div className="mt-1 flex justify-end text-[10px] text-neutral-400">{note.length}/200</div>
              {errors.note && <p className="text-xs text-error">{errors.note.message}</p>}
            </div>
            {submitError && <div role="alert" className="rounded-md border border-red-100 bg-red-50 px-3 py-2 text-xs text-error">{submitError}</div>}
          </form>
        </section>

        <aside className="h-fit rounded-lg border border-neutral-200 bg-[#fdfdff] p-6 shadow-[0_2px_10px_rgba(20,18,35,0.03)]">
          <h2 className="text-sm font-bold text-neutral-900">Session Summary</h2>
          <dl className="mt-5 space-y-4 text-xs">
            <div> <dt className="text-slate-400"> {isStudyGroup ? "Study Group" : "Mentor"}</dt><dd className="mt-1 font-semibold text-slate-700"> {resourceName}</dd></div>
            <div><dt className="text-neutral-400">Date</dt><dd className="mt-1 font-semibold text-neutral-800">{formatDate(date)}</dd></div>
            <div><dt className="text-neutral-400">Time</dt><dd className="mt-1 font-semibold text-neutral-800">{selectedLabel}</dd></div>
            <div><dt className="text-neutral-400">Duration</dt><dd className="mt-1 font-semibold text-neutral-800">{duration === 60 ? "1 hour" : `${duration} minutes`}</dd></div>
          </dl>
        </aside>
      </div>

      <button form="booking-form" type="submit" disabled={mutation.isPending || !start || !end} className="mt-7 h-11 w-full rounded-md bg-primary-600 text-xs font-bold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-wait disabled:opacity-60">
        {mutation.isPending ? "Confirming…" : "Confirm Booking"}
      </button>
      <p className="mt-3 text-center text-[10px] text-neutral-400">You can cancel or reschedule before the session starts.</p>
    </div>
  );
}
