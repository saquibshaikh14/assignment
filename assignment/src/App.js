
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';



import Sidebar from './components/Sidebar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Default from './screens/Default';
import PDF from './screens/PDF';


function App() {

  return (

    <Router>
      <Sidebar/>
      <Switch>
        <Route exact path="/" component={Default} />
        <Route exact path="/pdf" component={PDF} />
        <Route path="*" render={()=>
          <div>
            Invalid url !
          </div>  
        } />
      </Switch>
    </Router>

  );
}

export default App;
