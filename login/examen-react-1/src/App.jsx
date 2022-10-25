import {LoginCard} from "./components/LoginCard.jsx"
import { Employees } from "./components/Employees.jsx";
import {Upload} from "./components/Upload.jsx"
import {
    BrowserRouter as Router,
    HashRouter,
    Link,
    Redirect,
    Routes,
    Route,
} from "react-router-dom"

import './App.css';

function App() {
  return (
    <div>
    <HashRouter>
                <nav className="bg-black text-white text-2xl flex justify-around p-2">
                    <Link to="/"> LogIn </Link>
                    <Link to="/Employees"> Employees </Link>
                    <Link to="/Upload"> Upload </Link>
                </nav>
                <Routes>
                    <Route path="/" element={<LoginCard/>}/>
                    <Route path="/Employees" element={<Employees/>} />
                    <Route path="/Upload" element={<Upload/>}/>
                    <Route path='*' element={<LoginCard/>}/>
                </Routes>
    </HashRouter>
    </div>

  );
}

export default App;
