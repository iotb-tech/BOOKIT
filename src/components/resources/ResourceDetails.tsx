"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Clock3,
  MessageCircle,
  Star,
} from "lucide-react";

import { useResource } from "@/hooks/useResource";
import { useResourceAvailability } from "@/hooks/useResourceAvailability"

import { ResourceDetailSkeleton } from "./ResourceDetailSkeleton";
import { ResourceError } from "./ResourceError";

function isStudyGroup(
  name?: string | null,
  type?: string | null
) {
  const normalizedType = (type ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");

  return (
    normalizedType === "study_group" ||
    normalizedType === "studygroup" ||
    (name ?? "").toLowerCase().includes("study group")
  );
}

function getInitials(
  name: string,
  type?: string | null
) {
  if (isStudyGroup(name, type)) {
    const teamMatch = name.match(/Team\s+(\d+)/i);

    if (teamMatch) {
      return `T${teamMatch[1]}`;
    }
  }

  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatSlotDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

function formatSlotDay(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(new Date(iso));
}

function formatSlotTime(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function ResourceDetails({
  id,
}: {
  id: string;
}) {
  const {
    data: resource,
    isLoading,
    isError,
    refetch,
  } = useResource(id);

  const {
    data: availability = [],
    isLoading: availabilityLoading,
    isError: availabilityError,
    refetch: refetchAvailability,
  } = useResourceAvailability(id);

  if (isLoading) {
    return <ResourceDetailSkeleton />;
  }

  if (isError || !resource) {
    return (
      <ResourceError
        onRetry={() => refetch()}
        message="This resource could not be loaded."
      />
    );
  }

  const studyGroup = isStudyGroup(
    resource.name,
    resource.type
  );

  const type = studyGroup
    ? "Study Group"
    : "Mentor";

  const displayName = resource.name;

  const initials = getInitials(
    displayName,
    resource.type
  );

  const skills =
    resource.skills?.length
      ? resource.skills
      : studyGroup
        ? [
            "Peer Learning",
            "Projects",
            "Collaboration",
          ]
        : [
            "Mentorship",
            "Projects",
            "Technical Guidance",
          ];

  return (
    <div>
      {/* Back */}
      <Link
        href="/resources"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-primary-700"
      >
        <ArrowLeft size={16} />
        Back to Resources
      </Link>

      <section className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.03)]">
        {/* Main information */}
        <div className="grid md:grid-cols-[1.45fr_1fr]">
          {/* Left */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* Avatar */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-orange-400 text-xl font-semibold text-white sm:h-28 sm:w-28">
                {initials}
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-800">
                  {displayName}
                </h1>

                <p className="mt-1 text-sm font-medium text-primary-700">
                  {type}
                </p>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                  <Star
                    size={15}
                    className="fill-amber-400 text-amber-400"
                  />

                  <span className="font-semibold text-slate-700">
                    5.0
                  </span>

                  <span>(24 reviews)</span>
                </div>

                <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
                  {resource.description ||
                    "Practical guidance focused on learning, collaboration and real-world projects."}
                </p>
              </div>
            </div>

            {/* Session information */}
            <div className="mt-7 space-y-3 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <Clock3
                  size={16}
                  className="text-slate-400"
                />

                {studyGroup
                  ? `Sessions usually run for ${
                      resource.duration_minutes ?? 60
                    } minutes`
                  : `Mentorship sessions are usually ${
                      resource.duration_minutes ?? 60
                    } minutes`}
              </p>

              <p className="flex items-center gap-2">
                <MessageCircle
                  size={16}
                  className="text-slate-400"
                />

                {studyGroup
                  ? "Open to participating fellows"
                  : "Typically responds within a day"}
              </p>
            </div>
          </div>

          {/* Right / About */}
          <div className="border-t border-slate-200 p-6 md:border-l md:border-t-0 md:p-8">
            <h2 className="text-base font-semibold text-slate-800">
              About
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {resource.description ||
                "Learn, collaborate and build practical skills through BookIt."}
            </p>

            <h3 className="mt-7 text-sm font-semibold text-slate-800">
              Skills
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-primary-100 bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="border-t border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-semibold text-slate-800">
                {studyGroup
                  ? "Upcoming Sessions"
                  : "Next Available Slots"}
              </h2>

              {/* Loading */}
              {availabilityLoading ? (
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
                  {Array.from({
                    length: 3,
                  }).map((_, index) => (
                    <div
                      key={index}
                      className="h-[105px] animate-pulse rounded-lg border border-slate-200 bg-slate-50"
                    />
                  ))}
                </div>
              ) : availabilityError ? (
                /* Error */
                <div className="mt-4 rounded-lg border border-red-100 bg-red-50 px-5 py-5">
                  <p className="text-sm font-medium text-red-700">
                    Availability could not be loaded.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      refetchAvailability()
                    }
                    className="mt-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
                  >
                    Try again
                  </button>
                </div>
              ) : availability.length === 0 ? (
                /* Empty */
                <div className="mt-4 rounded-lg border border-dashed border-slate-200 px-5 py-6">
                  <p className="text-sm font-medium text-slate-700">
                    {studyGroup
                      ? "No upcoming sessions."
                      : "No upcoming availability."}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Check back later for new sessions.
                  </p>
                </div>
              ) : (
                /* Slots */
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
                  {availability
                    .slice(0, 5)
                    .map((slot) => (
                      <Link
                        key={slot.id}
                        href={`/book/${resource.id}?slot=${slot.id}`}
                        className="rounded-lg border border-slate-200 px-4 py-4 text-center transition hover:border-primary-300 hover:bg-primary-50"
                      >
                        <p className="text-sm font-semibold text-slate-700">
                          {formatSlotDay(
                            slot.start_time
                          )}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {formatSlotDate(
                            slot.start_time
                          )}
                        </p>

                        <p className="mt-2 text-sm font-semibold text-primary-700">
                          {formatSlotTime(
                            slot.start_time
                          )}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          to{" "}
                          {formatSlotTime(
                            slot.end_time
                          )}
                        </p>
                      </Link>
                    ))}
                </div>
              )}
            </div>

            {/* Main CTA */}
            {!availabilityLoading &&
              !availabilityError &&
              availability.length > 0 && (
                <Link
                  href={`/book/${resource.id}?slot=${availability[0].id}`}
                  className="flex h-11 shrink-0 items-center justify-center rounded-lg bg-primary-600 px-6 text-sm font-semibold text-white transition hover:bg-primary-700"
                >
                  {studyGroup
                    ? "Join Next Session"
                    : "Book Next Slot"}
                </Link>
              )}
          </div>
        </div>
      </section>
    </div>
  );
}