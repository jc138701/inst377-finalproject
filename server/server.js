const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require ('dotenv');

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"))
app.use(cors());
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

const PORT = process.env.PORT || 3000;
const weatherRoutes = require("./routes/weatherRoutes");
const wardrobeRoutes = require("./routes/wardrobeRoutes");

app.use("/api/wardrobe", wardrobeRoutes);
app.use("/api/weather", weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})