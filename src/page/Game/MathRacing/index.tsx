'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';
import confetti from 'canvas-confetti';

const MathRacing = () => {
    const [position, setPosition] = useState(0);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);

    const generateQuestion = () => {
        const operations = ['+', '-', '×'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        let num1, num2, result: number;

        switch (operation) {
            case '+':
                num1 = Math.floor(Math.random() * 20) + 1;
                num2 = Math.floor(Math.random() * 20) + 1;
                result = num1 + num2;
                break;
            case '-':
                num1 = Math.floor(Math.random() * 20) + 1;
                num2 = Math.floor(Math.random() * num1) + 1;
                result = num1 - num2;
                break;
            case '×':
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
                result = num1 * num2;
                break;
            default:
                num1 = Math.floor(Math.random() * 20) + 1;
                num2 = Math.floor(Math.random() * 20) + 1;
                result = num1 + num2;
        }

        setQuestion(`${num1} ${operation} ${num2} = ?`);
        setCorrectAnswer(result);
    };

    const checkAnswer = () => {
        if (parseInt(answer) === correctAnswer) {
            setPosition(prev => Math.min(prev + 10, 100));
            setScore(score + 10);
            if (position + 10 >= 100) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        } else {
            setPosition(prev => Math.max(prev - 5, 0));
        }
        setAnswer('');
        generateQuestion();
    };

    const startGame = () => {
        setPosition(0);
        setScore(0);
        setGameOver(false);
        setTimeLeft(60);
        generateQuestion();
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!gameOver && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setGameOver(true);
        }
        return () => clearInterval(timer);
    }, [timeLeft, gameOver]);

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
                            Math Racing
                        </motion.h2>

                        <AnimatePresence mode="wait">
                            {gameOver ? (
                                <motion.div
                                    key="game-over"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-4"
                                >
                                    <h3 className="text-2xl text-purple-600">Game Over! Skor: {score}</h3>
                                    <Button
                                        onClick={startGame}
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                                    >
                                        Main Lagi
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="game-active"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-between text-lg mb-4">
                                        <motion.span
                                            className="px-4 py-2 bg-blue-100 rounded-full text-blue-600 font-semibold"
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                                        >
                                            Skor: {score}
                                        </motion.span>
                                        <motion.span
                                            className="px-4 py-2 bg-purple-100 rounded-full text-purple-600 font-semibold"
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                                        >
                                            Waktu: {timeLeft}s
                                        </motion.span>
                                    </div>

                                    <div className="relative h-16 bg-gray-200 rounded-full mb-6 overflow-hidden">
                                        <motion.div
                                            className="absolute left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                            style={{ width: `${position}%` }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${position}%` }}
                                            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                                        />
                                        <motion.div
                                            className="absolute top-1/2 -translate-y-1/2"
                                            style={{ left: `${position}%` }}
                                            initial={{ x: 0 }}
                                            animate={{ x: `${position}%` }}
                                            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                                        >
                                            <Car className="text-white" size={32} />
                                        </motion.div>
                                    </div>

                                    <div className="space-y-4">
                                        <motion.h3
                                            className="text-2xl font-bold text-blue-600"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            key={question}
                                        >
                                            {question}
                                        </motion.h3>
                                        <input
                                            type="number"
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            className="w-24 p-2 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') checkAnswer();
                                            }}
                                        />
                                        <div>
                                            <Button
                                                onClick={checkAnswer}
                                                className="ml-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                                            >
                                                Jawab
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default MathRacing;

