import { BrowserRouter } from "react-router-dom";
import RouterConfiguration from "./RouteConfiguration";

export function AppRouter() {
	return (
		<BrowserRouter>
			<RouterConfiguration />
		</BrowserRouter>
	);
}
