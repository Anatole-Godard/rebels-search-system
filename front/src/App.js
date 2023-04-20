import './App.css';
import {useUser} from "./hooks/UseAuth";
import {Home} from "./views/Home";
import {Login} from "./views/Login";
import {
    Routes,
    Route, Navigate,
} from "react-router-dom";

const RequireAuth = ({children}) => {
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
            </Route>
        </Routes>
    </>);
}

export default App;
