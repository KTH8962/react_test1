import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Person from './components/Pesrson';
import PersonAdd from './components/PesrsonAdd';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Person />} />
          <Route path="/insert" element={<PersonAdd />} />
          <Route path="/insert/:id" element={<PersonAdd />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
