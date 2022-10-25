
import React, {useState, useRef} from "react";
import { Employees } from "./components/Employees.jsx";
import {Upload} from "./components/Upload.jsx"
import {
    HashRouter,
    Link,
    Routes,
    Navigate,
    Route,
} from "react-router-dom"

import './App.css';


function App() {
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const userInput = useRef(null);
  const passwordInput = useRef(null);


  const logIn = () => {
  setisLoggedIn(true);
  };
  const logOut = () => {
  setisLoggedIn(false);
  };

  const handleClick = event => {
    console.log('username is:', userInput.current.value);
    console.log('password is:', passwordInput.current.value);
    if (userInput.current.value === "admin" && passwordInput.current.value === "admin123") {
      logIn();
      userInput.current.value = "";
      passwordInput.current.value = "";
      alert("Valid credentials!! :)")
      return <Navigate to="/Employees" replace />
    } else {
      alert("Invalid username or password")
    }
  };



  const preventCopyPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    alert("Copying and pasting is not allowed!")
  }

  const Protected = ({isLoggedIn,children}) => {
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return children
  }


  return (
    <div className="bg-black">
    <HashRouter>
                <nav className="bg-black text-white text-2xl flex justify-around p-2">
                    <Link to="/"> LogIn </Link>
                    <Link to="/Employees"> Employees </Link>
                    <Link to="/Upload"> Upload </Link>
                </nav>
                <Routes>
                    <Route 
                      path="/" 
                      element={      
                      <section className="grid h-screen place-content-center bg-black">
                      {isLoggedIn ? (
                      <button className='text-white bg-slate-500 rounded-xl p-2 m-2 text-xl' onClick={logOut}>Logged In! If you want to logout please click this button.</button>
                      ) : (
                        <h2 className="text-white p-2 text-xl">Plase Log In to access the other pages. </h2>
                      )}
                      <section className='bg-slate-200 rounded-lg text-zinc-800 py-8 px-8'>
                      <h1 className='text-3xl font-bold px-4'>Log In</h1>
                      <section className='flex flex-col justify-center px-4'>
                          <div className='flex flex-col justify-center py-8'>
                              <label htmlFor="" className='text-xl py-2'>Username</label>
                              <input type="text"
                              className='username-input rounded-lg p-2'
                              required
                              ref={userInput}
                              onCopy={(e) => preventCopyPaste(e)}  
                              onPaste={(e) => preventCopyPaste(e)}  
                              onCut={(e) => preventCopyPaste(e)}
                              />
            
                              <label htmlFor="" className='text-xl py-2'>Password</label>
                              <input type="password" 
                              className='password-input rounded-lg p-2'
                              required
                              ref={passwordInput}
                              onCopy={(e) => preventCopyPaste(e)}  
                              onPaste={(e) => preventCopyPaste(e)}  
                              onCut={(e) => preventCopyPaste(e)}                 
                              />
                          </div>
                          <button onClick={handleClick} className='bg-stone-900 rounded-xl text-xl font-bold p-2 text-slate-200'>Log In</button>
                      </section> 
                      </section>
                  </section>
                  }
                    />
                    <Route 
                      path="/Employees" 
                      element={
                      <Protected isLoggedIn={isLoggedIn}>
                        <Employees/>
                      </Protected>
                      } 
                    />
                    <Route 
                      path="/Upload" 
                      element={
                      <Protected isLoggedIn={isLoggedIn}>
                        <Upload/>
                      </Protected>
                      }
                    />
                </Routes>
    </HashRouter>
    </div>

  );
}

export default App;
