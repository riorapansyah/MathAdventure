import { CardDataType } from '@/types/CardDataTypes'
import WiseIcon from '../icon'
import { Link } from 'react-router-dom'

interface props {
    cardData: CardDataType[]
}

export default function CardGame({ cardData }: props) {
    return (
        <div className="grid gap-8 md:grid-cols-3">
            {cardData.map((card: CardDataType, index: number) => (
                <div key={index} className="group cursor-pointer" data-aos="zoom-in">
                    <div className="bg-white rounded-t-2xl">
                        <div className={`h-48 rounded-2xl transition-all duration-300 group-hover:rounded-lg`} style={{ backgroundColor: card.color, backgroundImage: `url(${card.background_img})`, backgroundSize: "200px", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                            <div className="p-6 h-full rounded-2xl group-hover:rounded-lg" style={{ backgroundImage: `linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3))`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-b-2xl shadow flex flex-col items-end">
                        <p className="text-gray-600">
                            {card.description}
                        </p>

                        <Link to={`${card.link}`} className="mt-5 rounded-full border px-3 py-1 border-wise-primary text-wise-primary hover:text-wise-primary flex items-center gap-2">
                            Lihat Game
                            <WiseIcon iconName="HiOutlineExternalLink" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
