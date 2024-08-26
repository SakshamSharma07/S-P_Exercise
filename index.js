const express = require("express");
const axios = require("axios");
const cors=require("cors");


const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const FLicker_Api_Url ="https://api.flickr.com/services/feeds/photos_public.gne?nojsoncallback=1"

//Routes 

app.get("/api/images", async( req, res)=>{
    const {tags} = req.query;
    if(!tags)
    {
        return res.status(400).json({error: "tags parameter is Required"});
    }
    try{
        const response = await axios.get(`${FLicker_Api_Url}/tags=${tags}`);
        const images = response.data.items.map((item)=>({
            title:item.title,
            link:item.link,
            media:item.media.m,
            dateTaken:item.data_taken,
        }));

        res.json(images);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({error : "Falied to fetch images from Flicker"});
    }
})

app.listen(PORT, ()=>{
    console.log("Server is running");
});
