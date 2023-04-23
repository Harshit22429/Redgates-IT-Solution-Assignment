import Signin from './components/Signin';
import Signup from './components/Signup';
import Reduxtodo from './components/Reduxtodo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  return (

    <> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin/>}/>
          <Route path='*' element={<Signin/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
