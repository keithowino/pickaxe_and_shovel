import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../lib/index.js";
import { Loader } from "../../../shared/index.js";

const DefaultFallback = () => (
	<>
		<Loader type="page" />
	</>
);

const UnauthorizedAccess = () => (
	<div className="min-h-screen flex items-center justify-center px-6">
		<div className="max-w-md w-full border border-destructive/50 bg-destructive/5 p-8 text-center">
			<div className="serial-number text-destructive mb-4">
				ACCESS DENIED // 403
			</div>
			<h1 className="font-heading text-2xl font-bold mb-3">
				Unauthorized Access
			</h1>
			<p className="text-muted-foreground mb-6">
				You don't have permission to access this page. Please contact
				the administrator if you believe this is an error.
			</p>
			<a
				href="/"
				className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-medium hover:bg-primary/90 transition-colors"
			>
				Return to Home
			</a>
		</div>
	</div>
);

export default function AuthenticatedRoute({
	fallback = <DefaultFallback />,
	requireAdmin = true,
	redirectTo = "/",
	showLoginScreen = false, // 👈 add this
}) {
	const {
		isAuthenticated,
		isLoadingAuth,
		authChecked,
		isAdmin,
		authError,
		user,
	} = useAuth();

	/**
	 * #### Placeholder
	 *
	 * const isLoadingAuth = false;
	 * const authError = true;
	 * const isAuthenticated = false;
	 */

	const location = useLocation();

	if (isLoadingAuth || !authChecked) {
		return fallback;
	}

	if (authError) {
		return <UnauthorizedAccess />;
	}

	if (!isAuthenticated && showLoginScreen) {
		return <Outlet context={{ showLogin: true }} />;
	}

	if (!isAuthenticated) {
		return (
			<Navigate
				to={redirectTo}
				replace
				state={{
					from: location,
				}}
			/>
		);
	}

	if (requireAdmin && !isAdmin) {
		return <UnauthorizedAccess />;
	}

	return <Outlet />;
}
