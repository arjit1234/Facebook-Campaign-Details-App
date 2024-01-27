
const axios = require('axios');
const router = require('../routes/api');


// const accessToken = 'EAAHRvxMtMJYBAJPT5Qp0S4Ioj7LQAzkIpDjthatC3fK3p89DNH6FwYdYg0UXgk9TwptYz314uXMyZApXuKqXyOyeAWJJaHWSvD4f6g5V8qE0t0ZApIFxZAr8CxjWfHLSNdqf9VoOin8mUNXHs90ZB84E4dkoIK8TeqfLsLzZBhowbCUtkCXFMLuiLoTpmW0v6lB6UvxCkz4Y2ZC1aHRUKNztbaDfl1rq0WNQ6WweDPpAZDZD';
// const campaignId = '23851955608520237'
// Construct the URL
// const apiUrl = `https://graph.facebook.com/v13.0/${campaignId}?fields=id,name,status,objective,start_time,end_time,budget,insights.metric(impressions,clicks,spend,ctr,cpc,cpm,actions,reach,conversion_values),adsets{id,name,campaign_id,insights.metric(impressions,clicks,spend,ctr,cpc,cpm,actions,reach,conversion_values),ads{id,name,adset_id,insights.metric(impressions,clicks,spend,ctr,cpc,cpm,actions,reach,conversion_values)}}&access_token=${accessToken}`;

// const apiUrl = `https://graph.facebook.com/v18.0/me/adaccounts?fields=name&access_token=${accessToken}`

async function getadAccount(apiUrl){
    try{
        const response =  await axios.get(apiUrl);
        // console.log(response);  
        // const res = await response.json();
        
        return response.data.data;
    }catch(error){
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }
}
// axios.get(apiUrl)
//   .then(response => {
//     // Handle successful response

//     return response.data;
//   })
//   .catch(error => {
//     // Handle error
//     console.error('Error fetching data:', error.response ? error.response.data : error.message);
//   });

module.exports =  getadAccount