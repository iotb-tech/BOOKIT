import {
  Bell,
  CalendarClock,
  LayoutDashboard,
  XCircle,
} from "lucide-react";

const benefits = [
  {
    icon: LayoutDashboard,
    title: "One place for everything",
    description:
      "Manage your bookings, sessions and learning resources from one dashboard.",
  },
  {
    icon: Bell,
    title: "Booking reminders",
    description:
      "Never forget a scheduled mentorship or study session.",
  },
  {
    icon: CalendarClock,
    title: "Smart scheduling",
    description:
      "Choose from available times without endless back-and-forth messages.",
  },
  {
    icon: XCircle,
    title: "Easy cancellation",
    description:
      "Cancel or manage your bookings when your plans change.",
  },
];

export default function WhyBookIt() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-white py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">

        {/* Left Content */}
        <div>
          <p className="font-semibold text-primary-600">
            BUILT FOR BETTER LEARNING
          </p>

          <h2 className="mt-3 text-4xl font-bold leading-tight text-slate-950">
            Less time coordinating.
            <br />
            More time learning.
          </h2>

          <p className="mt-6 max-w-lg leading-7 text-slate-600">
            BookIt replaces scattered DMs, spreadsheets and manual calendars
            with one simple booking experience for mentors and fellows.
          </p>

          <div className="mt-8 rounded-2xl bg-primary-600 p-8 text-white">
            <p className="text-lg font-semibold">
              Your learning schedule, simplified.
            </p>

            <p className="mt-3 text-sm leading-6 text-primary-100">
              Discover resources, check availability, book your session and
              manage everything from your dashboard.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid gap-5 sm:grid-cols-2">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 font-bold text-slate-800">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}