//import necessary stuffs//
const express = require('express')
const PORT = process.env.PORT || '5000'
const app = express()
const axios = require('axios')
var clearbit = require('clearbit')('sk_aff75403c45c91bfebca0aa249420861')
const https = require('https')
const { v4: uuidv4 } = require('uuid');
const OAuth = require('oauth')
const got = require('got')
const { promisify } = require('util')
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const { resolve } = require('path')

var translate_endpoint = "https://api.cognitive.microsofttranslator.com";
var translate_location = "global";
const SEARCH_API_KEY = '419c708194f04c6fa228a8c05177916b'
if (!SEARCH_API_KEY) {
  throw new Error('AZURE_SEARCH_API_KEY is not set.')
}
var TRANSLATE_API_KEY = "6655b1e7cd364f25813396208f0da1af";
if (!TRANSLATE_API_KEY) {
  throw new Error('AZURE_TRANSLATE_API_KEY is not set.')
}

// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000'​, 'http://localhost:5000'​, 'https://pure-beach-49281.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))


///////// getNews
async function newsSearch(query) {
  const hostname = 'api.bing.microsoft.com'
  const path = '/v7.0/news/search?q='
  return await got(`https://${hostname}${path}${encodeURIComponent(query)}`,{headers:{ 'Ocp-Apim-Subscription-Key': SEARCH_API_KEY }}).then((res) => JSON.parse(res.body))
}

/////////functino to get competitors
let get_suggestions = async (query) => {
  let host = 'api.bing.microsoft.com';
  let path = '/v7.0/Suggestions';
  let mkt = 'en-US';
  let params = '?mkt=' + mkt + '&q=' + query;
  let request_params = {
    method : 'GET',
    hostname : host,
    path : encodeURI(path + params),
    headers : {
      'Ocp-Apim-Subscription-Key' : SEARCH_API_KEY,
    }
  };
  return await got(`https://${host}`,request_params).then(response=>response.body)
}
/////////


///users keyword 
async function bingWebSearch(query) {
    let request_params = {
      hostname: 'api.bing.microsoft.com',
      path:     '/v7.0/search?q=' + encodeURIComponent(query),
      headers:  { 'Ocp-Apim-Subscription-Key': SEARCH_API_KEY },
    }
    return await got(`https://${request_params.hostname}`, request_params)
    .then(response=>response.body)
  }
 ///////


///////// Tone Analyzer
const toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-2',
    authenticator: new IamAuthenticator({
      apikey: 'Dqy3StOP63o3ICugoVc43vbff0ykBJoc5JOR31-KDYQZ',
    }),
    serviceUrl: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/a98e7cc7-c7dd-4acf-89b5-28963fdd75fe',
    disableSslVerification: true,
  });
  
  const toneParams =(text)=> {
    const toneParams = {
      toneInput: { 'text': text },
      contentType: 'application/json',
    }
    return toneParams
  };

///////// get Tweetes based on keyword
async function getTwitterUserProfileWithOAuth2 (username = 'gopro') {
  var oauth2 = new OAuth.OAuth2(
    'ZCW311jiQhyB4zOzII3RYC8uD',
    '7mfa4w3H44NCPdMNywWfFlGXS6lvmUdbMWzfhcCvn1lX9Hbagd',
    'https://api.twitter.com/', null, 'oauth2/token', null
  )
  const getOAuthAccessToken = promisify(oauth2.getOAuthAccessToken.bind(oauth2))
  const accessToken = await getOAuthAccessToken('', { grant_type: 'client_credentials' })

  return got(`https://api.twitter.com/2/tweets/search/recent?place.fields=country&tweet.fields=lang&max_results=10&query=${username}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then((res) => JSON.parse(res.body))
}

/////////translate the tweets to english

const translator = async(text, lang)=>{
  return axios({
      baseURL: translate_endpoint,
      url: '/translate',
      method: 'post',
      headers: {
          'Ocp-Apim-Subscription-Key': TRANSLATE_API_KEY,
          'Ocp-Apim-Subscription-Region': translate_location,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
      },
      params: {
          'api-version': '3.0',
          'from': lang,
          'to': 'en'
      },
      data: [{
          'text': text
      }],
      responseType: 'json'
  }).then(response=>response.data)
}
/////////

/////////get stockData
/////////
/////////get stockPriceDailyData
/////////
/////////
/////////

app.get('/tweets', (req, res) => {
  getTwitterUserProfileWithOAuth2(req.query.keyword)
  .then((response) => response.data)
  .then((data) => {
    res.send(data)
  })
})
app.get('/analyzeToneTweets', (req, res) => {
  getTwitterUserProfileWithOAuth2(req.query.keyword)
  .then((response) => response.data)
  .then((data) => data.map(item=>item.text))
  .then((data)=>{
    return Promise.all(data.map((text,index)=>
        toneAnalyzer.tone(toneParams(text)).then(toneAnalysis =>toneAnalysis.result)))
  }).then(
    data=>res.send(data)
  )
})

app.get('/searchKeywords', (req, res) => {
  bingWebSearch(req.query.keyword)
  .then(data=>res.send(data))
  })
app.get('/news', (req, res) => {
    newsSearch(req.query.keyword)
    .then(data=>{
      res.send(data)
    })
})
app.get('/stock', (req,res)=>{
  let stockURL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${req.query.symbol}&apikey=VI014QR6LG2UBULR
  `
  axios.get(stockURL)
  .then(response=>{
      res.send(response.data)
  }).catch(err=>console.log(err))
})
app.get('/stockPriceDaily', (req,res)=>{
  let stockPriceDailyURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.query.symbol}&apikey=VI014QR6LG2UBULR
  `
  axios.get(stockPriceDailyURL)
  .then(response=>{
    res.send(response.data)
  })
})
app.get('/nameToDomain', (req,res)=>{
  
    clearbit.NameToDomain.find({name:req.query.keyword})
    .then(response=>{
        res.send(Object.assign({},response))
    })
    .catch(err=>console.log(err));
})
app.get('/competitors', (req,res)=>{
  get_suggestions(`${req.query.keyword} vs `)
  .then(data=>{
    res.send(data)
  })
})
app.get('/translate', (req, res) => {
  let lang =(req.query.lang=='in')?'hi':req.query.lang
  translator(req.query.keyword,lang)
  .then(data=>res.send(data))
  .catch(err=>console.log(err))
})

const path = require('path');
if (process.env.NODE_ENV === 'production') {
  /// Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.set("port",PORT)
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})