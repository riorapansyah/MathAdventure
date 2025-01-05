'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

interface Fraction {
    id: number;
    numerator: number;
    denominator: number;
    value: number;
    display: string;
}

interface Decimal {
    id: number;
    value: number;
    display: string;
}

const MathFractionMatch = () => {
    const [fractions, setFractions] = useState<Fraction[]>([]);
    const [decimals, setDecimals] = useState<Decimal[]>([]);
    const [selected, setSelected] = useState<{ fraction: number | null; decimal: number | null }>({
        fraction: null,
        decimal: null,
    });
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [matches, setMatches] = useState(0);
    const [feedback, setFeedback] = useState('');

    const generateFraction = (): Fraction => {
        const maxDenominator = Math.min(level * 4, 12);
        const denominator = Math.floor(Math.random() * maxDenominator) + 2;
        const numerator = Math.floor(Math.random() * denominator) + 1;
        return {
            id: Math.random(),
            numerator,
            denominator,
            value: numerator / denominator,
            display: `${numerator}/${denominator}`,
        };
    };

    const generatePuzzle = () => {
        const pairCount = Math.min(level + 2, 6);
        const newFractions: Fraction[] = [];
        const newDecimals: Decimal[] = [];

        for (let i = 0; i < pairCount; i++) {
            const fraction = generateFraction();
            newFractions.push(fraction);
            newDecimals.push({
                id: fraction.id,
                value: fraction.value,
                display: fraction.value.toFixed(2),
            });
        }

        setFractions(shuffle(newFractions));
        setDecimals(shuffle(newDecimals));
        setSelected({ fraction: null, decimal: null });
        setMatches(0);
        setFeedback('');
    };

    const shuffle = <T,>(array: T[]): T[] => {
        return [...array].sort(() => Math.random() - 0.5);
    };

    const handleSelect = (type: 'fraction' | 'decimal', index: number) => {
        const newSelected: any = { ...selected };
        newSelected[type] = index;
        setSelected(newSelected);

        if (newSelected.fraction !== null && newSelected.decimal !== null) {
            checkMatch(newSelected);
        }
    };

    const checkMatch = (selection: { fraction: number; decimal: number }) => {
        const fractionValue = fractions[selection.fraction].value;
        const decimalValue = decimals[selection.decimal].value;

        if (Math.abs(fractionValue - decimalValue) < 0.01) {
            setScore(score + level * 10);
            setMatches(matches + 1);
            setFeedback('Benar!');
            generatePuzzle();

            if (matches + 1 === fractions.length) {
                if (score + level * 10 >= level * 50) {
                    setLevel((prev) => Math.min(prev + 1, 5));
                    setFeedback('Level Up! 🎉');
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
                setTimeout(generatePuzzle, 1000);
            }
        } else {
            setFeedback('Coba lagi!');
        }

        setTimeout(() => {
            setSelected({ fraction: null, decimal: null });
            setFeedback('');
        }, 1000);
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
                            Fraction Match
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

                        <p className="text-sm text-gray-600">Cocokkan pecahan dengan nilai desimalnya</p>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                {fractions.map((fraction, index) => (
                                    <motion.div
                                        key={fraction.id}
                                        onClick={() => handleSelect('fraction', index)}
                                        className={`h-12 flex items-center justify-center rounded-lg cursor-pointer ${selected.fraction === index
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                                            } transition-all duration-300`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {fraction.display}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                {decimals.map((decimal, index) => (
                                    <motion.div
                                        key={decimal.id}
                                        onClick={() => handleSelect('decimal', index)}
                                        className={`h-12 flex items-center justify-center rounded-lg cursor-pointer ${selected.decimal === index
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                            } transition-all duration-300`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {decimal.display}
                                    </motion.div>
                                ))}
                            </div>
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

                        <Button
                            onClick={generatePuzzle}
                            className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                        >
                            Reset Game
                        </Button>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default MathFractionMatch;
