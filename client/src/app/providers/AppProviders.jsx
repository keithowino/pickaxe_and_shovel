/**
 * Later this will compose providers such as:
 * - Authentication
 * - API
 * - Query client
 * - Notifications
 * - Localization
 */
import { ThemeProvider } from "../../lib/ThemeContext.jsx";
import { AuthProvider, useAuth } from "../../lib/context/AuthContext.jsx";

export function AppProviders({ children }) {
	return (
		// <IdentityProvider>
		// 	<JourneyProvider>
		// 		<WorkspaceProvider>
		// 			<PlatformProvider>{children}</PlatformProvider>
		// 		</WorkspaceProvider>
		// 	</JourneyProvider>
		// </IdentityProvider>
		<AuthProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</AuthProvider>
	);
}
