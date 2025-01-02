import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGamepad, FaHome } from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { Button } from '@/components/ui/button'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
    { path: '/', icon: FaHome, text: 'Home' },
    { path: '/game', icon: FaGamepad, text: 'Game' },
]

const NavigationLink = ({ path, to, icon: Icon, textContent }: any) => {
    const isActive = path === to
    return (
        <Link to={to}>
            <motion.a
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${isActive ? 'bg-purple-700 text-white' : 'text-gray-300 hover:text-white hover:bg-purple-800'
                    }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Icon className="text-xl" />
                <span>{textContent}</span>
            </motion.a>
        </Link>
    )
}

const Sidebar = ({ closeSidebar }: any) => (
    <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 w-64 h-full bg-gradient-to-b from-purple-900 to-indigo-900 shadow-lg z-50 p-4"
    >
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={closeSidebar}
            className="absolute top-4 right-4 text-white"
        >
            <HiOutlineMenuAlt3 size={30} />
        </motion.button>
        <div className="flex flex-col space-y-4 mt-16">
            {navItems.map((item) => (
                <NavigationLink key={item.path} path={useLocation().pathname} to={item.path} icon={item.icon} textContent={item.text} />
            ))}
        </div>
    </motion.div>
)

export default function Navbar() {
    const [hasBackground, setHasBackground] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const pathname = useLocation().pathname

    useEffect(() => {
        const handleScroll = () => {
            setHasBackground(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const openSidebar = () => setIsSidebarOpen(true)
    const closeSidebar = () => setIsSidebarOpen(false)

    return (
        <motion.nav
            className={`sticky top-0 w-full z-50 py-4 px-4 sm:px-12 md:px-24 lg:px-48 transition-all duration-300 ${hasBackground ? 'bg-purple-900 bg-opacity-90 backdrop-blur-md shadow-lg' : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <div className="flex items-center justify-between">
                <Link to="/">
                    <motion.a
                        className="flex items-center space-x-2 text-2xl sm:text-3xl font-bold text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaGamepad className="text-yellow-400" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                            LogikaLand
                        </span>
                    </motion.a>
                </Link>

                <div className="hidden sm:flex space-x-4">
                    {navItems.map((item) => (
                        <NavigationLink key={item.path} path={pathname} to={item.path} icon={item.icon} textContent={item.text} />
                    ))}
                </div>

                <Button
                    className="block sm:hidden bg-purple-700 hover:bg-purple-800 text-white rounded-full shadow-lg"
                    onClick={openSidebar}
                >
                    <HiOutlineMenuAlt3 size={24} />
                </Button>
            </div>

            <AnimatePresence>
                {isSidebarOpen && <Sidebar closeSidebar={closeSidebar} />}
            </AnimatePresence>
        </motion.nav>
    )
}
