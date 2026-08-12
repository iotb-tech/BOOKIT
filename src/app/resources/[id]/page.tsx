type ResourcePageProps = {
    params: Promise<{
        id: string
    }>;
};

export default async function ResourcePage({ params} : ResourcePageProps) {
    const { id } = await params;
    return (
        <main>
            <h1>Resource Details</h1>
            <p>Resource ID:{id}</p>
            </main>

    );
}