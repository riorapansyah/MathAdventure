import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';

const MathRacing = () => {
    const [position, setPosition] = useState(0);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);

    const generateQuestion = () => {
        const operations = ['+', '-', '×'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        let num1, num2, result: any;

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
        let timer: any;
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
        <div className='min-h-screen py-3 md:py-20 px-2 md:px-96'>
            <Card className="p-6">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold">Math Racing</h2>

                    {gameOver ? (
                        <div className="space-y-4">
                            <h3 className="text-xl">Game Over! Skor: {score}</h3>
                            <Button onClick={startGame}>Main Lagi</Button>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between text-lg mb-4">
                                <span>Skor: {score}</span>
                                <span>Waktu: {timeLeft}s</span>
                            </div>

                            <div className="relative h-16 bg-gray-200 rounded-full mb-6">
                                <div
                                    className="absolute left-0 h-full bg-blue-500 rounded-full transition-all duration-300"
                                    style={{ width: `${position}%` }}
                                />
                                <Car
                                    className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
                                    style={{ left: `${position}%` }}
                                />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold">{question}</h3>
                                <input
                                    type="number"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    className="w-24 p-2 text-center text-lg border rounded"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') checkAnswer();
                                    }}
                                />
                                <div>
                                    <Button onClick={checkAnswer} className="ml-4">
                                        Jawab
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default MathRacing;