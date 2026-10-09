import { AppProviders, AppRouter } from "./app/index.js";
import { Toaster } from "./shared/index.js";

export default function App() {
	return (
		<AppProviders>
			<AppRouter />
			<Toaster />
		</AppProviders>
	);
}
