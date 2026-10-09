import { QueryClient } from "@tanstack/react-query";

export const queryClientInstance = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // Data stays "fresh" for 5 minutes
			gcTime: 1000 * 60 * 10, // Unused data is garbage collected after 10 minutes
			retry: 2, // Retry failed requests twice before showing error
			refetchOnWindowFocus: true, // Refetch when user returns to the tab
		},
	},
});
