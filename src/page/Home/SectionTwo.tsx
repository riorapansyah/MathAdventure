import { motion } from 'framer-motion';
import { useTrail, animated } from '@react-spring/web';
import SparklesText from '@/components/ui/sparkles-text';

const teamMembers = [
    {
        name: "Rio Rapansyah",
        description: "",
        avatar: "/public/alfi.jpeg"
    },
    {
        name: "Dimas Khansa",
        description: "",
        avatar: "/public/alfi.jpeg"
    },
    {
        name: "Agil Sammy Aldo",
        description: "",
        avatar: "/public/agil.jpeg"
    },
    {
        name: "DM Alfi Syahri",
        description: "",
        avatar: "/public/alfi.jpeg"
    }
];

export default function SectionTwo() {
    const trail = useTrail(teamMembers.length, {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
    });

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-4 py-20 sm:px-12 md:px-24 lg:px-48 overflow-hidden">
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                {[...Array(100)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full"
                        style={{
                            width: Math.random() * 3 + 1 + 'px',
                            height: Math.random() * 3 + 1 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                        }}
                        animate={{
                            y: [0, -30],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 2 + 1,
                            repeat: Infinity,
                            repeatType: 'loop',
                        }}
                    />
                ))}
            </motion.div>

            <div className="relative z-10">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <SparklesText text="Tentang LogikaLand" className="text-4xl sm:text-6xl font-bold text-white mb-8" />
                    <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                        Selamat datang di LogikaLand, tempat di mana matematika bertemu petualangan!
                        Kami adalah tim mahasiswa yang passionate tentang membuat belajar matematika menjadi seru dan interaktif.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {trail.map((style, index) => (
                        <animated.div key={teamMembers[index].name} style={style}>
                            <motion.div
                                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        src={teamMembers[index].avatar}
                                        alt={teamMembers[index].name}
                                        className="w-16 h-16 rounded-full mr-4 border-2 border-yellow-400 object-cover"
                                    />
                                    <h3 className="text-2xl font-bold text-yellow-400">{teamMembers[index].name}</h3>
                                </div>
                                <p className="text-blue-100">{teamMembers[index].description}</p>
                            </motion.div>
                        </animated.div>
                    ))}
                </div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">Apa Itu LogikaLand?</h2>
                    <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                        LogikaLand adalah sebuah platform web interaktif yang dirancang khusus untuk menggabungkan keseruan bermain game dengan pembelajaran matematika. Di LogikaLand, pengguna dapat menjelajahi berbagai permainan edukasi yang menantang logika, keterampilan berhitung, dan pemahaman konsep matematika, seperti permainan pecahan, sorting angka, hingga puzzle geometri.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}