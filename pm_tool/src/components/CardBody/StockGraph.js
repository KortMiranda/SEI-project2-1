import React,{useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';


  
  const StockGraph = ({stockPriceDailyData}) => {
    const [dailyPrices, setDailyPrices] = useState()
    const [data,setData]= useState({
        labels: [1,2,3,4,5,6],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      })

    useEffect(()=>{
 
        const tempDailyPrices = Object.assign({},stockPriceDailyData['Time Series (Daily)'])
        const tempDailyPricesCloseValue = Object.values(tempDailyPrices).map((item)=>{
          return Object.values(item)[3]
        })
        setDailyPrices(tempDailyPrices)
        setData({
            labels: Object.keys(tempDailyPrices),
            datasets: [
              {
                label: '',
                data: tempDailyPricesCloseValue,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                pointStyle: 'line',
                pointRadius: '0.1',
                pointBorderWidth: '3'
              },
            ],
        })
    },[stockPriceDailyData])
      
      const options = {
        responsive: true,
   maintainAspectRatio: false, 
          plugins:{
            legend:{
              display: false
            },
          },
          layout: {
            x:0

        },
        scales: {
          x: {
            display:false,
            min:0,
              title:{
                display:false
              },
              ticks:{
              
                display:false,
              },
              grid:{
                display:false
              },
          },
          y: {
            display:false,
              title:{
                display:false
              },
              ticks:{
                display:false,
                padding:100
              },
              grid:{
                display:false
              },
            
        },
        },
      };
    return(
      
    <div className="testBox">
      <Line data={data} options={options} />
    </div>
    )
  };
  
export default StockGraph;