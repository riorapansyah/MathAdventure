import { useEffect } from "react";
import cardData from "@/json/DataGames.json"
import CardGame from "@/components/custom/CardGame";
import { motion } from 'framer-motion';

export default function Games() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen px-4 py-16 sm:px-12 md:px-24 lg:px-48">
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

            <CardGame cardData={cardData} key={Math.random()} />
        </div>
    )
}
