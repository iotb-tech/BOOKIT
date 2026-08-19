import {
  CalendarClock,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

const features = [
  {
    icon: CalendarClock,
    title: "Real-time Availability",
    description: "See open slots in real time and book instantly.",
  },
  {
    icon: ShieldCheck,
    title: "No Double-Booking",
    description: "Our system prevents overlapping bookings.",
  },
  {
    icon: GraduationCap,
    title: "Built for Fellows",
    description: "Connect, learn and grow together.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-24 border-t border-neutral-100 bg-white px-5 py-8 sm:px-8 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex items-start gap-4 px-1 py-2"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <Icon size={21} strokeWidth={2} />
            </span>

            <div>
              <h2 className="text-sm font-bold text-[#24233c]">
                {title}
              </h2>

              <p className="mt-1 text-xs leading-5 text-neutral-500">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}