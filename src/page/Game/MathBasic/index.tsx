'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Trophy } from 'lucide-react';

const MathGame = () => {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [question, setQuestion] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [streak, setStreak] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameActive, setGameActive] = useState(false);

    const generateQuestion = () => {
        let num1, num2, operation;

        switch (level) {
            case 1:
                num1 = Math.floor(Math.random() * 20) + 1;
                num2 = Math.floor(Math.random() * 20) + 1;
                operation = Math.random() < 0.5 ? '+' : '-';
                break;
            case 2:
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
                operation = '×';
                break;
            case 3:
                num2 = Math.floor(Math.random() * 10) + 1;
                num1 = num2 * (Math.floor(Math.random() * 10) + 1);
                operation = '÷';
                break;
            default:
                num1 = Math.floor(Math.random() * 20) + 1;
                num2 = Math.floor(Math.random() * 20) + 1;
                operation = '+';
        }

        let answer;
        switch (operation) {
            case '+':
                answer = num1 + num2;
                break;
            case '-':
                answer = num1 - num2;
                break;
            case '×':
                answer = num1 * num2;
                break;
            case '÷':
                answer = num1 / num2;
                break;
            default:
                answer = num1 + num2;
        }

        setQuestion(`${num1} ${operation} ${num2} = ?`);
        setCorrectAnswer(answer);
    };

    const startGame = () => {
        setGameActive(true);
        setScore(0);
        setLevel(1);
        setStreak(0);
        setTimeLeft(30);
        generateQuestion();
    };

    const checkAnswer = () => {
        const numAnswer = parseFloat(userAnswer);
        if (numAnswer === correctAnswer) {
            setScore(score + (level * 10));
            setStreak(streak + 1);
            setFeedback('Benar!');
            if (streak + 1 >= 3 && level < 3) {
                setLevel(level + 1);
                setStreak(0);
                setFeedback('Level Up! 🎉');
            }
        } else {
            setStreak(0);
            setFeedback('Coba lagi!');
        }
        setUserAnswer('');
        generateQuestion();
    };

    useEffect(() => {
        let timer: any;
        if (gameActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setGameActive(false);
        }
        return () => clearInterval(timer);
    }, [gameActive, timeLeft]);

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4'>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="overflow-hidden shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <CardTitle className="text-center text-3xl font-bold">Game Matematika</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <AnimatePresence mode="wait">
                            {!gameActive ? (
                                <motion.div
                                    key="start"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-center space-y-4"
                                >
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {timeLeft === 30 ? 'Siap untuk bermain?' : (
                                            <div className="flex items-center justify-center space-x-2">
                                                <Trophy className="text-yellow-500" />
                                                <span>Skor Akhir: {score}</span>
                                            </div>
                                        )}
                                    </h2>
                                    <Button
                                        onClick={startGame}
                                        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                                    >
                                        {timeLeft === 30 ? 'Mulai Game' : 'Main Lagi'}
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="game"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-between text-lg font-semibold">
                                        <motion.span
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            Level: {level}
                                        </motion.span>
                                        <motion.span
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            Skor: {score}
                                        </motion.span>
                                        <motion.span
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            Waktu: {timeLeft}s
                                        </motion.span>
                                    </div>

                                    <div className="text-center space-y-4">
                                        <motion.h2
                                            className="text-3xl font-bold mb-4"
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                                        >
                                            {question}
                                        </motion.h2>
                                        <div className="flex items-center justify-center space-x-4">
                                            <input
                                                type="number"
                                                value={userAnswer}
                                                onChange={(e) => setUserAnswer(e.target.value)}
                                                className="w-24 p-2 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') checkAnswer();
                                                }}
                                            />
                                            <Button
                                                onClick={checkAnswer}
                                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                                            >
                                                Jawab
                                            </Button>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {feedback && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex items-center justify-center gap-2"
                                            >
                                                {feedback === 'Benar!' ? (
                                                    <CheckCircle className="text-green-500" />
                                                ) : (
                                                    <AlertCircle className="text-red-500" />
                                                )}
                                                <span className={feedback === 'Benar!' ? 'text-green-500' : 'text-red-500'}>
                                                    {feedback}
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default MathGame;

