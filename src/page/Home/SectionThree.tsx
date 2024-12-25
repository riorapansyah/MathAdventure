import WiseIcon from "@/components/icon";
import SparklesText from "@/components/ui/sparkles-text";
import { Link } from "react-router-dom";
import cardData from "@/json/DataCard.json"
import CardFeature from "@/components/custom/CardFeature";

export default function SectionThree() {

    return (
        <section className="flex flex-col items-center min-h-screen gap-10 px-4 py-10 sm:px-12 md:px-24 lg:px-48">
            <SparklesText text="Fitur Menarik" className="text-2xl sm:text-4xl" />

            <CardFeature cardData={cardData} />

            <Link to="/fitur">
                <div className="flex gap-2 items-center cursor-pointer border-b-2 border-transparent hover:border-wise-primary transition-all duration-300">
                    <p>Lihat Semua Fitur </p>
                    <WiseIcon iconName="HiOutlineExternalLink" />
                </div>
            </Link>
        </section>
    );
}
