import SparklesText from '@/components/ui/sparkles-text'

export default function SectionTwo() {
    return (
        <section className="flex flex-col items-center gap-10 bg-wise-secondary relative sm:px-12 md:px-24 lg:px-48 px-4 py-20 min-h-screen">
            <SparklesText text="Tentang MathMetrik" className='text-2xl sm:text-4xl' />

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-wise-primary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow" data-aos="fade-left">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900">Apa Itu MathMetrik</div>
                        </div>
                        <div className="text-slate-500">
                            <b>MathMetrik</b> adalah aplikasi web interaktif yang dirancang khusus untuk membantu Anda melakukan perhitungan berbagai
                            jenis bilangan dan geometri dengan mudah dan cepat.
                        </div>
                    </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-wise-primary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow" data-aos="fade-right">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900"></div>
                        </div>
                        <div className="text-slate-500">
                            Aplikasi ini merupakan solusi lengkap bagi siapa saja yang ingin mengeksplorasi konsep matematika mulai dari deret Fibonacci, bilangan prima, hingga berbagai rumus geometri tanpa kerumitan.
                        </div>
                    </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-wise-primary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow" data-aos="fade-left">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900">Team Wise</div>
                        </div>
                        <div className="text-slate-500">MathMetrik merupakan project akhir tugas kuliah, yang bertujuan untuk menyelesaikan perhitungan matematika secara interaktif. Aplikasi ini dibuat oleh beberapa anggota tim berikut ini.</div>
                    </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-wise-primary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow" data-aos="fade-right">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900">Daffa Habibi</div>
                        </div>
                        <div className="text-slate-500">
                            haii aku dafa, aku salah satu anggota dari team project MathMetrik.
                            alasan aku memilih jurusan Teknik Informatika karena saya ingin
                            mempelajari dan mengembangkan teknologi/koding.bukan hanya itu aja
                            saya mau membuat sebuah teknologi menggunakan website
                        </div>
                    </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-wise-primary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow" data-aos="fade-left">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900">Muhammad Rizna Taris</div>
                        </div>
                        <div className="text-slate-500">
                            haii aku Taris, aku salah satu anggota dari team project MathMetrik.
                            alasan saya memilih jurusan Teknik Informatika karena saya memiliki
                            ketertarikan dengan perkembangan teknologi, bukan hanya itu Teknik
                            Informatika melatih logika, kreativitas, dan kemampuan analitis,
                            yang selalu membuat saya tertantang untuk berkembang di bidang teknologi.
                        </div>
                    </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-wise-primary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow" data-aos="fade-right">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900">Rizky Syahputra</div>
                        </div>
                        <div className="text-slate-500">
                            haii aku rizky, aku salah satu anggota dari team project MathMetrik.
                            alasan aku memilih jurusan Teknik Informatika karena saya suka dengan
                            perkembangan teknologi, bukan hanya karena itu saja karena teknologi
                            itu semakin tahun semakin berkembang pesat jika saya tidak belajar saya
                            akan tertinggal dengan orang" yang paham dengan dunia teknologi.
                        </div>
                    </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-wise-primary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow" data-aos="fade-left">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900">Rifki Nur Ikhwan</div>
                        </div>
                        <div className="text-slate-500">
                            Hai aku rifki, aku adalah salah satu anggota tim project MathMetrik.
                            Kenapa sih aku memilih jurusan Teknik Informatika ? Karena aku suka
                            dengan perkembangan teknologi terutama di bidang pemrograman, banyak
                            hal yang bisa aku gapai di bidang ini salah satu nya yaitu membuat
                            sistem yang dapat membantu dalam bidang pendidikan. Oleh karena itu
                            aku mengusulkan untuk membuat MathMetrik ini.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
