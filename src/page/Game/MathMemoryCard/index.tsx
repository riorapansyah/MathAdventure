import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

    const generateCards = (): CardItem[] => {
        const numbers = Array.from({ length: 8 }, (_, i) => i + 1);
        const equations: any = numbers.map((num) => ({
            id: `eq-${num}`,
            type: 'equation',
            value: num,
            display: generateEquation(num),
        }));
        const answers: any = numbers.map((num) => ({
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
        if (flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves((prev) => prev + 1);
            const [first, second] = newFlipped;
            if (cards[first].value === cards[second].value) {
                setSolved((prev) => [...prev, first, second]);
                setFlipped([]);
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    const startNewGame = () => {
        setCards(generateCards());
        setFlipped([]);
        setSolved([]);
        setMoves(0);
        setGameOver(false);
    };

    useEffect(() => {
        startNewGame();
    }, []);

    useEffect(() => {
        if (solved.length === cards.length && cards.length > 0) {
            setGameOver(true);
        }
    }, [solved, cards]);

    return (
        <div className='min-h-screen py-3 md:py-20 px-2 md:px-96'>
            <Card className="p-6">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold mb-2">Math Memory Game</h2>
                    <p>Gerakan: {moves}</p>
                </div>

                {gameOver ? (
                    <div className="text-center">
                        <h3 className="text-xl mb-4">
                            Selamat! Kamu menyelesaikan permainan dalam {moves} gerakan!
                        </h3>
                        <Button onClick={startNewGame}>Main Lagi</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-4">
                        {cards.map((card, index) => (
                            <div
                                key={card.id}
                                onClick={() => handleClick(index)}
                                className={`aspect-square flex items-center justify-center text-lg font-bold rounded-lg cursor-pointer transition-all duration-300 ${flipped.includes(index) || solved.includes(index)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200'
                                    }`}
                            >
                                {flipped.includes(index) || solved.includes(index) ? card.display : '?'}
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default MathMemoryGame;
