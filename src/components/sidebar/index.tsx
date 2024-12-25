import { sideBarStore } from "@/store";
import Curve from "../curve";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import SparklesText from "../ui/sparkles-text";
import { Button } from "../ui/button";
import WiseIcon from "../icon";
import NavigationLink from "../custom/NavigationLink";

export default function Sidebar() {
    const path = useLocation();
    const { openSidebarFn } = sideBarStore();

    const menuSlide = {
        initial: { x: "calc(100% + 100px)" },
        enter: { x: "0", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
        exit: { x: "calc(100% + 100px)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
    }

    return (
        <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="h-screen bg-[#f3f2f7] fixed right-0 top-0 text-black z-[9999] w-full p-4">
            <div className="flex items-center justify-between">
                <Link to="/" className="text-2xl sm:text-3xl font-bold sm:block">
                    <SparklesText text="MathMetrik" className="text-2xl sm:text-4xl" />
                </Link>
                <Button className='block sm:hidden bg-transparent hover:bg-transparent rounded-full text-black shadow-none' onClick={() => openSidebarFn()}>
                    <WiseIcon iconName="HiOutlineMenuAlt3" size={30} />
                </Button>
            </div>

            <div className="flex flex-col gap-8 transition-all duration-300 mt-8">
                <NavigationLink path={path} to="/" additional="sideNav" textContent={'Home'} />
                <NavigationLink path={path} to="/fitur" additional="sideNav" textContent={'Fitur'} />
                <NavigationLink path={path} to="/game" additional="sideNav" textContent={'Game'} />
            </div>

            <Curve />
        </motion.div>
    );
}


