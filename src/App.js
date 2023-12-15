import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DistroField from './components/DistroField';
import ServerField from './components/ServerField';
import Button from './components/Button';
import FadeIn from 'react-fade-in'
import NextScreen from './components/NextScreen';
import Result from './components/Result';

function MainScreen() {

  const navigate = useNavigate();
  const nextClick = () => navigate('/NextScreen', {state: {arrivalDist: arrivalValue, serviceDist: serviceValue, serverNumber: serverValue}});

  const [arrivalValue, setArrival] = useState();
  const arrivalDistChange = (e)=>{
    setArrival(e.target.value);
  }

  const [serviceValue, setService] = useState();
  const serviceDistChange = (e) =>{
    setService(e.target.value);
  }

  const [serverValue, setServer] = useState();
  const serverChange = (e) => {
    setServer(e.target.value);
  }

  return (
    <div className='App'>
      <h3 className='queueHeading'>Queue Modelling</h3>
      <form className='formBox'>
        <FadeIn transitionDuration='3000'>
          <DistroField name="Arrival Time Distribution" distChange={arrivalDistChange}/>
          {/* {arrivalValue} */}
          <DistroField name="Service Time Distribution" distChange={serviceDistChange}/>
          {/* {serviceValue} */}
          <ServerField name="Number of Servers" serverChange={serverChange}/>
          {/* {serverValue} */}
          <Button name="Next" onClick={nextClick}/>
        </FadeIn>
      </form>
    </div>
  );
}

function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path='/' element={<MainScreen />} />
          <Route exact path='/NextScreen' element={<NextScreen />} />
          <Route exact path='/Result' element={<Result />} />
        </Routes>
    </div>
  );
}

export default App;
