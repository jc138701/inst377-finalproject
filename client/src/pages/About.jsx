import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Chart from "chart.js/auto";

function About() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) chartInstance.current.destroy();

        chartInstance.current = new Chart(chartRef.current, {
            type: "bar",
            data: {
                labels: ["React", "Express.js", "Supabase", "Open-Meteo", "Chart.js", "Framer Motion"],
                datasets: [{
                    label: "Usage in Project (%)",
                    data: [95, 80, 70, 60, 40, 50],
                    backgroundColor: [
                        "#60a5fa", "#34d399", "#f472b6",
                        "#facc15", "#fb923c", "#a78bfa"
                    ],
                    borderRadius: 6,
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });

        return () => chartInstance.current?.destroy();
    }, []);

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1, y: 0,
            transition: { delay: i * 0.15, duration: 0.5 }
        }),
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
            >
                About IntelliFit
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ color: "#555", marginBottom: "2rem" }}
            >
                IntelliFit is a weather-based outfit recommendation application
                designed to help users choose the perfect attire for their day.
                By leveraging real-time weather data, IntelliFit provides personalized
                outfit suggestions based on temperature, wind speed, and humidity.
            </motion.p>

            <motion.h2 custom={2} variants={fadeUp} initial="hidden" animate="visible">
                Problem
            </motion.h2>
            <motion.p
                custom={3} variants={fadeUp} initial="hidden" animate="visible"
                style={{ color: "#555" }}
            >
                Choosing the right outfit can be challenging when weather is unpredictable.
                Users struggle to balance comfort and style with current conditions.
            </motion.p>

            <motion.h2
                custom={4} variants={fadeUp} initial="hidden" animate="visible"
                style={{ marginTop: "2rem" }}
            >
                Tech Stack
            </motion.h2>

            <motion.div
                custom={5} variants={fadeUp} initial="hidden" animate="visible"
                style={{
                    background: "#f8fafc", border: "1px solid #e2e8f0",
                    borderRadius: "12px", padding: "1.5rem", marginTop: "1rem"
                }}
            >
                <canvas ref={chartRef} />
            </motion.div>
        </div>
    );
}

export default About;