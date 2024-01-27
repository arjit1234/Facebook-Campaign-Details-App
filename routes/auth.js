const express = require('express');
const axios = require('axios');
const router = express.Router();
const session = require('express-session');
const app = express();
const APP_ID = '499155708696600';
const APP_SECRET = '40c7b6d557bb98ba7fb33ac46d37629d';
const REDIRECT_URI = 'https://977e-125-99-206-196.ngrok-free.app/auth/facebook/callback';

router.get('/login', (req, res) => {
    const url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;
    console.log(url)
    res.redirect(url);
  });

  router.get('/auth/facebook/callback', async (req, res) => {
    const { code } = req.query;
    console.log(code)
  
    try {
     
      const { data } = await axios.get(`https://graph.facebook.com/v19.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`);
    
      const { access_token } = data;
      console.log(access_token);
    
      const { data: profile } = await axios.get(`https://graph.facebook.com/v19.0/me?fields=id%2Cname&access_token=${access_token}`);
  
      
      console.log(profile)
      return res.status(200).json({"access_token": access_token})
  
      // res.redirect('/');
    } catch (error) {
      console.error('Error:', error);
      res.redirect('/login');
    }
  });
  app.use(session({
    secret: '40c7b6d557bb98ba7fb33ac46d37629d',
    resave: false,
    saveUninitialized: true
  }));
  
  // Logout route
  router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/login');
    });
   
  });
  
  module.exports = router;
