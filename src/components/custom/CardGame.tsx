import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface CardDataType {
    title: string;
    color: string;
    textColor: string;
    description: string;
    link: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
}

const difficultyColors = {
    Easy: 'bg-green-500',
    Medium: 'bg-yellow-500',
    Hard: 'bg-red-500',
}

export default function CardGame({ cardData }: any) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    if (!cardData || cardData.length === 0) {
        return <div>No card data available.</div>
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cardData.map((card: CardDataType, index: number) => (
                <motion.div
                    key={index}
                    className="group cursor-pointer perspective"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                >
                    <Link to={card.link}>
                        <motion.div
                            className="relative w-full h-96 transition-all duration-500 [transform-style:preserve-3d]"
                            animate={{ rotateY: hoveredIndex === index ? 180 : 0 }}
                        >
                            {/* Front of the card */}
                            <div className="absolute w-full h-full [backface-visibility:hidden]">
                                <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
                                    <div className="p-6 flex-grow">
                                        <motion.h3
                                            className="text-2xl font-bold mb-2 text-white"
                                            style={{ color: card.textColor }}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {card.title}
                                        </motion.h3>
                                        <motion.div
                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${difficultyColors[card.difficulty]} text-white mb-4`}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {card.difficulty}
                                        </motion.div>
                                        <p className="text-gray-300 mb-4">
                                            {card.description}
                                        </p>
                                    </div>
                                    <div className="p-6 bg-gray-700">
                                        <Link
                                            to={card.link}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300 w-full justify-center"
                                        >
                                            <span>Play Game</span>
                                            <HiOutlineExternalLink />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Back of the card */}
                            <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden h-full p-6 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-4 text-white" style={{ color: card.textColor }}>{card.title}</h3>
                                        <p className="text-gray-300 mb-4">{card.description}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Game Features:</h4>
                                        <ul className="list-disc list-inside text-gray-300 mb-4">
                                            <li>Engaging gameplay</li>
                                            <li>Multiple levels</li>
                                            <li>Leaderboards</li>
                                        </ul>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <span className="text-yellow-400 mr-1">Difficulty:</span>
                                                <span className={`text-sm font-semibold ${difficultyColors[card.difficulty]} px-2 py-1 rounded-full`}>
                                                    {card.difficulty}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-yellow-400 mr-1">Rating:</span>
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <FaStar key={star} className="text-yellow-400" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                </motion.div>
            ))}
        </div>
    )
}

