import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Square, Circle, Triangle } from 'lucide-react';

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
        <div className='min-h-screen py-3 md:py-20 px-2 md:px-96'>
            <Card className="p-6">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold">Math Shape Puzzle</h2>
                    <div className="flex justify-between text-lg mb-4">
                        <span>Level: {level}</span>
                        <span>Skor: {score}</span>
                    </div>

                    <div className="flex justify-center gap-4 mb-6">
                        {Object.entries(shapes).map(([name, { icon: Icon, value }]) => (
                            <div key={name} className="text-center">
                                <Icon className="w-8 h-8" />
                                <span className="text-sm">= {value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-4 mb-6">
                        {puzzle.map((shape, index) => {
                            const ShapeIcon = shapes[shape].icon;
                            return <ShapeIcon key={index} className="w-12 h-12" />;
                        })}
                    </div>

                    <div className="space-y-4">
                        <input
                            type="number"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className="w-24 p-2 text-center text-lg border rounded"
                            placeholder="?"
                        />
                        <div>
                            <Button onClick={checkAnswer} className="ml-4">
                                Periksa
                            </Button>
                        </div>
                        {feedback && (
                            <p
                                className={`text-lg font-bold ${feedback.includes('Benar') || feedback.includes('Level')
                                    ? 'text-green-500'
                                    : 'text-red-500'
                                    }`}
                            >
                                {feedback}
                            </p>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default MathShapePuzzle;
