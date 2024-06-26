import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Feedback from "./pages/Feedback";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Admin from "./pages/Admin";
import Error from "./pages/Error";
import AdminLayouts from "./layouts/AdminLayouts";
import { queryClient } from "./lib/query_client";
import SharePage from "./pages/SharePage";
import { address } from "./utils/site_url";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "Feedback", element: <Feedback /> },
    ],
  },
  {
    path: "admin",
    element: <AdminLayouts />,
    children: [
      {
        path: "",
        element: <Admin />,
        loader: async () => {
          const response = await fetch(`${address}fileslists`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
          });

          if (!response.ok) {
            // ...
          } else {
            const res = await response.json();
            return res.lists;
          }
        },
      },
    ],
  },
  {
    path: "sharePageId",
    id: "share-page",
    element: <SharePage />,
  },
]);

function App() {
  document.cookie = "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
