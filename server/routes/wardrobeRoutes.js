const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
const dotenv = require ("dotenv");

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get("/", async (req, res) => {
  try{
    
    const {data, error} = await supabase
      .from("wardrobe")
      .select("*");

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: "Failed to fetch wardrobe data" });
  }

    return res.status(200).json({ data });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Failed to fetch wardrobe data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {user_id, item_name, clothing_type, warmth_rating, price } = req.body;

    const { data, error } = await supabase
      .from("wardrobe")
      .insert([
        {
          user_id,
          item_name,
          clothing_type,
          warmth_rating,
          price
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Failed to add wardrobe item" });
  }
});



module.exports = router;