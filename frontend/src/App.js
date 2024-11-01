import Footer from './components/Footer';
import AppContainer from './containers/AppContainer';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
