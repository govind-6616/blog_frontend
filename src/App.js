import React, { createContext} from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Profile from "./components/profile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Create from "./components/Create";
import Logout from "./components/Logout";
import Read from "./components/read";
import About from "./components/About";
import Check from "./components/checking";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <>
                <BrowserRouter>
                    <Nav />
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/Blog/:category/:_id" exact component={Read}/>
                        <Route path="/Blog/:category" exact component={Home} />
                        <Route path="/Create" component={Create} />
                        <Route path="/Profile" exact component={Profile} />
                        <Route path="/About/:_id" exact component={About}/>
                        <Route path="/Signup" exact component={Signup} />
                        <Route path="/Login" exact component={Login} />
                        <Route path="/Update/:_id" exact component={Check}/>
                        {/* <Route path="/updateBlog/:_id" exact componnet={Update} /> */}
                        <Route path="/Logout" component={Logout} />
                    </Switch>
                </BrowserRouter>
        </>
    )
}
export default App;