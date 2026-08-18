 "use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/bookings/${bookingId}`, { method: "DELETE" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Could not cancel booking");
      return body;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
    },
    onError: (e: Error) => setError(e.message)
  });

  return (
    <div>
      <button
        disabled={mutation.isPending}
        onClick={() => mutation.mutate()}
        className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
      >
        {mutation.isPending ? "Cancelling..." : "Cancel"}
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}