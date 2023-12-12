import ErrorPage from "@/err-page";
import {
    createBrowserRouter,
} from "react-router-dom";
import React from "react";
import { Home } from "@/view/Home/Home";
import { About } from "@/view/About/About";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: '/about',
        element: <About />,
        errorElement: <ErrorPage />
    }
]);
