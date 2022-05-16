import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/index';
import GlobalStyle from './styles/global';


const App = () => (
  <div>
    <GlobalStyle />
    <Router>
      <Routes />
    </Router>
  </div>
);

export default App;
