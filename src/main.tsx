import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false // default: true
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider authName={'_auth'}
      authType={'cookie'}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === 'https:'} >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
