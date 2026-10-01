import { useRoutes } from "react-router-dom";
import {
	administrationRoutes,
	gatewayRoutes,
	platformRoutes,
} from "../../applications/index.js";
import { useAuth } from "../../lib/index.js";
import { Loader } from "../../shared/index.js";

/**
 * Without this gate, the application could start
 * rendering protected routes while this request is
 * still running:
 */
function AuthReadyGate() {
	const { isLoadingAuth, authChecked } = useAuth();

	/**
	 * #### Placeholder
	 *
	 * let isLoadingAuth = true;
	 */

	if (isLoadingAuth || !authChecked) {
		return <Loader type="page" />;
	}

	return <ApplicationRoutes />;
}

/**
 * When authentication is ready this function is called.
 *
 * It either exists or doesn't exist as a component.
 * But when it renders, useRoutes() is always called.
 */
function ApplicationRoutes() {
	/**
	 * `useRoutes()` is being called conditionally.
	 * - Hooks must be called in the same order on every render.
	 */
	return useRoutes([
		...administrationRoutes,
		...gatewayRoutes,
		...platformRoutes,
	]);
}

export default function RouterConfiguration() {
	return <AuthReadyGate />;
}
