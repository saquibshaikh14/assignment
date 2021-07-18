
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from './components/Sidebar';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Default from './screens/Default';
import PDF from './screens/PDF';
import PPT from './screens/PPT';
import Video from './screens/Video';


function App() {

  return (

    <Router>
      <Sidebar/>
      <Switch>
        <Route exact path="/" component={Default} />
        <Route exact path="/pdf" component={PDF} />
        <Route exact path="/ppt" component={PPT} />
        <Route exact path="/video" component={Video}/>
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
