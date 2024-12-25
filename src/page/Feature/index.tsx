import { useEffect } from "react";
import cardData from "@/json/DataFeature.json"
import CardFeature from "@/components/custom/CardFeature";

export default function Feature() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="flex flex-col items-center min-h-screen gap-10 px-4 py-6 sm:px-12 md:px-24 lg:px-48">

            <CardFeature cardData={cardData} />
        </section>
    );
}
