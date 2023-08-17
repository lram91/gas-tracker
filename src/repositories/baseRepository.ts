import handleFetchError from '@/helpers/errorHandler.ts';

const baseURL = "/data/";

export function useFetchData() {
    const fetchData = async (url: string): Promise<any | null> => {
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            };

            const response = await fetch(`${baseURL}${url}`, { headers });

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
