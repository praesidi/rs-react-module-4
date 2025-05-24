import { useCallback, useEffect, useRef, useState } from 'react';

interface FetchBody {
	params: FetchParams;
}

interface FetchParams {
	_limit?: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

interface ReturnValue<T> {
	data?: T;
	isLoading: boolean;
	error: string | null;
	refetch: (args0?: FetchBody) => void;
}

export function useFetch<T>(url: string): ReturnValue<T> {
	const [data, setData] = useState<T | undefined>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [refetchTrigger, setRefetchTrigger] = useState(true);
	const refetchParamsRef = useRef({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const params = new URLSearchParams(refetchParamsRef.current).toString();
				const fetchUrl = `${url}?${params}`;

				const req = await fetch(fetchUrl);
				const data = await req.json();

				setData(data);
				setIsLoading(false);
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : 'An unknown error occurred';
				setError(`Что-то пошло не так! ${errorMessage}`);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [url, refetchTrigger]);

	const handleRefetch = useCallback((requestBody?: FetchBody) => {
		refetchParamsRef.current = requestBody?.params ?? {};
		setRefetchTrigger(prev => !prev);
	}, []);

	return {
		data: data,
		isLoading: isLoading,
		error: error,
		refetch: handleRefetch,
	};
}
