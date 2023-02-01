
const { response } = require('express');
const express = require('express');
const mongoose =require('mongoose')
const Resultt = require('./models/Result')
const app = express();
const request = require('request');
const uri ="mongodb://127.0.0.1:27017/Results";
const cron = require('cron');
app.use(express.json())
async function connectdb(){
    try{
        await mongoose.connect(uri);
        console.log('connected to mongodb')
    }
    catch(e){
        console.log("e");
    }
}
connectdb();
// fonction pour sauveguarder les donnee du gouvernerat de tunis
function saveMonastir() {
    
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const url = 'https://api.iqair.com/v2/nearest_city?lat=$35.767923&lng=$10.822628&key=f6ad6585-59bc-4198-8a61-2b502eca3b6a';
        const apikey ='f6ad6585-59bc-4198-8a61-2b502eca3b6a';
        request(url , {json:true},async(e ,response,body)=>{
            if (e){
                return res.status(500).json({error: e.message});
    
            }else{
                const par = (body.data.current.pollution)
                const result = new Resultt(par)
                const saved = await result.save();
                
                console.log("saving data")
    
    
            }
        })
    
}
//test de l api Nearest Loction
app.get('/nloc',async(req,res)=>{
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const url = 'http://api.airvisual.com/v2/nearest_city?key=f6ad6585-59bc-4198-8a61-2b502eca3b6a';
    const apikey ='f6ad6585-59bc-4198-8a61-2b502eca3b6a';
    request(url , {json:true},(e ,response,body)=>{
        if (e){
            return res.status(500).json({error: e.message});

        }else{
            console.log(body)
            res.status(200).json({body})
            console.log(body)      }
    })
})
// api qui retourne les donnee du polution d une poition determine par des valeurs de longitudes et altitude
app.get('/air-quality', async(req,res)=>{
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const{longitude,latitude} = await req.query;
    const apiurl ='https://api.iqair.com/v2/nearest_city?lat=${latitude}&lng=${longitude}&key=f6ad6585-59bc-4198-8a61-2b502eca3b6a';
    
    request(apiurl , {json:true},(e,res,body)=>{
        if (e){
            return res.status(500).json({error: e.message});

        }else{
            console.log(apiurl)
            console.log(body)
            res.status(200).json({
                Result:{
                    Pollution:
                body.data.current.pollution
            } 
        })
        }
    })
})
// cron job pour planifier le sauvegaurdage chaque minute 
const checkMonastirZone =new cron.CronJob('* * * * *',saveMonastir); //* * * * * indique une minute
checkMonastirZone.start();
app.listen(5000,()=>{console.log('server working on port 5000')})