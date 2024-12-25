import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/layout";
import Home from "@/page/Home/Index";
import Feature from "@/page/Feature";
import Games from "@/page/Game";
import MathGame from "@/page/Game/MathBasic";
import MathMemoryGame from "@/page/Game/MathMemoryCard";
import MathRacing from "@/page/Game/MathRacing";
import MathFractionMatch from "@/page/Game/MathFraction";
import MathNumberSort from "@/page/Game/MathNumberSorting";
import PageNotFound from "@/components/custom/404";
import MathShapePuzzle from "@/page/Game/MathShapePuzzle";

export const routerData = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "/fitur",
                element: <Feature />
            },
            {
                path: "/game",
                children: [
                    {
                        path: "",
                        element: <Games />
                    },
                    {
                        path: "dasar-matematika",
                        element: <MathGame />
                    },
                    {
                        path: "memory-card",
                        element: <MathMemoryGame />
                    },
                    {
                        path: "shape-puzzle",
                        element: <MathShapePuzzle />
                    },
                    {
                        path: "math-racing",
                        element: <MathRacing />
                    },
                    {
                        path: "sorting-angka",
                        element: <MathNumberSort />
                    },
                    {
                        path: "menyamakan-pecahan",
                        element: <MathFractionMatch />
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        element: <PageNotFound />,
    }
]);

export default function Routes() {
    return (
        <RouterProvider router={routerData} />
    )
}