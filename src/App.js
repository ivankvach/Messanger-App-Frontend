import './App.css';
import { LeftBar, RightBar } from './components'

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4" id ="left_bar">
          <LeftBar/>
        </div>
        <div className="col-8" id="right_bar">
          <RightBar/>
        </div>
      </div>
    </div>
  );
}

export default App;
