import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaGamepad } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
];

const footerLinks = [
    { text: 'Home', href: '/' },
    { text: 'Games', href: '/games' },
    { text: 'About', href: '/about' },
    { text: 'Contact', href: '/contact' },
];

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white py-12 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center md:items-start"
                    >
                        <Link to="/" className="flex items-center space-x-2 text-3xl font-bold">
                            <FaGamepad className="text-yellow-400" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                                LogikaLand
                            </span>
                        </Link>
                        <p className="mt-2 text-sm text-blue-200">Where Math Meets Adventure!</p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col items-center md:items-start"
                    >
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {footerLinks.map((link, index) => (
                                <motion.li
                                    key={index}
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <Link to={link.href} className="hover:text-yellow-400 transition-colors">
                                        {link.text}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col items-center md:items-start"
                    >
                        <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-2xl hover:text-yellow-400 transition-colors"
                                >
                                    <social.icon aria-label={social.label} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Newsletter Signup */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col items-center md:items-start"
                    >
                        <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
                        <form className="flex flex-col space-y-2 w-full max-w-xs">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 rounded-md bg-white bg-opacity-10 focus:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-md font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all"
                            >
                                Subscribe
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 pt-8 border-t border-blue-800 text-center text-sm text-blue-300"
                >
                    &copy; {new Date().getFullYear()} LogikaLand. All rights reserved.
                </motion.div>
            </div>

            {/* Animated background elements */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 2 + 1,
                        repeat: Infinity,
                        repeatType: 'loop',
                    }}
                />
            ))}
        </footer>
    );
}
