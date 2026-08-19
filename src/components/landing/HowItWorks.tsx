import {
  Search,
  CalendarDays,
  CheckCircle
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find a resource",
    description:
      "Browse mentors, office hours, study groups or peer sessions that match your needs.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Choose a time",
    description:
      "View real-time availability and select a convenient date and time.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Confirm your booking",
    description:
      "Confirm your session and keep track of it from your BookIt dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white py-14"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="text-center">
          <p className="font-semibold text-primary-600">
            HOW IT WORKS
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            Book your next session in three simple steps
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {steps.map((step) => {

            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-slate-100 p-8 text-center"
              >

                <span className="text-sm font-bold text-primary-600">
                  {step.number}
                </span>

                <div className="mx-auto mt-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-200">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-800">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}