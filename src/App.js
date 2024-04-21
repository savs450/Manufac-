import './App.css';
import WineStats from './Data/Flavanoids';
import Gamma from './Data/Gamma';
import Demo from './Data/demo';
import ResultsTable from './Data/resultTable';


function App() {
  return (
    <div className="App">
   < WineStats/>
   <Gamma/>
   {/* <ResultsTable/> */}
    </div>
  );
}

export default App;
