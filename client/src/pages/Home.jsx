import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

function getOutfitRecommendation(temp, wind, humidity) {
    const advice = [];
    if (temp <= 32) {
        advice.push("🧥 Heavy coat, thermal underlayer");
        advice.push("🧣 Scarf, gloves, and hat essential");
    } else if (temp <= 50) {
        advice.push("🧥 Warm jacket or heavy sweater");
        advice.push("👖 Long pants, consider layering");
    } else if (temp <= 65) {
        advice.push("🧢 Light jacket or hoodie");
        advice.push("👖 Jeans or chinos work great");
    } else if (temp <= 75) {
        advice.push("👕 T-shirt or light long sleeve");
        advice.push("👖 Jeans or light pants");
    } else {
        advice.push("👕 Lightweight t-shirt or tank top");
        advice.push("🩳 Shorts or light pants");
    }
    if (wind > 20) advice.push("💨 Wind-resistant outer layer recommended");
    if (humidity > 80) advice.push("💧 Breathable, moisture-wicking fabrics");
    return advice;
}

function Home() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async (lat, lon) => {
            try {
                const response = await fetch(`${API_BASE}/api/weather?lat=${lat}&lon=${lon}&time=auto&temperature_unit=fahrenheit`);
                if (!response.ok) throw new Error("Weather fetch failed");
                const data = await response.json();
                setWeather(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setError("Failed to fetch weather data.");
                setWeather(null);
            } finally {
                setLoading(false);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude);
                },
                () => {
                    fetchWeather(38.98, -76.94);
                }
            );
        } else {
            fetchWeather(38.98, -76.94);
        }
    }, []);
    const temp = weather?.current?.temperature_2m;
    const wind = weather?.current?.wind_speed_10m;
    const humidity = weather?.current?.relative_humidity_2m;
    const advice = temp !== undefined && temp !== null
        ? getOutfitRecommendation(temp, wind, humidity)
        : [];
    return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
            <h1 style= {{ fontSize: "2rem", marginBottom: "1rem" }}>
            Weather Outfit Recommender</h1>
            <p style= {{color: 'lightgreen', marginBottom: "2rem"}}>Get personalized outfit recommendations based on the current weather conditions in your location.</p>
            
            {loading && <p>Loading weather...</p> }
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && weather && (
                <>
                    <div
                        style={{
                            background: "black",
                            color: "white",
                            borderRadius: "12px",
                            marginBottom: "1.5rem",
                            padding: "1.5rem",
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                        }}
                    >
                    <div>
                        <h3>🌡 Temperature</h3>
                        <p>{temp}°C</p>
                    </div>

                    <div>
                        <h3>💨 Wind Speed</h3>
                        <p>{wind} mph</p>
                    </div>

                    <div>
                        <h3>💧 Humidity</h3>
                        <p>{humidity}%</p>
                     </div>
                    </div>
                    <div style={{
                        background: "#f0fdf4", border: "1px solid #86efac",
                        borderRadius: "12px", padding: "1.5rem",
                    }}>
                        <h2 style={{ marginTop: 0, color: "#166534" }}>Today's Outfit Recommendation</h2>
                        <ul style={{ paddingLeft: "1.2rem", lineHeight: "2rem", margin: 0 }}>
                            {advice.map((tip, i) => (
                                <li key={i} style={{ fontSize: "1.05rem" }}>{tip}</li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}
 
export default Home;