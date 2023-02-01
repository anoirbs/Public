import React from 'react'
import { useState } from 'react';
function Pollution() {
 const [givenCity, setgivenCity] = useState('');   
  const [airQuality, setAirQuality] = useState({});
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
  // on form submit the fuction fetches the air-quality api based on the values in the input
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch('/air-quality?latitude=${latitude}&longitude=${longitude}');
        const data = await res.json();
        setAirQuality(data);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    }
    
  
    return (
      <div >
        <div  >
        <div class="card bg-light mb-3" style={{maxWidth: "100%", display: "flex", justifyContent: "center"}}>
  <div class="card-header"><h5 style={{display: "flex", justifyContent: "center"}}><b>Coordinates</b></h5></div>
  <div class="card-body">
  
    <p class="card-text"> Insert gps coordinates</p>
    <form >
  <div class="form-group">
    {/* Latitude input */}
    <label for="formGroupExampleInput"> Latitude</label>
    <input type="text" class="form-control form-control-lg" id="formGroupExampleInput" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
  </div>
  <div class="form-group">
    {/* Longitude input */}
    <label for="formGroupExampleInput2" >Longitude</label>
    <input type="text" class="form-control form-control-lg" id="formGroupExampleInput2" placeholder="Longitude"value={longitude} onChange={(e) => setLongitude(e.target.value)}/>
  </div>
  <div className='form-group'>
    {/* submit button calls the handlesubmit function */}
    <button class="btn btn-primary" onClick={handleSubmit} style={{margin:'4px',display:'flex',align:'center'}}>Submit</button>
  </div>
</form>
  </div>
</div>
</div>
<div class="card bg-light mb-3" style={{maxWidth: "100%", display: "flex", justifyContent: "center"}}>
<div class="card-header"><h5 style={{display: "flex", justifyContent: "center"}}><b>Pollution rates</b></h5>
</div>
  <div class="card-body">
  {airQuality && airQuality.Result && (
<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Ts</th>
      <th scope="col">Aquis</th>
      <th scope="col">Mainus</th>
      <th scope="col">Aqicn</th>
      <th scope="col">Maincn</th>
    </tr>
  </thead>
  <tbody><tr>
    <td> {airQuality.Result.Pollution.ts} </td>
                        <td>{airQuality.Result.Pollution.ts}</td>
                        <td> {airQuality.Result.Pollution.mainus}</td>
                        <td>{airQuality.Result.Pollution.aqicn} </td>
                        <td>{airQuality.Result.Pollution.maincn}</td>
                        </tr>
  </tbody>
</table>
)}

    </div> 
  </div>
      </div>
    );
  }
  


export default Pollution
