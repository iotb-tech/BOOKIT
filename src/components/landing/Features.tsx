import {
  CalendarCheck,
  ShieldCheck,
  Users,
  Search
} from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Real-time Availability",
    description:
      "See available mentor and study-group slots in real time and book instantly.",
  },
  {
    icon: ShieldCheck,
    title: "No Double-Booking",
    description:
      "BookIt prevents overlapping bookings so everyone gets a reliable schedule.",
  },
  {
    icon: Search,
    title: "Find the Right Resource",
    description:
      "Search and discover mentors, office hours, study groups and peer sessions.",
  },
  {
    icon: Users,
    title: "Built for Fellows",
    description:
      "Connect, learn and grow with mentors and peers in one simple platform.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-slate-50 py-10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-primary-600">
            WHY BOOKIT
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Everything you need to make learning easier
          </h2>

          <p className="mt-4 text-slate-600">
            BookIt removes the stress of coordinating mentorship
            and study sessions manually.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-800">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}