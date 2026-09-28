/**
 * Later this will possibly compose providers such as:
 * - Authentication
 * - API
 * - Query client
 * - Notifications
 * - Localization
 */
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider, ThemeProvider } from "../../lib/index.js";

export function AppProviders({ children }) {
	return (
		<AuthProvider>
			<HelmetProvider>
				<ThemeProvider>{children}</ThemeProvider>
			</HelmetProvider>
		</AuthProvider>
	);
}
