import React from "react";
import './card.css';

function CheckCode(props) {
    let src='';
    if(props?.data?.countryCode.length) {
        src = `https://www.countryflags.io/${props?.data?.countryCode[0].alpha2Code.toLowerCase()}/shiny/64.png`
    }
    return (
        <img src={src} alt="flag" />
    )
}
function Card(props) {
    
    return (
      <div className="card">
        {CheckCode(props)}
        <div className="center"><b>{props?.data?.country_name}</b></div>
        <div className="row"><span>Total Cases</span><span>{props?.data?.cases}</span></div>
        <div className="row"><span>Active</span><span>{props?.data?.active_cases}</span></div>
        <div className="row"><span>Recovered</span><span>{props?.data?.total_recovered}</span></div>
        <div className="row"><span>Deaths</span><span>{props?.data?.deaths}</span></div>
        <div className="row"><span>New Cases</span><span>{props?.data?.new_cases}</span></div>
        <div className="row"><span>New Deaths</span><span>{props?.data?.new_deaths}</span></div>
      </div>
    );
}
export default Card;