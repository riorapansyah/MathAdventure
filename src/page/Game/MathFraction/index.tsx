import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

            if (matches + 1 === fractions.length) {
                if (score + level * 10 >= level * 50) {
                    setLevel((prev) => Math.min(prev + 1, 5));
                    setFeedback('Level Up! 🎉');
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
        <div className='min-h-screen py-3 md:py-20 px-2 md:px-96'>
            <Card className="p-6">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold">Fraction Match</h2>

                    <div className="flex justify-between text-lg mb-4">
                        <span>Level: {level}</span>
                        <span>Skor: {score}</span>
                    </div>

                    <p className="text-sm text-gray-600">Cocokkan pecahan dengan nilai desimalnya</p>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            {fractions.map((fraction, index) => (
                                <div
                                    key={fraction.id}
                                    onClick={() => handleSelect('fraction', index)}
                                    className={`h-12 flex items-center justify-center rounded-lg cursor-pointer ${selected.fraction === index
                                        ? 'bg-blue-500 text-white scale-105'
                                        : 'bg-gray-200'
                                        } transition-all duration-300`}
                                >
                                    {fraction.display}
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            {decimals.map((decimal, index) => (
                                <div
                                    key={decimal.id}
                                    onClick={() => handleSelect('decimal', index)}
                                    className={`h-12 flex items-center justify-center rounded-lg cursor-pointer ${selected.decimal === index
                                        ? 'bg-blue-500 text-white scale-105'
                                        : 'bg-gray-200'
                                        } transition-all duration-300`}
                                >
                                    {decimal.display}
                                </div>
                            ))}
                        </div>
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

                    <Button onClick={generatePuzzle} className="mt-4">
                        Reset Game
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default MathFractionMatch;
