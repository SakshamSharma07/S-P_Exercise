import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from 'react'
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import image from "./bg.jpg";
import Images from "./Images";



export default function Home() {

const [tags, setTages] = useState('');
const [images, setImages] = useState([]);
const [loading, setLoading] = useState(false);
const [ error, setError] = useState('');
const [ fetchMode, setFetchMode] = useState('append');

const backend = 'http://localhost:4000/api/'

const fetchImages = async()=>{
    if(!tags)
    {
        setError('PLease enter tags to search');
        return ;
    }
    setLoading(true);
    setError("");
    try{
        const response = await fetch(`${backend}/images?tags=${tags}`);
        const data = await response.json();

        if(response.ok){
            if(fetchMode === 'append')
            {
                setImages((prevImages)=>[... prevImages, ...data]);
            }
            else{
                setImages(data);
            }
        }
        else{
            setError(data.error || 'Failed to fetch');
        }
    }
    catch(error){
        setError('Failed to fetch images');
    }
    finally{
        setLoading(false);
    }
}
  return (
    <Stack direction={"row"} p={0} m={0} width={"100%"} display={"flex"}>
      <Box
        width={'50vh'}
        p={0}
        height={"100vh"}
        sx={{
          backgroundColor: "#232c37",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          gap: 3,
        }}
      >
        <img
          width={300}
          style={{ paddingTop: "30px" }}
          src="https://www.cappitech.com/wp-content/uploads/2021/01/cappitech-alt-logo.svg"
          alt=""
        />

        <Stack direction={"column"} gap={2}>
          <Stack
            direction={"column"}
            p={1}
            sx={{ backgroundColor: " #eeeeee" }}
            height={120}
            width={"270px"}
            justifyContent={"space-between"}
          >
            <form style={{paddingTop:5}}>
              <input
                value={tags}
                onChange={(e)=> setTages(e.target.value)}
                style={{ marginRight: 5 }}
                type="text"
                id="fetch-tags"
                placeholder="Type one or more tags to fetch"
                name="tags"
              />
              <button id="fetch-button" type="button" onClick={fetchImages} disabled={loading}>
                Fetch
              </button>
            </form>


            <div className="fetchMode">
                <label>
                    <input type='radio' name="fetch-mode" value="append"
                    checked ={fetchMode === 'append'}
                    onChange={()=>setFetchMode('append')}/>
                    Append
                </label>

                <label>
                    <input type='radio' name="fetch-mode" value="replace"
                    checked ={fetchMode === 'replace'}
                    onChange={()=>setFetchMode('replace')}/>
                    Replace
                </label>
            </div>
           <Box sx={{display:'flex', flexDirection:'row', alignItems:"baseline", width:'100%'}}><p style={{textDecoration:'underline', cursor:'pointer'}}>Clear text</p></Box>
          </Stack>

          <Divider />
          <form style={{paddingTop:5}}>
              <input
                style={{ width:"270px" }}
                type="text"
                id="fetch-tags"
                placeholder="Type to search for the image"
                name="tags"
              />
            </form>

        <Stack direction={'row'} sx={{alignItems:'center'}} gap={1}>
            <Typography color={"white"}>Sort by Title: </Typography>
            <Button sx={{backgroundColor:'white', color:'black'}}>ASC</Button>
            <Button sx={{backgroundColor:'white', color:'black'}}>DSC</Button>
        </Stack>
        </Stack>
      </Box>

      <Box 
      width={'100%'}
      p={0}
      height={"100vh"}
      sx={{
        backgroundImage:`url(${image})`,
        backgroundSize:'center',
        backgroundPosition:'cover',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}>
        {/* {images.size()==0 && <p>There is no images to be dislayed</p>} */}
      </Box>
    </Stack>
  );
}
