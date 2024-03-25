import Navbar from "./components/Navbar";
import RegistrationForm from "./components/RegistrationForm";
import {useState} from "react";

function App() {
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);

    function toogleRegistrationForm() {
        setShowRegistrationForm(!showRegistrationForm)
    }

    return (
        <div className="App">
            <Navbar onSignUpClick={toogleRegistrationForm} />
            {showRegistrationForm && <RegistrationForm onCloseClick={toogleRegistrationForm} />}
        </div>
    );
}

export default App;