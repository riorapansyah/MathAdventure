'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Square, Circle, Triangle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Shape {
    icon: React.ComponentType<{ className?: string }>;
    value: number;
}

const MathShapePuzzle = () => {
    const [puzzle, setPuzzle] = useState<string[]>([]);
    const [solution, setSolution] = useState<number | null>(null);
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [score, setScore] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>('');
    const [level, setLevel] = useState<number>(1);

    const shapes: Record<string, Shape> = {
        square: { icon: Square, value: 4 },
        circle: { icon: Circle, value: 3 },
        triangle: { icon: Triangle, value: 2 },
    };

    const generatePuzzle = () => {
        const availableShapes = Object.keys(shapes);
        const puzzleLength = Math.min(level + 2, 5);
        const newPuzzle: string[] = [];
        let totalValue = 0;

        for (let i = 0; i < puzzleLength; i++) {
            const shape = availableShapes[Math.floor(Math.random() * availableShapes.length)];
            newPuzzle.push(shape);
            totalValue += shapes[shape].value;
        }

        setPuzzle(newPuzzle);
        setSolution(totalValue);
        setUserAnswer('');
        setFeedback('');
    };

    const checkAnswer = () => {
        const answer = parseInt(userAnswer);
        if (answer === solution) {
            setScore((prev) => prev + level * 10);
            setFeedback('Benar!');
            if (score + level * 10 >= level * 50) {
                setLevel((prev) => Math.min(prev + 1, 5));
                setFeedback('Level Up! 🎉');
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        } else {
            setFeedback('Coba lagi!');
        }
        setTimeout(generatePuzzle, 1500);
    };

    useEffect(() => {
        generatePuzzle();
    }, [level]);

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-4'>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
            >
                <Card className="p-8 bg-white shadow-xl rounded-2xl">
                    <div className="text-center space-y-6">
                        <motion.h2
                            className="text-3xl font-bold text-purple-600"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        >
                            Math Shape Puzzle
                        </motion.h2>
                        <div className="flex justify-between text-lg mb-4">
                            <motion.span
                                className="px-4 py-2 bg-purple-100 rounded-full text-purple-600 font-semibold"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                            >
                                Level: {level}
                            </motion.span>
                            <motion.span
                                className="px-4 py-2 bg-blue-100 rounded-full text-blue-600 font-semibold"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                            >
                                Skor: {score}
                            </motion.span>
                        </div>

                        <div className="flex justify-center gap-8 mb-6">
                            {Object.entries(shapes).map(([name, { icon: Icon, value }]) => (
                                <motion.div
                                    key={name}
                                    className="text-center"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Icon className="w-12 h-12 text-purple-500" />
                                    <span className="text-sm font-semibold text-purple-600">= {value}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="flex justify-center gap-4 mb-6"
                            variants={{
                                hidden: { opacity: 0 },
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
                            {puzzle.map((shape, index) => {
                                const ShapeIcon = shapes[shape].icon;
                                return (
                                    <motion.div
                                        key={index}
                                        variants={{
                                            hidden: { y: 20, opacity: 0 },
                                            show: { y: 0, opacity: 1 }
                                        }}
                                    >
                                        <ShapeIcon className="w-16 h-16 text-blue-500" />
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        <div className="space-y-4">
                            <input
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                className="w-24 p-2 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="?"
                            />
                            <div>
                                <Button
                                    onClick={checkAnswer}
                                    className="ml-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                                >
                                    Periksa
                                </Button>
                            </div>
                            <AnimatePresence>
                                {feedback && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        className={`text-lg font-bold ${feedback.includes('Benar') || feedback.includes('Level')
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                            }`}
                                    >
                                        {feedback}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default MathShapePuzzle;

