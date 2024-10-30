import './App.css';
import AppContainer from './containers/AppContainer';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
      <footer>
        <p>&copy; 2024</p>
        <p>
          Designed by <i>Sourabh</i> and <i>Dipjyoti</i>
        </p>
      </footer>
    </div>
  );
}

export default App;
