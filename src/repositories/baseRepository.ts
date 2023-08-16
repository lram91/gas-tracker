import handleFetchError from '@/helpers/errorHandler.ts';

export function useFetchData() {
    const fetchData = async (url: string): Promise<any | null> => {
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
