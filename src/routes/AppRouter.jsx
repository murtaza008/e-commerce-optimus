import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Infinite from "../pages/Infinite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductDetails from "../components/UI/ProductDetails";
import PageNotFound from "../components/UI/PageNotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/infinite",
        element: <Infinite />,
      },
    ],
  },
]);
const AppRouter = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
};

export default AppRouter;
