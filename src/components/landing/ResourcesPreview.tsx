import Link from "next/link";
import {
  UserRound,
  Clock,
  Users,
  GraduationCap,
  ArrowRight
} from "lucide-react";

const resources = [
  {
    icon: UserRound,
    title: "1-on-1 Mentorship",
    description:
      "Get personalized guidance from an experienced mentor.",
  },
  {
    icon: Clock,
    title: "Office Hours",
    description:
      "Book available slots during mentor office hours.",
  },
  {
    icon: Users,
    title: "Study Groups",
    description:
      "Join peers learning the same topic or working toward the same goal.",
  },
  {
    icon: GraduationCap,
    title: "Peer Sessions",
    description:
      "Connect with fellows for collaborative learning and support.",
  },
];

export default function ResourcesPreview() {
  return (
    <section className="bg-slate-50 py-14">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary-600">
              EXPLORE
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Find the right learning resource
            </h2>
          </div>

          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-base font-semibold text-primary-600 hover:text-primary-700"
          >
            View all resources
            <ArrowRight size={18} />
          </Link>

        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {resources.map((resource) => {

            const Icon = resource.icon;

            return (
              <div
                key={resource.title}
                className="rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-800">
                  {resource.title}
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-600">
                  {resource.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}