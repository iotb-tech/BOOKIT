"use client";

import {
  useRouter,
} from "next/navigation";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  createResource,
} from "@/lib/resources/actions";

import {
  resourceSchema,
  type ResourceFormValues,
} from "@/schemas/resourceSchema";

export default function NewResourcePage() {
  const router =
    useRouter();

  const {
    register,
    handleSubmit,

    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<ResourceFormValues>(
      {
        resolver:
          zodResolver(
            resourceSchema
          ),

        defaultValues: {
          status:
            "available",

          type:
            "Mentor",
        },
      }
    );

  const onSubmit =
    async (
      values:
        ResourceFormValues
    ) => {
      const result =
        await createResource(
          values
        );

      if (!result.success) {
        window.alert(
          result.error ??
            "Something went wrong while creating the resource."
        );

        return;
      }

      router.push(
        "/resources"
      );

      router.refresh();
    };

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-wide text-primary-600">
            Create resource
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Add a mentor
            or study group
          </h1>
        </div>

        <form
          onSubmit={
            handleSubmit(
              onSubmit
            )
          }
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Resource name
            </label>

            <input
              id="name"
              {...register(
                "name"
              )}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              placeholder="Office Hours: JS Help"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {
                  errors.name
                    .message
                }
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Description
            </label>

            <textarea
              id="description"
              rows={4}
              {...register(
                "description"
              )}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              placeholder="Describe what this resource is for and when people can use it."
            />

            {errors
              .description && (
              <p className="mt-1 text-sm text-red-600">
                {
                  errors
                    .description
                    .message
                }
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="type"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Type
              </label>

              <select
                id="type"
                {...register(
                  "type"
                )}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              >
                <option value="Mentor">
                  Mentor
                </option>

                <option value="Study Group">
                  Study Group
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Status
              </label>

              <select
                id="status"
                {...register(
                  "status"
                )}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              >
                <option value="available">
                  Available
                </option>

                <option value="unavailable">
                  Unavailable
                </option>

                <option value="maintenance">
                  Maintenance
                </option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="duration_minutes"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Duration
              (minutes)
            </label>

            <input
              id="duration_minutes"
              type="number"
              min={15}
              max={240}
              {...register(
                "duration_minutes"
              )}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              placeholder="60"
            />

            {errors
              .duration_minutes && (
              <p className="mt-1 text-sm text-red-600">
                {
                  errors
                    .duration_minutes
                    .message
                }
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              isSubmitting
            }
            className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Creating..."
              : "Create resource"}
          </button>
        </form>
      </div>
    </main>
  );
}