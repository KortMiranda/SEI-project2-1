import React,{useState,useEffect} from 'react'
import { Route,useHistory } from "react-router-dom"
import './App.css';
import Header from './components/Header'
import DashBoard from './components/DashBoard'
import axios from 'axios'

function App() {
  const [nameToDomainData, setNameToDomain] = useState({})
  const [newsData, setNewsData] = useState({})
  const [stockData, setStockData] = useState({})
  const [stockPriceDailyData, setStockPriceDailyData] = useState({})
  const [bingData, setBingData] = useState({})
  const [competitors, setCompetitors] = useState({})
  const [tweets, setTweets] = useState({})
  const [keyword, setKeyword] = useState('');
  const [corpSuggestion, setCorpSuggestion] = useState('')
  const [tweetAnalysis, setTweetAnalysis] = useState([])
  const history = useHistory();

  const getKeyword =(e)=>{
    setKeyword(e.target.value)
    let suggestCompany = document.querySelector('.suggestionBox')
      if(suggestCompany !== null){
        suggestCompany.style.display ='none'
      }      
  }

  const submitKeyword =(e)=>{
    if(e.key ==='Enter'){
      let suggestCompany = document.querySelector('.suggestionBox')
      if(suggestCompany !== null){
        suggestCompany.style.display ='block'
      }      
      axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=2NYHPFYFHLZKMAKG`)
      .then(res=>res.data)
      .then(data=>{
        setCorpSuggestion(data)
      })
    }
  }

  const getData =(e)=>{
    e.preventDefault();
    
    let suggestCompany = document.querySelector('.suggestionBox')
      if(suggestCompany !== null){
        suggestCompany.style.display ='none'
      }   

    const symbol = e.target.querySelector('.symbol').innerText
    axios.get(`/analyzeToneTweets?keyword=${keyword}`)
    .then(res=>setTweetAnalysis(res))
    axios.get(`/tweets?keyword=${keyword}`)
    .then(res=>res.data)
    .then(data=>setTweets(data))
    axios.get(`/competitors?keyword=${keyword}`)
    .then(res=>res.data)
    .then(data=>data.suggestionGroups[0].searchSuggestions)
    .then(searchSuggestions=>setCompetitors(searchSuggestions))
    axios.get(`/nameToDomain?keyword=${keyword}`)
    .then(res=>setNameToDomain(res.data))
    axios.get(`/stock?keyword=${keyword}&symbol=${symbol}`)
    .then(res=>setStockData(res.data))
    axios.get(`/stockPriceDaily?keyword=${keyword}`)
    .then(res=>setStockPriceDailyData(res.data))
    axios.get(`/news?keyword=${keyword}`)
    .then(res=>res.data)
    .then(data=>data.value)
    .then(value=>setNewsData(value))
    axios.get(`/searchKeywords?keyword=${keyword}`)
    .then(res=>setBingData(res.data))
  }
  return (
    <div className="App">
      <Header keyword={keyword} getKeyword={getKeyword} submitKeyword={submitKeyword} corpSuggestion={corpSuggestion}getData={getData}></Header>
      <DashBoard
        nameToDomainData={nameToDomainData}
        newsData={newsData}
        stockData={stockData}
        stockPriceDailyData={stockPriceDailyData}
        bingData={bingData}
        competitors={competitors}
        tweets={tweets}
        tweetAnalysis={tweetAnalysis}
      ></DashBoard>
    </div>
  );
}

export default App;
