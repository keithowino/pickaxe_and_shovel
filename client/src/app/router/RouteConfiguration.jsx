import { useRoutes } from "react-router-dom";
import { gatewayRoutes, platformRoutes } from "../../applications/index.js";
import { useAuth } from "../../lib/context/AuthContext.jsx";
import { LoadingSpinner } from "../../shared/index.js";

// import Portfolio from "./pages/Portfolio";
// import Contact from "./pages/Contact";
// import Services from "./pages/Services";
// import Admin from "./pages/Admin";
// import ProtectedRoute from "./components/ProtectedRoute";

// // REMOVED: import SetupAdmin from "./pages/SetupAdmin";
// // REMOVED: import TestFirebase from "./pages/TestFirebase";

// <Route path="/setup-admin" element={<SetupAdmin />} />
// <Route path="/test-firebase" element={<TestFirebase />} />

// <Route
// 	element={<ProtectedRoute requireAdmin={true} showLoginScreen={true} />}
// >
// 	<Route path="/admin" element={<Admin />} />
// </Route>;

function AuthReadyGate() {
	const { isLoadingAuth, authChecked } = useAuth();

	if (isLoadingAuth || !authChecked) {
		return <LoadingSpinner />;
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
	return useRoutes([...gatewayRoutes, ...platformRoutes]);
}

export default function RouterConfiguration() {
	return <AuthReadyGate />;
}
