const express = require('express');
const fetchData = require('../middleware/helper')
const fetchAccessToken = require('../middleware/authuser')
const router = express.Router();
var accessToken = 'EAAHRvxMtMJYBAJPT5Qp0S4Ioj7LQAzkIpDjthatC3fK3p89DNH6FwYdYg0UXgk9TwptYz314uXMyZApXuKqXyOyeAWJJaHWSvD4f6g5V8qE0t0ZApIFxZAr8CxjWfHLSNdqf9VoOin8mUNXHs90ZB84E4dkoIK8TeqfLsLzZBhowbCUtkCXFMLuiLoTpmW0v6lB6UvxCkz4Y2ZC1aHRUKNztbaDfl1rq0WNQ6WweDPpAZDZD';

router.get("/fetch/adaccounts",  (req,res) => {
    try{

        fetchAccessToken(req, res).then((res1) => {
            if(res1.access_token){
                return res1.access_token
            }
            else{
                return res.status(500).json(res1);
            }
        }).then((token)=> {
            if(token){
                accessToken = token;
            }
                
        
            let adaccountsUrl = `https://graph.facebook.com/v18.0/me/adaccounts?fields=id,name&access_token=${accessToken}`;
            fetchData(adaccountsUrl).then((res3) => {
                if(res3.error){
                    return res.status(500).json(res3);
                }
                else{
                    return res.render('adaccount',{res:res3});
                }
            });
        });
        
    }catch(error){  
        console.log(error)
    }
})

router.get("/fetch/campaign/:adaccount_id", (req,res) => {
    try{
        let campaingsUrl = `https://graph.facebook.com/v18.0/${req.params.adaccount_id}/campaigns?fields=name,id&access_token=${accessToken}`;

        fetchData(campaingsUrl).then(res1 => {
            if(res1.error){
                return res.status(500).json(res1);
            }
            else{
                return res.status(200).json(res1);
            }
        });
    }catch(error){  
        console.log(error)
    }
})
router.get("/fetch/adsets/:campaign_id", (req,res) =>{
    try{
        let adsetsUrl = `https://graph.facebook.com/v18.0/${req.params.campaign_id}/adsets?fields=name,id&access_token=${accessToken}`;

        fetchData(adsetsUrl).then(res1 => {
            if(res1.error){
                return res.status(500).json(res1);
            }
            else{
                return res.status(200).json(res1);
            }

        })

    }catch(error){
        console.log(error);
    }
})
router.get("/fetch/insights/:adset_id", (req,res) =>{
    try{
        let insightsUrl = `https://graph.facebook.com/v18.0/${req.params.adset_id}/insights?time_range={'since':'2022-01-01','until':'2022-11-01'}&fields=clicks,impressions,spend,reach,conversions,cost_per_conversion,cost_per_unique_click,cpc,cpm,cpp,ctr,purchase_roas,video_avg_time_watched_actions&access_token=${accessToken}`

        fetchData(insightsUrl).then(res1 => {
            if(res1.error){
                return res.status(500).json(res1);
            }
            else{
                return res.status(200).json(res1);
            }

        })
    }catch(error){
        console.log(error);
    }
})
module.exports = router