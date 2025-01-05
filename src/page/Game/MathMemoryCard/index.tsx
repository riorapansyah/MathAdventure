import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

interface CardItem {
    id: string;
    type: 'equation' | 'answer';
    value: number;
    display: string;
}

const MathMemoryGame = () => {
    const [cards, setCards] = useState<CardItem[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [solved, setSolved] = useState<number[]>([]);
    const [moves, setMoves] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [initialReveal, setInitialReveal] = useState<boolean>(true);
    const [timeLeft, setTimeLeft] = useState<number>(7);

    const generateCards = (): CardItem[] => {
        const numbers = Array.from({ length: 8 }, (_, i) => i + 1);
        const equations: any = numbers.map((num) => ({
            id: `eq-${num}`,
            type: 'equation',
            value: num,
            display: generateEquation(num),
        }));
        const answers = numbers.map((num) => ({
            id: `ans-${num}`,
            type: 'answer',
            value: num,
            display: num.toString(),
        }));
        return shuffle([...equations, ...answers]);
    };

    const generateEquation = (result: number): string => {
        const operations = ['+', '-', '×'];
        const op = operations[Math.floor(Math.random() * operations.length)];
        let a: number, b: number;

        switch (op) {
            case '+':
                a = Math.floor(Math.random() * (result - 1)) + 1;
                b = result - a;
                break;
            case '-':
                a = result + Math.floor(Math.random() * 5);
                b = a - result;
                break;
            case '×':
                const factors = [];
                for (let i = 1; i <= result; i++) {
                    if (result % i === 0) factors.push(i);
                }
                const factor = factors[Math.floor(Math.random() * factors.length)];
                a = factor;
                b = result / factor;
                break;
            default:
                a = 1;
                b = result - 1;
        }
        return `${a} ${op} ${b}`;
    };

    const shuffle = (array: CardItem[]): CardItem[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const handleClick = (index: number) => {
        if (initialReveal || flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves((prev) => prev + 1);
            const [first, second] = newFlipped;
            if (cards[first].value === cards[second].value) {
                setSolved((prev) => [...prev, first, second]);
                setFlipped([]);
            } else {
                setTimeout(() => setFlipped([]), 800);
            }
        }
    };

    const startNewGame = () => {
        const newCards = generateCards();
        setCards(newCards);
        setFlipped(newCards.map((_, index) => index));
        setSolved([]);
        setMoves(0);
        setGameOver(false);
        setInitialReveal(true);
        setTimeLeft(7);
    };

    useEffect(() => {
        startNewGame();
    }, []);

    useEffect(() => {
        if (initialReveal) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setInitialReveal(false);
                        setFlipped([]);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [initialReveal]);

    useEffect(() => {
        if (solved.length === cards.length && cards.length > 0) {
            setGameOver(true);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            });
        }
    }, [solved, cards]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
            >
                <Card className="p-8 bg-white shadow-xl rounded-2xl">
                    <div className="text-center mb-6">
                        <motion.h2
                            className="text-3xl font-bold text-indigo-600 mb-2"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                        >
                            Math Memory Game
                        </motion.h2>
                        <motion.p
                            className="text-lg text-purple-600 font-semibold"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                        >
                            {initialReveal ? `Hafalkan kartu-kartu itu! ${timeLeft}  detik tersisa!` : `Gerakan: ${moves}`}
                        </motion.p>
                    </div>

                    <AnimatePresence>
                        {gameOver ? (
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl mb-4 text-indigo-600">
                                    Selamat! Kamu menyelesaikan permainan dalam {moves} gerakan!
                                </h3>
                                <Button
                                    onClick={startNewGame}
                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                                >
                                    Main Lagi
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="grid grid-cols-4 gap-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {cards.map((card, index) => (
                                    <motion.div
                                        key={card.id}
                                        onClick={() => handleClick(index)}
                                        className="aspect-square flex items-center justify-center text-lg font-bold rounded-lg cursor-pointer shadow-md"
                                        style={{
                                            backgroundColor:
                                                flipped.includes(index) || solved.includes(index)
                                                    ? '#5a67d8'
                                                    : '#f7fafc',
                                            color:
                                                flipped.includes(index) || solved.includes(index)
                                                    ? 'white'
                                                    : '#4c51bf',
                                            transform: flipped.includes(index) || solved.includes(index)
                                                ? 'rotateY(180deg)'
                                                : 'rotateY(0deg)',
                                            transition: 'transform 0.3s ease',
                                        }}
                                    >
                                        {flipped.includes(index) || solved.includes(index) || initialReveal
                                            ? <p className='rotate-custom'>{card.display}</p>
                                            : <p className=''>?</p>
                                        }
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Card>
            </motion.div>
        </div>
    );
};

export default MathMemoryGame;

