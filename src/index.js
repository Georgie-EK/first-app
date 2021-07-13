import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { obvervalbe } from './App';
import './index.css';
import App from './App';
import moment from "moment"

const Test = () => {

  const [respData, setRespData] = useState([])
  const [isUnMute, setIsUnMute] = useState(false)
  //const [respData2, setRespData2] = useState([])

  useEffect(()=> {
    fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=307&date="+moment().format('DD-MM-YYYY'))
    .then(response=> response.json())
    .then(data=> setRespData(data.centers.filter(center=> center.sessions.filter(session => (session.min_age_limit === 45|| session.allow_all_age) && session.available_capacity_dose2 > 0 && session.vaccine==="COVISHIELD" ).length > 0)
    .map(center =>(
      {...center ,
        session : center.sessions.filter(session => (session.min_age_limit === 45|| session.allow_all_age) && session.available_capacity_dose2 > 0 && session.vaccine==="COVISHIELD"),
      }
      ))
      ))

    const instance  = setInterval(()=>{
      fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=307&date="+moment().format('DD-MM-YYYY'))
    .then(response=> response.json())
    .then(data=> setRespData(data.centers.filter(center=> center.sessions.filter(session => (session.min_age_limit === 45|| session.allow_all_age) && session.available_capacity_dose2 > 0 && session.vaccine==="COVISHIELD" ).length > 0)
    .map(center =>(
      {...center ,
        session : center.sessions.filter(session => (session.min_age_limit === 45|| session.allow_all_age) && session.available_capacity_dose2 > 0 && session.vaccine==="COVISHIELD"),
      }
      ))
      ))
    },10000);

      return ()=>{
        console.log("clearing",instance);
        clearTimeout(instance);
      }

      // fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=307&date="+moment().add(1,"day").format('DD-MM-YYYY'))
      // .then(response=> response.json())
      // .then(data=> setRespData2(data.centers.filter(center=> center.sessions.filter(session => session.min_age_limit === 45 && session.available_capacity_dose2 > 0 && session.vaccine==="COVISHIELD" ).length > 0)
      // .map(center =>(
      //   {...center ,
      //     session : center.sessions.filter(session => session.min_age_limit === 45 && session.available_capacity_dose2 > 0   && session.vaccine==="COVISHIELD"),
      //   }
      //   ))
      //   ));

    
  },[])
  
  useEffect(()=>{
   if(isUnMute && respData?.length>0){ var audio = new Audio('https://audio-previews.elements.envatousercontent.com/files/181619625/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22FM9B3TC-alarm.mp3%22');
 
    audio.play();}
  },[respData, isUnMute])

  const play = () => {
    setIsUnMute(s=>!s)
  }

  return (
    <div className="py-20 px-14" style={{textAlign:"center"}}>
   <div className="flex flex-row items-center justify-center"><label className="pr-4">Play Audio:</label>
   <label className="switch">
  <input type="checkbox" checked={isUnMute} onChange={play}/>
  <span className="slider round"></span>
</label>
</div>
<div className="pt-6">{moment().format('DD-MM-YYYY')}</div>
    {
      respData.map((data,i) => (
        <div key={i} style={{display:"grid", gridTemplateColumns:"2fr 4fr 2fr 1fr 2fr"}} className="bg-green-300">
          <div  className="box">{data.name}</div>
          <div className="box">{data.address}</div>
          <div className="box">{data.block_name}</div>
          <div className="box">{"Doses: "+data.session[0]?.available_capacity_dose2}</div>
          <div className="box">{"Date:  " + data.session[0]?.date}</div>
        </div>
      ))
    }

<div className="pt-6">{moment().add(1,"day").format('DD-MM-YYYY')}</div>
    {
      respData.map((data,i) => (
       <>{ data.session[1] &&<div key={i} style={{display:"grid", gridTemplateColumns:"2fr 4fr 2fr 1fr 2fr"}} className="bg-green-300">
          <div  className="box">{data.name}</div>
          <div className="box">{data.address}</div>
          <div className="box">{data.block_name}</div>
          <div className="box">{data.session[1]?.available_capacity_dose2}</div>
          <div className="box">{"Date :  " + data.session[1]?.date}</div>
        </div>} </>
      ))
    }

<div className="pt-6">{moment().add(2,"day").format('DD-MM-YYYY')}</div>
    {
      respData.map((data,i) => (
      <> { data.session[2] && <div key={i} style={{display:"grid", gridTemplateColumns:"2fr 4fr 2fr 1fr 2fr"}} className="bg-green-300">
          <div  className="box">{data.name}</div>
          <div className="box">{data.address}</div>
          <div className="box">{data.block_name}</div>
          <div className="box">{data.session[2]?.available_capacity_dose2}</div>
          <div className="box">{"Date :  " + data.session[2]?.date}</div>
        </div>}</>
      ))
    }
{/* <App /> */}
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Test/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

