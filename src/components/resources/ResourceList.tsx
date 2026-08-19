
"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { useResources } from "@/hooks/useResources";
import { ResourceCard } from "./ResourceCard";
import { ResourceListSkeleton } from "./ResourceListSkeleton";
import { ResourceError } from "./ResourceError";
import { ResourceEmpty } from "./ResourceEmpty";
import PageBadge from "@/components/ui/PageBadge";

import type {
  ResourceStatus,
  ResourceType,
} from "@/types/resource";

/* =========================================================
   HELPERS
========================================================= */

function normalizeResourceType(
  type?: string | null,
  name?: string | null
): ResourceType {
  const normalized = (type ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");

  if (
    normalized === "study_group" ||
    normalized === "studygroup" ||
    (name ?? "").toLowerCase().includes("study group")
  ) {
    return "Study Group";
  }

  return "Mentor";
}

/* =========================================================
   COMPONENT
========================================================= */

export function ResourceList() {
  const {
    data: resources = [],
    isLoading,
    isError,
    refetch,
  } = useResources();

  const [search, setSearch] = useState("");

  const [showFilters, setShowFilters] = useState(false);

  const [status, setStatus] = useState<
    ResourceStatus | "all"
  >("all");

  const [type, setType] = useState<
    ResourceType | "all"
  >("all");

  /* =========================================================
     FILTER RESOURCES
  ========================================================= */

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return resources.filter((resource) => {
      const resourceType = normalizeResourceType(
        resource.type,
        resource.name
      );

      const searchableText = [
        resource.name,
        resource.description ?? "",
        resource.owner_name ?? "",
        resourceType,
        ...(resource.skills ?? []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const matchesType =
        type === "all" || resourceType === type;

      const matchesStatus =
        status === "all" ||
        resource.status === status;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [resources, search, status, type]);

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setType("all");
    setStatus("all");
  };

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* =====================================================
          SEARCH / FILTER
      ===================================================== */}

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <label className="relative flex-1">
          <span className="sr-only">
            Search resources
          </span>

          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search resources, mentors, or study groups..."
            className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          />
        </label>

        {/* Filter */}
        <button
          type="button"
          onClick={() =>
            setShowFilters((current) => !current)
          }
          aria-expanded={showFilters}
          className="flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-medium text-slate-600 transition hover:border-primary-300 hover:bg-primary-50/40 hover:text-primary-700"
        >
          <SlidersHorizontal size={17} />
          Filter
        </button>
      </div>

      {/* =====================================================
          FILTER OPTIONS
      ===================================================== */}

      {showFilters && (
        <div className="mt-3 flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-4">
          {/* Type */}
          <select
            value={type}
            aria-label="Filter by resource type"
            onChange={(event) =>
              setType(
                event.target.value as
                  | ResourceType
                  | "all"
              )
            }
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          >
            <option value="all">
              All types
            </option>

            <option value="Mentor">
              Mentors
            </option>

            <option value="Study Group">
              Study Groups
            </option>
          </select>

          {/* Status */}
          <select
            value={status}
            aria-label="Filter by availability"
            onChange={(event) =>
              setStatus(
                event.target.value as
                  | ResourceStatus
                  | "all"
              )
            }
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          >
            <option value="all">
              All availability
            </option>

            <option value="available">
              Available
            </option>

            <option value="maintenance">
              Limited
            </option>

            <option value="unavailable">
              Unavailable
            </option>
          </select>

          {/* Clear Filters */}
          {(type !== "all" ||
            status !== "all" ||
            search) && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-primary-700 transition hover:text-primary-800"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* =====================================================
          PAGE HEADING
      ===================================================== */}

      <div className="mt-10">
        <PageBadge label="Resources" />

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Find the right resource
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Discover mentors and study groups and book a
          time that works for you.
        </p>
      </div>

      {/* =====================================================
          RESULT COUNT
      ===================================================== */}

      {!isLoading &&
        !isError &&
        resources.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              {filtered.length}{" "}
              {filtered.length === 1
                ? "resource"
                : "resources"}{" "}
              available
            </p>
          </div>
        )}

      {/* =====================================================
          RESULTS
      ===================================================== */}

      <div className="mt-5">
        {/* Loading */}
        {isLoading && (
          <ResourceListSkeleton />
        )}

        {/* Error */}
        {isError && (
          <ResourceError
            onRetry={() => refetch()}
          />
        )}

        {/* Empty */}
        {!isLoading &&
          !isError &&
          filtered.length === 0 && (
            <ResourceEmpty
              searchTerm={search}
            />
          )}

        {/* Resource Grid */}
        {!isLoading &&
          !isError &&
          filtered.length > 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map(
                (resource, index) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    index={index}
                  />
                )
              )}
            </div>
          )}
      </div>
    </div>
  );
}
