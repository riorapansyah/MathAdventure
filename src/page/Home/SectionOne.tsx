import { motion } from 'framer-motion';
import ShinyButton from '@/components/ui/shiny-button';
import { Link } from 'react-router-dom';

export default function SectionOne() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen flex items-center justify-center px-4 py-16 sm:px-12 md:px-24 lg:px-48">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
            >
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full"
                        style={{
                            width: Math.random() * 4 + 1 + 'px',
                            height: Math.random() * 4 + 1 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                        }}
                        animate={{
                            y: [0, -30],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 2 + 1,
                            repeat: Infinity,
                            repeatType: 'loop',
                        }}
                    />
                ))}
            </motion.div>

            <div className="flex flex-col-reverse items-center justify-center gap-10 sm:flex-row z-10">
                <motion.div
                    className="max-w-xl"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.p
                        className="text-4xl font-bold sm:text-6xl sm:leading-tight text-white text-center sm:text-left"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Game Matematika <span className="text-yellow-400">Interaktif!</span>
                    </motion.p>

                    <motion.h2
                        className="mt-4 text-lg sm:text-xl text-blue-200 text-center sm:text-left"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Bermain dan Belajar Matematika {" "}
                        <span className="text-yellow-400">Jadilah Jagoan Angka!</span>
                    </motion.h2>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <ShinyButton>
                            <Link to="/game" className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-4 mt-8 rounded-full font-bold text-xl text-white transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
                                Cobain Game Sekarang!
                            </Link>
                        </ShinyButton>
                    </motion.div>
                </motion.div>

                <motion.img
                    className="rounded-xl max-w-md"
                    src="/HeroImage.png"
                    alt="Game Preview"
                    initial={{ x: 100, opacity: 0, rotate: 5, rotateY: 180 }}
                    animate={{ x: 0, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                />
            </div>
        </section>
    )
}
