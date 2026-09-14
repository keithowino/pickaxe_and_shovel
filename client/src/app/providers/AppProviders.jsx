/**
 * Later this will possibly compose providers such as:
 * - Authentication
 * - API
 * - Query client
 * - Notifications
 * - Localization
 */
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "../../lib/ThemeContext.jsx";
import { AuthProvider } from "../../lib/context/AuthContext.jsx";

export function AppProviders({ children }) {
	return (
		<AuthProvider>
			<HelmetProvider>
				<ThemeProvider>{children}</ThemeProvider>
			</HelmetProvider>
		</AuthProvider>
	);
}
