// import { Toaster } from "@/components/ui/toaster";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { AuthProvider, useAuth } from "@/lib/AuthContext";
// import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import Layout from "./components/Layout";
import PageNotFound from "./lib/PageNotFound";
import { ThemeProvider } from "./lib/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Services from "./pages/Services";

const AuthenticatedApp = () => {
  // const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // if (isLoadingPublicSettings || isLoadingAuth) {
  //   return (
  //     <div className="fixed inset-0 flex items-center justify-center bg-background">
  //       <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
  //     </div>
  //   );
  // }

  // if (authError) {
  //   if (authError.type === "user_not_registered")
  //     return <UserNotRegisteredError />;
  //   if (authError.type === "auth_required") {
  //     navigateToLogin();
  //     return null;
  //   }
  // }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      {/* <AuthProvider></AuthProvider> */}
      {/* <QueryClientProvider client={queryClientInstance}></QueryClientProvider> */}
      <Router>
        <AuthenticatedApp />
      </Router>
      {/* <Toaster /> */}
    </ThemeProvider>
  );
};

export default App;
