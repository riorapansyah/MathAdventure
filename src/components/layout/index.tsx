import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom'
import SparklesText from '../ui/sparkles-text';
import WiseIcon from '../icon';
import { Button } from '../ui/button';
import Sidebar from '../sidebar';
import { AnimatePresence } from 'framer-motion';
import NavigationLink from '../custom/NavigationLink';
import { sideBarStore } from '@/store';

export default function index() {
    const path = useLocation();
    const { side, openSidebarFn } = sideBarStore();
    const [hasBackground, setHasBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                setHasBackground(true);
            } else {
                setHasBackground(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            <nav
                className={`${hasBackground ? 'shadow-md bg-black' : 'border-b'
                    } sticky top-0 w-full transition-all duration-300 z-50 py-3 px-4 sm:px-12 md:px-24 lg:px-48 bg-wise-secondary`}
            >
                <div className="h-14 flex items-center justify-between">
                    <Link to="/" className="text-2xl sm:text-3xl font-bold sm:block">
                        <SparklesText text="MathAdventure" className="text-2xl sm:text-4xl text-white" />
                    </Link>
                    <div className="hidden sm:flex gap-8 transition-all duration-300 text-white">
                        <NavigationLink path={path} to="/" textContent={'Home'} />
                        {/* <NavigationLink path={path} to="/fitur" textContent={'Fitur'} /> */}
                        {<NavigationLink path={path} to="/game" textContent={'Game'} />}
                    </div>
                    <Button className='block sm:hidden bg-transparent hover:bg-transparent rounded-full text-black shadow-none' onClick={() => openSidebarFn()}>
                        <WiseIcon iconName="HiOutlineMenuAlt3" size={30} />
                    </Button>

                    <AnimatePresence mode="wait">
                        {side && <Sidebar />}
                    </AnimatePresence>
                </div>
            </nav>

            <div>
                <Outlet />
            </div>

            <footer className="bg-wise-primary text-gray-200 py-8 h-72">
                <div className="container px-4 sm:px-12 flex flex-col justify-between md:px-24 lg:px-48 h-full ">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        {/* Section Brand */}
                        <div className="text-center md:text-left mb-4 md:mb-0">
                            <h1 className="text-2xl font-bold sm:text-4xl ">MathAdventure</h1>
                            <p className="text-sm sm:text-base"></p>
                        </div>

                        {/* Section Social Media Icons */}
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <WiseIcon iconName='FaFacebook' />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <WiseIcon iconName='FaTwitter' />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <WiseIcon iconName='FaInstagram' />
                            </a>
                        </div>
                    </div>

                    <div className="mt-8 text-white text-sm">
                        &copy; {new Date().getFullYear()} MathAdventure. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    )
}
