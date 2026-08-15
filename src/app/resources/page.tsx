import { createClient } from "@/lib/supabase/server";
import { getResources } from "@/lib/resources";

// This page displays all the resources available on BookIt.
export default async function ResourcesPage() {
  // Create a Supabase client to communicate with the database.
  const supabase = await createClient();

  // Fetch all resources from the database.
  const resources = await getResources(supabase);

  return (
    <main>
      {/* Page heading */}
      <h1>Resources</h1>

      {/* Description of the Resources page */}
      <p>Browse the resources available on BookIt.</p>

      {/* Check whether any resources were found */}
      {resources.length === 0 ? (
        <p>No resources available.</p>
      ) : (
        <div>
          {/* Display each resource */}
          {resources.map((resource) => (
            <div key={resource.id}>
              {/* Resource name */}
              <h2>{resource.name}</h2>

              {/* Resource description */}
              <p>{resource.description}</p>

              {/* Resource type, if available */}
              {resource.type && <p>Type: {resource.type}</p>}

              {/* Owner name, if available */}
              {resource.owner_name && (
                <p>Owner: {resource.owner_name}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}