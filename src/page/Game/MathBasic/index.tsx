import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle } from 'lucide-react';

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
            case 1: // Penjumlahan & Pengurangan Sederhana
                num1 = Math.floor(Math.random() * 20) + 1;
                num2 = Math.floor(Math.random() * 20) + 1;
                operation = Math.random() < 0.5 ? '+' : '-';
                break;
            case 2: // Perkalian Sederhana
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
                operation = '×';
                break;
            case 3: // Pembagian Sederhana
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
        <div className='min-h-screen py-3 md:py-20 px-2 md:px-96'>
            <Card className="">
                <CardHeader>
                    <CardTitle className="text-center">Game Matematika</CardTitle>
                </CardHeader>
                <CardContent>
                    {!gameActive ? (
                        <div className="text-center">
                            <h2 className="text-xl mb-4">
                                {timeLeft === 30 ? 'Siap untuk bermain?' : `Skor Akhir: ${score}`}
                            </h2>
                            <Button onClick={startGame}>
                                {timeLeft === 30 ? 'Mulai Game' : 'Main Lagi'}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-between text-lg">
                                <span>Level: {level}</span>
                                <span>Skor: {score}</span>
                                <span>Waktu: {timeLeft}s</span>
                            </div>

                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-4">{question}</h2>
                                <input
                                    type="number"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    className="w-24 p-2 text-center text-lg border rounded"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') checkAnswer();
                                    }}
                                />
                                <Button
                                    onClick={checkAnswer}
                                    className="ml-4"
                                >
                                    Jawab
                                </Button>
                            </div>

                            {feedback && (
                                <div className="flex items-center justify-center gap-2">
                                    {feedback === 'Benar!' ? (
                                        <CheckCircle className="text-green-500" />
                                    ) : (
                                        <AlertCircle className="text-red-500" />
                                    )}
                                    <span className={feedback === 'Benar!' ? 'text-green-500' : 'text-red-500'}>
                                        {feedback}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default MathGame;