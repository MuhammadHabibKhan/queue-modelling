import './index.css';
import FadeIn from 'react-fade-in';
import Button from '../Button';
import ServerField from '../ServerField';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function NextScreen() {

    const location = useLocation();
    const arrivalDist = location.state?.arrivalDist;
    const serviceDist = location.state?.serviceDist;
    const servers = location.state?.serverNumber;
    const navigate = useNavigate();
    const backClick = () => navigate('/');

    let serviceVar = false;
    let arrivalVar = false;
    let serviceName = 'Variance Service';
    let arrivalName = 'Variance Arrival';
    let displayServiceVar = 'flex';
    let displayArrivalVar = 'flex';
    let iaMean = 'Inter Arrival Mean';
    let sMean = 'Service Mean';
    let marginLeftContainer = '0%'
    let marginLeftArrival = '0%'
    let displayArrivalMean = 'flex';
    let displayServiceMean = 'flex';

    // M/M/C
    if ( ((arrivalDist === 'Poisson') || (arrivalDist ==='Exponential')) && ((serviceDist === 'Exponential') || (serviceDist === 'Poisson'))){
      serviceVar = true;
      arrivalVar = true;
      displayServiceVar = 'none';
      displayArrivalVar = 'none';
    }
    // M / G / C

    // M/Normal/C
    if ( ((arrivalDist === 'Poisson') || (arrivalDist ==='Exponential')) && ((serviceDist === 'Normal'))){
      arrivalVar = true;
      displayArrivalVar = 'none';
      displayServiceVar = 'flex';
      marginLeftContainer = '20%'

    }

    // M/Gamma/C
    if ( ((arrivalDist === 'Poisson') || (arrivalDist ==='Exponential')) && ((serviceDist === 'Gamma'))){
      // displayArrivalVar = 'none';
      // displayServiceVar = 'none';
      // iaMean = 'Alpha';
      // sMean = 'Beta';
      displayServiceMean = 'none';
      displayArrivalMean = 'flex';
      marginLeftArrival = '21%';
      marginLeftContainer = '4%';
      arrivalName = 'Beta';
      serviceName = 'Alpha';
    }

    // M/Uniform/C
    if ( ((arrivalDist === 'Poisson') || (arrivalDist ==='Exponential')) && ((serviceDist === 'Uniform')) ){
      arrivalName = 'Minimum';
      serviceName = 'Maximum';
      displayServiceMean = 'none';
      marginLeftArrival = '22%';
      marginLeftContainer = '4%';
      serviceVar = false;
      arrivalVar = false;
      displayServiceVar = 'flex';
      displayArrivalVar = 'flex';
    }

    // G / G / C

    // Uniform/Uniform
    if (((arrivalDist === 'Uniform')) && ((serviceDist === 'Uniform'))){
      iaMean = 'Max Arrival';
      sMean = 'Min Arrival';
      arrivalName = 'Min Service';
      serviceName = 'Max Service';
      serviceVar = false;
      arrivalVar = false;
      displayServiceVar = 'flex';
      displayArrivalVar = 'flex';
    }

    // Uniform/Normal
    if (((arrivalDist === 'Uniform')) && ((serviceDist === 'Normal'))){
      iaMean = 'Max Arrival';
      sMean = 'Min Arrival';
      displayArrivalVar = 'flex';
      displayServiceVar = 'flex';
      serviceName = 'Service Mean';
      arrivalName = 'Service Variance';
      serviceVar = false;
      arrivalVar = false;
    }

    // Uniform / Gamma
    if (((arrivalDist === 'Uniform')) && ((serviceDist === 'Gamma'))){
      iaMean = 'Max Arrival';
      sMean = 'Min Arrival';
      displayArrivalVar = 'flex';
      displayServiceVar = 'flex';
      serviceName = 'Alpha';
      arrivalName = 'Beta';
      serviceVar = false;
      arrivalVar = false;
    }

    // Normal / Uniform 
    if (((arrivalDist === 'Normal')) && ((serviceDist === 'Uniform'))){
      sMean = 'Variance Arrival';
      displayArrivalVar = 'flex';
      displayServiceVar = 'flex';
      serviceName = 'Max Service';
      arrivalName = 'Min Service';
      serviceVar = false;
      arrivalVar = false;
    }

    // Normal / Normal 
    if (((arrivalDist === 'Normal')) && ((serviceDist === 'Normal'))){
      displayArrivalVar = 'flex';
      displayServiceVar = 'flex';
      serviceVar = false;
      arrivalVar = false;
    }

    // Normal / Gamma 
    if (((arrivalDist === 'Normal')) && ((serviceDist === 'Gamma'))){
      sMean = 'Variance Arrival'
      displayArrivalVar = 'flex';
      displayServiceVar = 'flex';
      serviceName = 'Alpha';
      arrivalName = 'Beta';
      serviceVar = false;
      arrivalVar = false;
    }

    // Gamma / Uniform 
    if (((arrivalDist === 'Gamma')) && ((serviceDist === 'Uniform'))){
      iaMean = 'Alpha';
      sMean = 'Beta';
      displayArrivalVar = 'flex';
      displayServiceVar = 'flex';
      serviceName = 'Max Service';
      arrivalName = 'Min Service';
      serviceVar = false;
      arrivalVar = false;
    }

    // Gamma / Normal 
    if (((arrivalDist === 'Gamma')) && ((serviceDist === 'Normal'))){
      iaMean = 'Alpha';
      sMean = 'Beta';
      displayArrivalVar = 'flex';
      displayServiceVar = 'flex';
      serviceName = 'Service Mean';
      arrivalName = 'Variance Service';
      serviceVar = false;
      arrivalVar = false;
    }

    // Gamma / Gamma 
    if (((arrivalDist === 'Gamma')) && ((serviceDist === 'Gamma'))){
      iaMean = 'Alpha Arrival';
      sMean = 'Beta Arrival';
      displayArrivalVar = 'flex';
      displayServiceVar = 'flex';
      serviceName = 'Alpha Service';
      arrivalName = 'Beta Service';
      serviceVar = false;
      arrivalVar = false;
    }

    const resultClick = () => navigate('/Result', {state: {rate: rate, mean: mean, varService: varService, varArrival: varArrival, arrivalDist: arrivalDist, serviceDist: serviceDist, servers: servers}});
  
    const [rate, setRate] = useState();
    const changeRate = (e) => {
      setRate(e.target.value);
    }

    const [mean, setMean] = useState();
    const changeMean = (e) => {
      setMean(e.target.value);
    }

    const [varService, setVarService] = useState();
    const changeVarService = (e) => {
      setVarService(e.target.value);
    }

    const [varArrival, setVarArrival] = useState();
    const changeVarArrival = (e) => {
      setVarArrival(e.target.value);
    }

    return (
      <div className="App">
        
        <form className='formBox'>
          <FadeIn transitionDuration='3000'>
            <div className='next'>
                <ServerField name={iaMean} styleContainer={{display: displayArrivalMean, marginLeft: marginLeftArrival}} serverChange={changeRate} style={{ width: '9vw', marginBottom: '10%'}} style2={{marginTop: '20%', textAlign: 'center'}}/>
                <ServerField name={sMean} styleContainer={{display: displayServiceMean}} serverChange={changeMean} style={{ width: '9vw' }} style2={{marginTop: '20%', textAlign: 'center'}}/>
                <ServerField styleContainer={{display: displayServiceVar, marginLeft: marginLeftContainer}} name={serviceName} serverChange={changeVarService} style={{ width: '9vw'}} style2={{marginTop: '20%', textAlign: 'center'}} disabled={serviceVar}/>
                <ServerField styleContainer={{display: displayArrivalVar}} name={arrivalName} serverChange={changeVarArrival} style={{ width: '9vw'}} style2={{marginTop: '20%', textAlign: 'center'}} disabled={arrivalVar}/>
                <Button name="Result" onClick={resultClick}/>
                <Button name="Back" onClick={backClick} style={{marginTop: '6%'}}/>
            </div>
          </FadeIn>  
        </form>
      </div>
    );
  }
  
export default NextScreen;