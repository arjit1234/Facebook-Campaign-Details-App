
const express = require("express");

const axios = require('axios');
const app = express();

const APP_ID = '499155708696600';
const APP_SECRET = '40c7b6d557bb98ba7fb33ac46d37629d';
const REDIRECT_URI = 'https://a2c8-27-6-246-185.ngrok-free.app/api/fetch/adaccounts';

async function getAccessToken(req, res){
    const { code } = req.query;
  
    try {
     
        const { data } = await axios.get(`https://graph.facebook.com/v18.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`);
        
        const { access_token } = data;

        return {"access_token": access_token};
  
    } catch (error) {
      console.error('Error:', error);
      return {"error": error};
    }
}


module.exports =  getAccessToken