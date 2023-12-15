import './index.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../Button';
import FadeIn from 'react-fade-in/lib/FadeIn';
import ServerField from '../ServerField';


function Result(){

    const navigate = useNavigate();
    const backClick = () => navigate('/');

    const location = useLocation();
    let rate = 1/parseFloat(location.state?.rate);
    let mean = 1/parseFloat(location.state?.mean);
    let varArrival = parseFloat(location.state?.varArrival);
    let varService = parseFloat(location.state?.varService);
    const arrivalDist = location.state?.arrivalDist;
    const serviceDist = location.state?.serviceDist;
    const servers = parseInt(location.state?.servers);
    

    let p = 0;
    let Lq = 0;
    let Wq = 0;
    let Ws = 0;
    let Ls = 0;

    let cs2 = 0;
    let ca2 = 0;

    function Lq_mm1(){
        let lq = (rate*rate)/(mean*(mean-rate));
        return lq;
    }

    function Lq_mg1(){
        let lq = (((rate^2)*varService)+p^2)/(2*(1-p));
        return lq;
    }

    function Lq_gg1(){
        let lq = ( (p*p*(1+cs2))*(ca2+(p*p*cs2)))/(2*(1-p)*(1+(p*p*cs2)));
        return lq;
    }

    function factorial(n) { 
        if (n === 0) { 
            return 1; 
        } 
        else { 
            return n * factorial( n - 1 ); 
        } 
    } 

    function pNot(){
        let denom = 0;
        for (let i = 0; i < servers; i++){
            denom = denom + ( ((servers*p)^i)/factorial(i) + ((servers*p)^servers)/factorial(servers)*(1-p) );
        }
        let pn = 1/denom;
        return pn;
    }

    function Lq_multiServer(){
        let po = pNot();
        let lq = (po*((rate/mean)^servers)*p)/(factorial(servers)*(1-p)^2);
        return lq;
    }
 
    // M/M/1
    if ( (arrivalDist === 'Poisson') && (serviceDist === 'Exponential') && (servers === 1)){
        p = (rate/(servers*mean))
        Lq = Lq_mm1();
        Wq = Lq/rate;
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
        console.log(p, Lq, Wq, Ws, Ls)
    }

    // M/M/C
    if ( (arrivalDist === 'Poisson') && (serviceDist === 'Exponential') && (servers !== 1)){
        p = (rate/(servers*mean))
        Lq = Lq_multiServer();
        Wq = Lq/rate;
        let arrVar = rate;
        let serVar = mean*mean;
        ca2 = arrVar/((1/rate)**2);
        cs2 = serVar/((1/mean)**2);
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
        console.log(p, Lq, Wq, Ws, Ls, ca2, cs2)
    }

    // M/Uniform/1
    if ( (arrivalDist === 'Poisson') && (serviceDist === 'Uniform') && (servers === 1)){
        let min = varArrival;
        let max = varService;
        let serVar = ((max-min)^2)/12;
        varService = serVar;
        mean = (max+min)/2;
        p = (rate/(servers*mean));
        Lq = Lq_mg1();
        Wq = Lq/rate;
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // M/Uniform/C
    if ( (arrivalDist === 'Poisson') && (serviceDist === 'Uniform') && (servers !== 1)){
        let min = varArrival;
        let max = varService;

        let serVar = ((max-min)^2)/12;
        mean = (max+min)/2;
        varService = serVar;

        ca2 = rate/((1/rate)^2);
        cs2 = serVar/((1/mean)^2);
        p = (rate/(servers*mean));

        Lq = Lq_multiServer();
        console.log("lq" + Lq)
        let wqTemp = Lq/rate;
        Wq = wqTemp * ((cs2+ca2)/2)
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // M/Gamma/1
    if ( (arrivalDist === 'Poisson') && (serviceDist === 'Gamma') && (servers === 1)){
        let alpha = varService;
        let beta = varArrival;
        let serVar = alpha*(beta^2);
        varService = serVar; 
        mean = alpha*beta;
        p = (rate/(servers*mean));
        Lq = Lq_mg1();
        Wq = Lq/rate;
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // M/Gamma/C
    if ( (arrivalDist === 'Poisson') && (serviceDist === 'Gamma') && (servers !== 1)){
        let alpha = varService;
        let beta = varArrival;
        let serVar = alpha*(beta^2);
        varService = serVar; 
        mean = alpha*beta;
        ca2 = rate/((1/rate)^2);
        cs2 = serVar/((1/mean)^2);
        p = (rate/(servers*mean));
        Lq = Lq_multiServer();
        let wqTemp = Lq/rate;
        Wq = wqTemp * ((cs2+ca2)/2);
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // M/Normal/1
    if ( (arrivalDist === 'Poisson') && (serviceDist === 'Normal') && (servers === 1)){
        p = (rate/(servers*mean));
        Lq = Lq_mg1();
        Wq = Lq/rate;
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // M/Normal/C
    if ( (arrivalDist === 'Poisson') && (serviceDist === 'Normal') && (servers !== 1)){
        ca2 = rate/((1/rate)^2);
        cs2 = varService/((1/mean)^2);
        p = (rate/(servers*mean));
        Lq = Lq_multiServer();
        let wqTemp = Lq/rate;
        Wq = wqTemp * ((cs2+ca2)/2);
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // G G s

    // Uniform/Uniform/1
    if ( (arrivalDist === 'Uniform') && (serviceDist === 'Uniform') && (servers === 1)){
        
        let maxArrival = rate;
        let minArrival = mean;
        let arrVar = ((maxArrival-minArrival)^2)/12;
        // varArrival = arrVar;
        rate = (maxArrival+minArrival)/2;

        let minService = varArrival;
        varArrival = arrVar;
        let maxService = varService;
        let serVar = ((maxService-minService)^2)/12;
        varService = serVar;
        mean = (maxService+minService)/2;

        ca2 = varArrival/((1/rate)^2);
        cs2 = serVar/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_gg1();
        console.log("lq: " + Lq)
        Wq = Lq/rate;
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // Uniform/Uniform/C
    if ( (arrivalDist === 'Uniform') && (serviceDist === 'Uniform') && (servers !== 1)){
        
        let minArrival = rate;
        let maxArrival = mean;
        let arrVar = ((maxArrival-minArrival)^2)/12;
        // varArrival = arrVar;
        rate = (maxArrival+minArrival)/2;

        let minService = varArrival;
        varArrival = arrVar;
        let maxService = varService;
        let serVar = ((maxService-minService)^2)/12;
        varService = serVar;
        mean = (maxService+minService)/2;

        ca2 = varArrival/((1/rate)^2);
        cs2 = serVar/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_multiServer();
        let wqTemp = Lq/rate;
        Wq = wqTemp * ((cs2+ca2)/2);
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // Uniform/Normal/1
    if ( (arrivalDist === 'Uniform') && (serviceDist === 'Normal') && (servers === 1)){
        
        let minArrival = rate;
        let maxArrival = mean;
        let arrVar = ((maxArrival-minArrival)^2)/12;
        // varArrival = arrVar;
        rate = (maxArrival+minArrival)/2;

        mean = varService;
        varService = varArrival; 
        varArrival = arrVar;       

        ca2 = varArrival/((1/rate)^2);
        cs2 = varService/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_gg1();
        Wq = Lq/rate;
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // Uniform/Normal/C
    if ( (arrivalDist === 'Uniform') && (serviceDist === 'Normal') && (servers !== 1)){
        
        let minArrival = rate;
        let maxArrival = mean;
        let arrVar = ((maxArrival-minArrival)^2)/12;
        // varArrival = arrVar;
        rate = (maxArrival+minArrival)/2;

        mean = varService;
        varService = varArrival;  
        varArrival = arrVar;      

        ca2 = varArrival/((1/rate)^2);
        cs2 = varService/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_multiServer();
        let wqTemp = Lq/rate;
        Wq = wqTemp * ((cs2+ca2)/2);
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // Uniform/Gamma/1
    if ( (arrivalDist === 'Uniform') && (serviceDist === 'Gamma') && (servers === 1)){
        
        let minArrival = rate;
        let maxArrival = mean;
        let arrVar = ((maxArrival-minArrival)^2)/12;
        // varArrival = arrVar;
        rate = (maxArrival+minArrival)/2;

        let alpha = varService;
        let beta = varArrival;
        varArrival = arrVar;
        let serVar = alpha*(beta^2);
        varService = serVar; 
        mean = alpha*beta;        

        ca2 = varArrival/((1/rate)^2);
        cs2 = varService/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_gg1();
        Wq = Lq/rate;
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // Uniform/Gamma/C
    if ( (arrivalDist === 'Uniform') && (serviceDist === 'Gamma') && (servers !== 1)){
        
        let minArrival = rate;
        let maxArrival = mean;
        let arrVar = ((maxArrival-minArrival)^2)/12;
        // varArrival = arrVar;
        rate = (maxArrival+minArrival)/2;

        let alpha = varService;
        let beta = varArrival;
        varArrival = arrVar;
        let serVar = alpha*(beta^2);
        varService = serVar; 
        mean = alpha*beta;        

        ca2 = varArrival/((1/rate)^2);
        cs2 = varService/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_multiServer();
        let wqTemp = Lq/rate;
        Wq = wqTemp * ((cs2+ca2)/2);
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // Normal/Uniform/1
    if ( (arrivalDist === 'Normal') && (serviceDist === 'Uniform') && (servers === 1)){
        
        let arrVar = mean;

        let minService = varArrival;
        varArrival = arrVar;
        let maxService = varService;
        let serVar = ((maxService-minService)^2)/12;
        varService = serVar;
        mean = (maxService+minService)/2;            

        ca2 = varArrival/((1/rate)^2);
        cs2 = varService/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_gg1();
        Wq = Lq/rate;
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // Normal/Uniform/C
    if ( (arrivalDist === 'Normal') && (serviceDist === 'Uniform') && (servers !== 1)){
        
        let arrVar = mean;

        let minService = varArrival;
        varArrival = arrVar;
        let maxService = varService;
        let serVar = ((maxService-minService)^2)/12;
        varService = serVar;
        mean = (maxService+minService)/2;            

        ca2 = varArrival/((1/rate)^2);
        cs2 = varService/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_multiServer();
        let wqTemp = Lq/rate;
        Wq = wqTemp * ((cs2+ca2)/2);
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // Normal/Normal/1
    if ( (arrivalDist === 'Normal') && (serviceDist === 'Normal') && (servers === 1)){         

        ca2 = varArrival/((1/rate)^2);
        cs2 = varService/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_gg1();
        Wq = Lq/rate;
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // Normal/Normal/C
    if ( (arrivalDist === 'Normal') && (serviceDist === 'Normal') && (servers !== 1)){         

        ca2 = varArrival/((1/rate)^2);
        cs2 = varService/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_multiServer();
        let wqTemp = Lq/rate;
        Wq = wqTemp * ((cs2+ca2)/2);
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // Normal/Gamma/1
    if ( (arrivalDist === 'Normal') && (serviceDist === 'Gamma') && (servers === 1)){         

        let arrVar = mean;
        
        let alpha = varService;
        let beta = varArrival;
        varArrival = arrVar;
        let serVar = alpha*(beta^2);
        varService = serVar; 
        mean = alpha*beta;    

        ca2 = varArrival/((1/rate)^2);
        cs2 = varService/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_gg1();
        Wq = Lq/rate;
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }

    // Normal/Gamma/C
    if ( (arrivalDist === 'Normal') && (serviceDist === 'Gamma') && (servers !== 1)){         

        let arrVar = mean;
        
        let alpha = varService;
        let beta = varArrival;
        varArrival = arrVar;
        let serVar = alpha*(beta^2);
        varService = serVar; 
        mean = alpha*beta;    

        ca2 = varArrival/((1/rate)^2);
        cs2 = varService/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_multiServer();
        let wqTemp = Lq/rate;
        Wq = wqTemp * ((cs2+ca2)/2);
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
    }
    
     // Gamma/Uniform/1
     if ( (arrivalDist === 'Gamma') && (serviceDist === 'Uniform') && (servers === 1)){
        
        let alpha = rate;
        let beta = mean;
        let arrVar = alpha*(beta*beta);
        rate = alpha*beta;  
        
        let minService = varService;
        let maxService = varArrival; 
        varArrival = arrVar;

        let serVar = ((maxService-minService)^2)/12;
        varService = serVar;
        mean = (maxService+minService)/2;      

        ca2 = varArrival/((1/rate)^2);
        cs2 = varService/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_gg1();
        Wq = Lq/rate;
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
        console.log("lq: " + Lq + 'Wq: ' + Wq)
    }

    // Gamma/Uniform/C
    if ( (arrivalDist === 'Gamma') && (serviceDist === 'Uniform') && (servers !== 1)){
        
        let alpha = rate;
        let beta = mean;
        let arrVar = alpha*(beta*beta);
        rate = alpha*beta;  
        
        let minService = varService;
        let maxService = varArrival; 
        varArrival = arrVar;

        let serVar = ((maxService-minService)^2)/12;
        varService = serVar;
        mean = (maxService+minService)/2;      

        ca2 = varArrival/((1/rate)^2);
        cs2 = varService/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_multiServer();
        let wqTemp = Lq/rate;
        Wq = wqTemp * ((cs2+ca2)/2);
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
        console.log("lq: " + Lq + 'Wq: ' + Wq)
    }

    //Gamma/Normal/1
    if ( (arrivalDist === 'Gamma') && (serviceDist === 'Normal') && (servers === 1)){
        
        let alpha = rate;
        let beta = mean;
        let arrVar = alpha*(beta*beta);
        rate = alpha*beta;  
        
        let meanService = varService;
        let serVar = varArrival; 
        varArrival = arrVar;
        varService = serVar;
        mean = meanService;
        
        ca2 = varArrival/((1/rate)^2);
        cs2 = varService/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_gg1();
        Wq = Lq/rate;
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
        console.log("lq: " + Lq + 'Wq: ' + Wq)
    }

    //Gamma/Normal/C
    if ( (arrivalDist === 'Gamma') && (serviceDist === 'Normal') && (servers !== 1)){
        
        let alpha = rate;
        let beta = mean;
        let arrVar = alpha*(beta*beta);
        rate = alpha*beta;  
        
        let meanService = varService;
        let serVar = varArrival; 
        varArrival = arrVar;
        varService = serVar;
        mean = meanService;
        
        ca2 = varArrival/((1/rate)^2);
        cs2 = varService/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_multiServer();
        let wqTemp = Lq/rate;
        Wq = wqTemp * ((cs2+ca2)/2);
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
        console.log("lq: " + Lq + 'Wq: ' + Wq)
    }

    // Gamma/Gamma/1
    if ( (arrivalDist === 'Gamma') && (serviceDist === 'Gamma') && (servers === 1)){
        
        let alpha = rate;
        let beta = mean;
        let arrVar = alpha*(beta*beta);
        rate = alpha*beta;  
        
        let alphaService = varService;
        let betaService = varArrival;
        varArrival = arrVar;
        let serVar = alphaService*(betaService^2);
        varService = serVar; 
        mean = alphaService*betaService;  
        
        ca2 = varArrival/((1/rate)^2);
        cs2 = varService/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_gg1();
        Wq = Lq/rate;
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
        console.log("lq: " + Lq + ' Wq: ' + Wq)
    }

    // Gamma/Gamma/C
    if ( (arrivalDist === 'Gamma') && (serviceDist === 'Gamma') && (servers !== 1)){
        
        let alpha = rate;
        let beta = mean;
        let arrVar = alpha*(beta*beta);
        rate = alpha*beta;  
        
        let alphaService = varService;
        let betaService = varArrival;
        varArrival = arrVar;
        let serVar = alphaService*(betaService^2);
        varService = serVar; 
        mean = alphaService*betaService;  
        
        ca2 = varArrival/((1/rate)^2);
        cs2 = varService/((1/mean)^2);

        p = (rate/(servers*mean));
        Lq = Lq_multiServer();
        let wqTemp = Lq/rate;
        Wq = wqTemp * ((cs2+ca2)/2);
        Ws = Wq + (1/mean);
        Ls = Ws * rate;
        console.log("lq: " + Lq + ' Wq: ' + Wq)
    }

    return(
        <div className="App">
        <form className='formBox'>
          <FadeIn transitionDuration='3000'>
            <div className='next'>
                <ServerField name='Length of Queue' val={Lq.toFixed(2)} style={{ width: '9vw', marginBottom: '10%'}} style2={{marginTop: '20%', textAlign: 'center'}} disabled={true}/>
                <ServerField name='Wait in Queue' val={Wq.toFixed(2)} style={{ width: '9vw' }} style2={{marginTop: '20%', textAlign: 'center'}} disabled={true}/>
                <ServerField name='Server Utilization' val={p.toFixed(2)} style={{ width: '9vw' }} style2={{marginTop: '20%', textAlign: 'center'}} disabled={true}/>
                <ServerField name='Wait in System' val={Ws.toFixed(2)} style={{ width: '9vw' }} style2={{marginTop: '20%', textAlign: 'center'}} disabled={true}/>
                <ServerField name='Length of System' val={Ls.toFixed(2)} style={{ width: '9vw', marginLeft: '40%' }} style2={{marginTop: '15%', textAlign: 'center', marginLeft: '6vw'}} disabled={true}/>
                <Button name="Back" onClick={backClick} style={{marginTop: '10%'}}/>
            </div>
          </FadeIn>  
        </form>
      </div>
    );
}

export default Result