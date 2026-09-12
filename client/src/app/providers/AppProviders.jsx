/**
 * Later this will compose providers such as:
 * - Authentication
 * - API
 * - Theme
 * - Query client
 * - Notifications
 * - Localization
 */

export function AppProviders({ children }) {
	return (
		// <IdentityProvider>
		// 	<JourneyProvider>
		// 		<WorkspaceProvider>
		// 			<PlatformProvider>{children}</PlatformProvider>
		// 		</WorkspaceProvider>
		// 	</JourneyProvider>
		// </IdentityProvider>
		<>{children}</>
	);
}
