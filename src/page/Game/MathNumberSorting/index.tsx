import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

type GameStatus = 'playing' | 'success' | 'error';
type OrderType = 'ascending' | 'descending';

const MathNumberSort: React.FC = () => {
    const [numbers, setNumbers] = useState<number[]>([]);
    const [userSequence, setUserSequence] = useState<number[]>([]);
    const [score, setScore] = useState<number>(0);
    const [level, setLevel] = useState<number>(1);
    const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
    const [orderType, setOrderType] = useState<OrderType>('ascending');

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
    };

    const handleNumberClick = (number: number) => {
        if (gameStatus !== 'playing') return;

        if (userSequence.includes(number)) {
            setUserSequence(userSequence.filter((num) => num !== number));
        } else {
            setUserSequence([...userSequence, number]);
        }
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

            if (score + level * 10 >= level * 50) {
                setLevel((prevLevel) => Math.min(prevLevel + 1, 5));
            }
        } else {
            setGameStatus('error');
        }
    };

    useEffect(() => {
        generateNumbers();
    }, [level]);

    return (
        <div className='min-h-screen py-3 md:py-20 px-2 md:px-96'>
            <Card className="p-6">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold">Number Sorting Game</h2>

                    <div className="flex justify-between text-lg mb-4">
                        <span>Level: {level}</span>
                        <span>Skor: {score}</span>
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-4">
                        <ArrowUpDown className="w-6 h-6" />
                        <span className="text-lg font-medium">
                            Urutkan secara {orderType === 'ascending' ? 'menaik' : 'menurun'}
                        </span>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {numbers.map((number) => (
                            <div
                                key={number}
                                onClick={() => handleNumberClick(number)}
                                className={`h-16 flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer
                                ${userSequence.includes(number)
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200'
                                    } 
                                ${gameStatus === 'error' ? 'animate-shake' : ''}
                                transition-all duration-300`}
                            >
                                {number}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-4">
                        <Button
                            onClick={checkSequence}
                            disabled={
                                userSequence.length !== numbers.length || gameStatus !== 'playing'
                            }
                        >
                            Periksa
                        </Button>
                        <Button onClick={generateNumbers}>Level Baru</Button>
                    </div>

                    {gameStatus === 'success' && (
                        <p className="text-green-500 font-bold">
                            Benar! Lanjut ke soal berikutnya!
                        </p>
                    )}
                    {gameStatus === 'error' && (
                        <p className="text-red-500 font-bold">Coba lagi!</p>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default MathNumberSort;
