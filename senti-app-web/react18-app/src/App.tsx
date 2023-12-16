import React from 'react'
import {
    RouterProvider,
} from "react-router-dom";
import '@/assets/styles/reset.css'
import { router } from "@/router";

const App: React.FC = () => {
    return (<React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>)
}
export default App
