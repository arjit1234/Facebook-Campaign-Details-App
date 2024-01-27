
const axios = require('axios');
const router = require('../routes/api');

async function getadAccount(apiUrl){
    try{
        const response =  await axios.get(apiUrl);
        
        return response.data.data;
    }catch(error){
        return {"error": error.response.data.error.message};
    }
}
module.exports =  getadAccount