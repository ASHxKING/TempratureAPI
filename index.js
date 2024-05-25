import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", async (req, res) => {
    res.render("index.ejs")
   
  });

  app.post("/",async (req,res)=>{
    const cityname = req.body.State
    console.log()
    try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${process.env.APIkey}`
        );
        console.log(response.data.main.temp)
        res.render("index.ejs",{temprature:response.data.main.temp});
      } catch (error) {
        console.log(error.response.data);
        res.status(500);
      }
  }
  )

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });