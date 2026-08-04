"use client"
import { motion } from 'framer-motion'
import { Bug, Gauge, Search, ShieldCheck } from 'lucide-react'



const demoFeatures = [
    {
        icon: Gauge,
        title: "Performance Test",
        description: "Analyze loading speed and performance metrics",
        color: "text-purple-400",
        bg: "bg-purple-500/10"
    },
    {
        icon: Search,
        title: "SEO Analysis",
        description: "Get insights to imporve your search engine rankings",
        color: "text-emrald-400",
        bg: "bg-emerald-500/10"
    },
    {
        icon: ShieldCheck,
        title: "Accessibility",
        description: "Ensure your website is usable by everyone",
        color: "text-sky-400",
        bg: "bg-sky-500/10"
    },
    {
        icon: Bug,
        title: "Bug Detection",
        description: "Find potential issues and errors on your site",
        color: "text-orange-400",
        bg: "bg-orange-500/10"
    }
]


const Features = () => {
    return (
        <section
            id='features'
            className='mx-auto grid max-w-6xl gap-10 px-6 pb-20 sm:grid-cols-4 lg:px-8'
        >
            {demoFeatures.map((demo, index) => (
                <motion.div
                    key={demo.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: index * 0.8, ease: "easeOut" }}
                    className='flex flex-col items-center text-center'
                >
                    <span
                        className={`mb-4 flex h-14 items-center justify-center rounded-full ${demo.bg}`}
                    >
                        <demo.icon className={`h-6 w-6 ${demo.color}`}
                            strokeWidth={2}
                        />
                    </span>
                    <h3
                        className='text-base font-semibold text-white'
                    >
                        ${demo.title}
                    </h3>
                    <p className='mt-2 max-w-[200px] text-sm text-gray-400'>{demo.description}</p>
                </motion.div>
            ))}
        </section>
    )
}

export default Features