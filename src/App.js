import './App.css';
import BasePage from './components/basepage/basepage';
import StartingPage from './components/startingpage/startingpage';
import CreateWallet from './components/createaccount/createaccount';
import Login from './components/loginpage/loginpage';

function App() {
  return (
    <div className="App">
      {/* uncomment these to see what each page looks like, we will implement routing across all pages, soon enough */}
      <BasePage/>
      {<StartingPage/>}
      {<CreateWallet/>}
      {<Login/>}
    </div>
  );
}

export default App;
