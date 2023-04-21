import React from "react";
import {Navigate, Route, Routes,} from "react-router-dom";
import './App.css';
import {useUser} from "./hooks/UseAuth";
import {Home} from "./views/Home";
import {Login} from "./views/Login";
import {People} from "./views/People";
import {Films} from "./views/Films";
import {Starships} from "./views/Starships";
import {Vehicles} from "./views/Vehicles";
import {Species} from "./views/Species";

const RequireAuth = (
    {children}:
        { children: JSX.Element; }): JSX.Element => {
    const {token} = useUser();
    if (!token) {
        return <Navigate to="/login" replace/>;
    }
    return children;
}
export const App = () => {
    return (<>
        <Routes>
            <Route>
                <Route path="/" element={<Navigate to="/home" replace/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/home" element={<RequireAuth><Home/></RequireAuth>}/>
                <Route path="/people/:id" element={<RequireAuth><People/></RequireAuth>}/>
                <Route path="/films/:id" element={<RequireAuth><Films/></RequireAuth>}/>
                <Route path="/starships/:id" element={<RequireAuth><Starships/></RequireAuth>}/>
                <Route path="/species/:id" element={<RequireAuth><Species/></RequireAuth>}/>
                <Route path="/vehicles/:id" element={<RequireAuth><Vehicles/></RequireAuth>}/>
            </Route>
        </Routes>
    </>);
}

export default App;
