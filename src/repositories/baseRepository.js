import handleFetchError from '@/helpers/errorHandler';

export function useFetchData() {
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);

            return await handleFetchError(response);
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    return {
        fetchData,
    };
}