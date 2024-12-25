import { useEffect } from "react";
import cardData from "@/json/DataGames.json"
import CardGame from "@/components/custom/CardGame";

export default function Games() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen gap-10 px-4 py-6 sm:px-12 md:px-24 lg:px-48 bg-wise-secondary !pb-28">


            <CardGame cardData={cardData} />
        </div>
    )
}
