import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import confetti from 'canvas-confetti';

type GameStatus = 'playing' | 'success' | 'error';
type OrderType = 'ascending' | 'descending';

const MathNumberSort: React.FC = () => {
    const [numbers, setNumbers] = useState<number[]>([]);
    const [userSequence, setUserSequence] = useState<number[]>([]);
    const [score, setScore] = useState<number>(0);
    const [level, setLevel] = useState<number>(1);
    const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
    const [orderType, setOrderType] = useState<OrderType>('ascending');
    const [numberOrder, setNumberOrder] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        generateNumbers();
    }, [level]);

    const generateNumbers = () => {
        const count = Math.min(level + 3, 8);
        const maxNumber = level * 20;
        const newNumbers: number[] = [];

        for (let i = 0; i < count; i++) {
            let num: number;
            do {
                num = Math.floor(Math.random() * maxNumber) + 1;
            } while (newNumbers.includes(num));
            newNumbers.push(num);
        }

        setNumbers(newNumbers);
        setUserSequence([]);
        setGameStatus('playing');
        setOrderType(Math.random() < 0.5 ? 'ascending' : 'descending');
        setNumberOrder({});
    };

    const handleNumberClick = (number: number) => {
        if (gameStatus !== 'playing') return;

        setUserSequence((prev) => {
            const newSequence = prev.includes(number)
                ? prev.filter((num) => num !== number)
                : [...prev, number];

            const newOrder: { [key: number]: number } = {};
            newSequence.forEach((num, index) => {
                newOrder[num] = index + 1;
            });
            setNumberOrder(newOrder);

            return newSequence;
        });
    };

    const checkSequence = () => {
        const sortedNumbers = [...numbers].sort((a, b) =>
            orderType === 'ascending' ? a - b : b - a
        );

        const isCorrect =
            userSequence.length === numbers.length &&
            userSequence.every((num, index) => num === sortedNumbers[index]);

        if (isCorrect) {
            setScore((prevScore) => prevScore + level * 10);
            setGameStatus('success');
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            if (score + level * 10 >= level * 50) {
                setLevel((prevLevel) => Math.min(prevLevel + 1, 5));
            }
        } else {
            setGameStatus('error');
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4'>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
            >
                <Card className="p-8 bg-white shadow-xl rounded-2xl">
                    <div className="text-center space-y-6">
                        <motion.h2
                            className="text-3xl font-bold text-blue-600"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        >
                            Number Sorting Game
                        </motion.h2>

                        <div className="flex justify-between text-lg mb-4">
                            <motion.span
                                className="px-4 py-2 bg-blue-100 rounded-full text-blue-600 font-semibold"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                            >
                                Level: {level}
                            </motion.span>
                            <motion.span
                                className="px-4 py-2 bg-purple-100 rounded-full text-purple-600 font-semibold"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                            >
                                Skor: {score}
                            </motion.span>
                        </div>

                        <motion.div
                            className="flex items-center justify-center gap-2 mb-4"
                            animate={{ rotate: [0, 5, 0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {orderType === 'ascending' ? (
                                <ArrowUp className="w-6 h-6 text-green-500" />
                            ) : (
                                <ArrowDown className="w-6 h-6 text-red-500" />
                            )}
                            <span className="text-lg font-medium">
                                Urutkan secara {orderType === 'ascending' ? 'menaik' : 'menurun'}
                            </span>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-4 gap-4"
                            variants={{
                                hidden: {},
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                            initial="hidden"
                            animate="show"
                        >
                            {numbers.map((number) => (
                                <motion.div
                                    key={number}
                                    variants={{
                                        hidden: { y: 20, },
                                        show: { y: 0, opacity: 1 }
                                    }}
                                    onClick={() => handleNumberClick(number)}
                                    className={`h-16 flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer relative
                                    ${userSequence.includes(number)
                                            ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                                            : 'bg-gray-100 text-blue-600 hover:bg-gray-200'
                                        } 
                                    transition-all duration-300 shadow-md`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={gameStatus === 'error' ? { x: [-5, 5, -5, 5, 0] } : {}}
                                    transition={{ duration: 0.3 }}
                                >
                                    {number}
                                    {numberOrder[number] && (
                                        <span className="absolute top-1 right-1 bg-yellow-400 text-xs text-black rounded-full w-5 h-5 flex items-center justify-center">
                                            {numberOrder[number]}
                                        </span>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="flex justify-center gap-4">
                            <Button
                                onClick={checkSequence}
                                disabled={
                                    userSequence.length !== numbers.length || gameStatus !== 'playing'
                                }
                                className="bg-gradient-to-r mt-10 from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Periksa
                            </Button>
                            <Button
                                onClick={generateNumbers}
                                className="bg-gradient-to-r mt-10 from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                            >
                                Level Baru
                            </Button>
                        </div>

                        <AnimatePresence>
                            {gameStatus === 'success' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="text-green-500 font-bold text-xl"
                                >
                                    Benar! Lanjut ke soal berikutnya!
                                </motion.p>
                            )}
                            {gameStatus === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="text-red-500 font-bold text-xl"
                                >
                                    Coba lagi!
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default MathNumberSort;
