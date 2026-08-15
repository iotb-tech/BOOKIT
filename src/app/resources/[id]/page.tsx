import { createClient } from "@/lib/supabase/server";
import { getResourceById } from "@/lib/resources";

type ResourcePageProps = {
    params: Promise<{
        id: string
    }>;
};

export default async function ResourcePage({ params} : ResourcePageProps) {
   const { id } = await params; 
// Create a Supabase client.
const supabase = await createClient();

// Get the resource using the ID from the URL.
const resource = await getResourceById(supabase, id);

if (!resource) {
    return (
        <main>
            <h1>Resource Not Found</h1>
            <p>The requested resource could not be found.</p>
        </main>
    );
}
    return (
        <main>
            <h1>Resource.name</h1>
            <p>{resource.description}</p>

            {resource.type && <p>Type: {resource.type}</p>}
            {resource.owner_name && <p>Owner: {resource.owner_name}</p>}
            </main>

    );
}