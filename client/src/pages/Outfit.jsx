import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Outfit() {
    const [wardrobe, setWardrobe] = useState([]);
    const [formData, setFormData] = useState({
        item_name: "", clothing_type: "", warmth_rating: "", price: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);

    const fetchWardrobe = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/wardrobe`);
            const data = await response.json();
            setWardrobe(data.data ?? []);
        } catch (error) {
            console.error("Error fetching wardrobe data:", error);
        }
    };

    useEffect(() => { fetchWardrobe(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        if (!formData.item_name.trim() || !formData.clothing_type.trim()) {
            setFormError("Item name and clothing type are required."); return;
        }
        const warmth = Number(formData.warmth_rating);
        const price = Number(formData.price);
        if (isNaN(warmth) || warmth < 1 || warmth > 10) {
            setFormError("Warmth rating must be between 1 and 10."); return;
        }
        if (isNaN(price) || price < 0) {
            setFormError("Price must be a positive number."); return;
        }
        setSubmitting(true);
        try {
            const response = await fetch(`${API_BASE}/api/wardrobe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: Math.floor(Math.random() * 1000000),
                    user_id: Math.floor(Math.random() * 1000000),
                    item_name: formData.item_name.trim(),
                    clothing_type: formData.clothing_type.trim(),
                    warmth_rating: warmth,
                    price,
                }),
            });
            if (!response.ok) throw new Error("Failed to add item");
            setFormData({ item_name: "", clothing_type: "", warmth_rating: "", price: "" });
            await fetchWardrobe();
        } catch (error) {
            setFormError("Failed to add item. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const warmthColor = (rating) => {
        if (rating <= 3) return "#bfdbfe";
        if (rating <= 6) return "#fde68a";
        return "#fca5a5";
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>My Wardrobe</h1>
            <p style={{ color: "#666", marginBottom: "2rem" }}>Add and manage your clothing items.</p>

            <div style={{
                background: "#f8fafc", border: "1px solid #e2e8f0",
                borderRadius: "12px", padding: "1.5rem", marginBottom: "2.5rem",
            }}>
                <h2 style={{ marginTop: 0, fontSize: "1.2rem" }}>Add New Item</h2>
                <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <input type="text" placeholder="Item Name" value={formData.item_name}
                        onChange={(e) => setFormData({ ...formData, item_name: e.target.value })} style={inputStyle} />
                    <input type="text" placeholder="Clothing Type (e.g. jacket)" value={formData.clothing_type}
                        onChange={(e) => setFormData({ ...formData, clothing_type: e.target.value })} style={inputStyle} />
                    <input type="number" placeholder="Warmth Rating (1–10)" value={formData.warmth_rating}
                        onChange={(e) => setFormData({ ...formData, warmth_rating: e.target.value })} style={inputStyle} />
                    <input type="number" placeholder="Price ($)" value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })} style={inputStyle} />
                    {formError && (
                        <p style={{ color: "red", margin: 0, gridColumn: "1 / -1", fontSize: "0.9rem" }}>{formError}</p>
                    )}
                    <button type="submit" disabled={submitting} style={{
                        gridColumn: "1 / -1", padding: "0.75rem",
                        background: submitting ? "#94a3b8" : "#1e293b",
                        color: "white", border: "none", borderRadius: "8px",
                        fontSize: "1rem", cursor: submitting ? "not-allowed" : "pointer",
                    }}>
                        {submitting ? "Adding..." : "Add Item"}
                    </button>
                </form>
            </div>

            <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                Your Items <span style={{ color: "#94a3b8", fontWeight: 400 }}>({wardrobe.length})</span>
            </h2>
            {wardrobe.length === 0 ? (
                <p style={{ color: "#94a3b8" }}>No wardrobe items yet. Add one above!</p>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
                    {wardrobe.map((item) => (
                        <div key={item.id} style={{
                            background: "white", border: "1px solid #e2e8f0",
                            borderRadius: "12px", padding: "1.25rem",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                        }}>
                            <div style={{
                                display: "inline-block", padding: "2px 10px",
                                borderRadius: "99px", fontSize: "0.75rem", fontWeight: 600,
                                marginBottom: "0.5rem", background: warmthColor(item.warmth_rating),
                            }}>
                                Warmth {item.warmth_rating}/10
                            </div>
                            <h3 style={{ margin: "0 0 0.25rem", fontSize: "1rem" }}>{item.item_name}</h3>
                            <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>{item.clothing_type}</p>
                            <p style={{ margin: "0.5rem 0 0", fontWeight: 600 }}>${item.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const inputStyle = {
    padding: "0.6rem 0.75rem", border: "1px solid #cbd5e1",
    borderRadius: "8px", fontSize: "0.95rem", outline: "none",
    width: "100%", boxSizing: "border-box",
};

export default Outfit;