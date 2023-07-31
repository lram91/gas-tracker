export default async function handleFetchError(response) {
    if (!response.ok) {
        // Handle non-successful HTTP status codes
        const errorMessage = `Error fetching data: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
    }

    try {
        return await response.json();
    } catch (error) {
        // Handle JSON parsing errors
        throw new Error(`Error parsing JSON data: ${error.message}`);
    }
}
