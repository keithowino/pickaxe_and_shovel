import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PageNotFound from "./lib/PageNotFound";
import { ThemeProvider } from "./lib/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import { HelmetProvider } from "react-helmet-async";
import Admin from "./pages/Admin";
import { AuthProvider, useAuth } from "./lib/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Loader2 } from "lucide-react";

// REMOVED: import SetupAdmin from "./pages/SetupAdmin";
// REMOVED: import TestFirebase from "./pages/TestFirebase";

const LoadingSpinner = () => (
	<div className="min-h-screen flex items-center justify-center">
		<Loader2 className="h-8 w-8 animate-spin text-primary" />
	</div>
);

const AuthenticatedApp = () => {
	const { isLoadingAuth, authChecked } = useAuth();

	if (isLoadingAuth || !authChecked) {
		return <LoadingSpinner />;
	}

	return (
		<Routes>
			{/* <Route path="/setup-admin" element={<SetupAdmin />} /> */}
			{/* <Route path="/test-firebase" element={<TestFirebase />} /> */}

			{/* Main routes with Layout */}
			<Route element={<Layout />}>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/services" element={<Services />} />
				<Route path="/portfolio" element={<Portfolio />} />
				<Route path="/contact" element={<Contact />} />

				<Route
					element={
						<ProtectedRoute
							requireAdmin={true}
							showLoginScreen={true}
						/>
					}
				>
					<Route path="/admin" element={<Admin />} />
				</Route>

				<Route path="*" element={<PageNotFound />} />
			</Route>
		</Routes>
	);
};

const App = () => {
	return (
		<AuthProvider>
			<HelmetProvider>
				<ThemeProvider>
					<Router>
						<AuthenticatedApp />
					</Router>
				</ThemeProvider>
			</HelmetProvider>
		</AuthProvider>
	);
};

export default App;
