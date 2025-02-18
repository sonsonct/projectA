export function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
            <h1 className="text-3xl font-bold">Something went wrong!</h1>
            <p className="mt-2 text-lg">Please try again later.</p>
        </div>
    );
}
