/**
 * Later this will possibly compose providers such as:
 * - Authentication
 * - API
 * - Query client
 * - Notifications
 * - Localization
 */
import { HelmetProvider } from "react-helmet-async";
import {
	AuthProvider,
	ThemeProvider,
	queryClientInstance,
} from "../../lib/index.js";
import { QueryClientProvider } from "@tanstack/react-query";

export function AppProviders({ children }) {
	return (
		<AuthProvider>
			<HelmetProvider>
				<QueryClientProvider client={queryClientInstance}>
					<ThemeProvider>{children}</ThemeProvider>
				</QueryClientProvider>
			</HelmetProvider>
		</AuthProvider>
	);
}
