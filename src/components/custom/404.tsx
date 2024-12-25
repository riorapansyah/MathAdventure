import { useEffect } from "react";
import { Link } from "react-router-dom";
import WiseIcon from "../icon";

export default function PageNotFound() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="flex flex-col items-center justify-center gap-10 px-4 py-16 min-h-screen sm:px-12 md:px-24 lg:px-48 border-b border-slate-200">
            <h1 className="text-3xl md:text-8xl text-gray-900 mb-6 quicksand-font leading-none text-center">
                Halaman ini tidak tersedia
            </h1>

            <Link to={`/`} className='flex justify-start items-center gap-3 w-max mt-5'>
                <p className='text-wise-primary font-semibold'>Kembali</p>
                <div className='flex justify-center items-center rounded-full w-8 h-8 bg-wise-primary text-white hover:bg-wise-primary/90 transition-colors'>
                    <WiseIcon iconName="GoArrowUpRight" />
                </div>
            </Link>
        </section>
    )
}
