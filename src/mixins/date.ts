export function formatDate(date: string | number): string {
    return new Date(date).toLocaleDateString(
        "es",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
}