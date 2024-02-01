import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import "./global.css";

import PageNotFound from "./pages/PageNotFound.tsx";
import AppLayout from "./ui/AppLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Bookings from "./pages/Bookings.tsx";
import Cabins from "./pages/Cabins.tsx";
import Users from "./pages/Users.tsx";
import Settings from "./pages/Settings.tsx";
import Account from "./pages/Account.tsx";
import Login from "./pages/Login.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              index={true}
              element={<Navigate to={"dashboard"} replace={true} />}
            />
            <Route path={"dashboard"} element={<Dashboard />} />
            <Route path={"bookings"} element={<Bookings />} />
            <Route path={"cabins"} element={<Cabins />} />
            <Route path={"users"} element={<Users />} />
            <Route path={"settings"} element={<Settings />} />
            <Route path={"account"} element={<Account />} />
          </Route>
          <Route path={"login"} element={<Login />} />
          <Route path={"*"} element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position={"top-center"}
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            // fontSize: "16px",
            // maxWidth: "500px",
            // padding: "16px 24px",
            // backgroundColor: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}
