import React, {useEffect} from "react";
import "./App.css";
import "./reset.css"
import axios from "axios";
import Home from "./Components/Home/Home";
import {Route, Switch} from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import LinkWallet from "./Components/LinkWallet/LinkWallet";
import VerifyWalletOwnership from "./Components/VerifyWalletOwnership/VerifyWalletOwnership";
import Rider from "./Roles/Rider";
import Client from "./Roles/Client";

function App() {
    useEffect(() => {
        axios("/twitter/login")
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    })

    return (<div className="App">
        <Switch>
            <Route path="/" exact >
                <Home />
            </Route>
            <Route path="/auth" exact>
                <Auth />
            </Route>
            <Route path="/auth/link-wallet" exact >
                <LinkWallet />
            </Route>
            <Route path="/auth/verify-ownership" exact >
                <VerifyWalletOwnership />
            </Route>
            <Route path="/dashboard/rider">
                <Rider />
            </Route>
            <Route path="/dashboard/client">
                <Client />
            </Route>
        </Switch>
    </div>);
}

export default App;