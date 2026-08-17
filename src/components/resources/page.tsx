import Link from "next/link";
import { ResourceList } from "./ResourceList";

export default function ResourcesPage(){
     return (
    <div>
      <div className="flex items-center justify-between px-4 pt-6 sm:px-6">
        <div />
        <Link
          href="/resources/new"
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
        >
          + New resource
        </Link>
      </div>
      <ResourceList />
    </div>
  );
}