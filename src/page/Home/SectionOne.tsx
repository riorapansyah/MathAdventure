import ShinyButton from '@/components/ui/shiny-button';
import { useNavigate } from 'react-router-dom';

export default function SectionOne() {
    const navigate = useNavigate();

    return (
        <section className="flex flex-col-reverse items-center justify-center gap-10 px-4 py-16 sm:h-[90vh] sm:flex-row sm:px-12 md:px-24 lg:px-48 bg-wise-secondary">
            <div className="max-w-xl">
                <p className="text-3xl font-bold sm:text-[3.5rem] sm:leading-[4.5rem] text-white">
                    Game Matematika <span className="text-wise-primary"> Interaktif!</span>
                </p>

                <h2 className="mt-2 text-base sm:mt-[0.5rem] sm:text-lg text-white">
                    Bermain dan Belajar Matematika {" "}
                    {<span className="text-wise-primary">Jadilah Jagoan Angka!</span>}
                </h2>

                <ShinyButton onClick={() => navigate("/fitur")} className="bg-wise-primary px-10 py-4 mt-8 rounded-full font-bold text-xl !text-white">
                    Cobain Game Sekarang!
                </ShinyButton>
            </div>

            <img className="rounded-xl" src="HeroImage.png" alt="" data-aos="zoom-in-up" />
        </section>
    )
}
