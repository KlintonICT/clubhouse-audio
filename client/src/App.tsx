import './App.css';
import { StreamCall } from '@stream-io/video-react-sdk';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { useUserContext } from './contexts/user';
import { MainPage } from './pages/main';
import { Room } from './pages/room';
import { SignIn } from './pages/sign-in';

function App() {
  const { call } = useUserContext();

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route
          path='/room'
          element={
            call ? (
              <StreamCall call={call}>
                <Room />
              </StreamCall>
            ) : (
              <Navigate to='/' />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
