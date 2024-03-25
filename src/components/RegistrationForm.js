import 'bootstrap/dist/css/bootstrap.min.css';
import './css/RegistrationForm.css'
import {BASE_URL} from "../constants";
import { IoCloseSharp } from "react-icons/io5";
import {
    validateEmail,
    validatePhone,
    validateName,
    validatePassword,
    validateConfirmPassword,
    validateForm
} from "../api/validation";
import React, {useState} from "react";

export default function RegistrationForm({ onCloseClick }) {
    const [user, setUser] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        phone: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!validateForm(user.name, user.email, user.password, user.phone)) {
                setErrorMessage("Form is not valid.")
                return;
            }

            const response = await fetch(
                `${BASE_URL}/auth/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                }
            );

            if (response.ok) {
                setUser({
                    username: '',
                    password: '',
                    email: '',
                    phone: '',
                    name: ''
                });
                setIsSuccess(true);
                setErrorMessage("")
            } else {
                const data = await response.json();
                setErrorMessage(data.message || "Registration failed!");
            }

        } catch (error) {
            setErrorMessage(error);
        } finally {
            setConfirmPassword("")
        }
    }

    return (
        <div className="form-container container d-flex flex-column justify-content-center align-items-center bg-body-tertiary shadow rounded">
            <div className={"close-icon-container fs-6 mt-3"} onClick={onCloseClick}><IoCloseSharp className={"close-icon"} size={"30"} /></div>

            <h5 className={"mt-3 mb-3"}>To sign up, please provide this information</h5>

            {isSuccess && <span className={"text-success mb-3"}>Registration successful!</span>}
            {errorMessage && <span className={"text-danger mb-3"}>{errorMessage}</span>}

            <form onSubmit={handleSubmit} action="" method="post" className={"registration-form"}>

                <div className="row">
                    <div className={"input-group mb-3 col-6"}>
                        <span className={"input-group-text"} id={"basic-addon1"}>@</span>
                        <input type="text" value={user.username} onChange={handleChange} name={"username"} className={"form-control"} placeholder={"Username"} aria-label={"Username"}/>
                    </div>

                    <div className={"mb-3 col-12"}>
                        <input type="text" value={user.name} onChange={handleChange} name={"name"} className={"form-control"} placeholder={"Name"} aria-label="Name"/>
                        {errorMessage && !validateName(user.name) && <span className={"text-danger"}>Password must be at least 8 characters long and contain at least one uppercase letter and one digit.</span> }
                    </div>

                    <div className={"mb-3 col-12"}>
                        <input type="text" value={user.email} onChange={handleChange} name={"email"} className={"form-control"} placeholder={"E-mail"} aria-label="E-mail"/>
                        {errorMessage && !validateEmail(user.email) && <span className={"text-danger"}>Email must be in the format "example@example.com".</span>}
                    </div>

                    <div className={"mb-3 col-12"}>
                        <input type="password" value={user.password} onChange={handleChange} name={"password"} className={"form-control"} placeholder={"Password"}/>
                        {errorMessage && !validatePassword(user.password) && <span className={"text-danger"}>Password must be at least 8 characters long and contain at least one uppercase letter and one digit.</span> }
                    </div>

                    <div className={"mb-3 col-12"}>
                        <input type="password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} className={"form-control"}
                               placeholder={"Repeat password"} />
                        {!validateConfirmPassword(confirmPassword, user.password) && <span className={"text-danger"}>Passwords must match.</span> }
                    </div>

                    <div className={"mb-3 col-12"}>
                        <input type="text" value={user.phone} onChange={handleChange} name={"phone"} className={"form-control"} placeholder={"Phone. Example: +380991234567"}
                               aria-label="Phone"/>
                        {errorMessage && !validatePhone(user.phone) && <span className={"text-danger"}>Phone must be in the format "+123(45)7890123".</span> }
                    </div>
                </div>

                <button type="submit" className="mb-3 btn btn-primary">Submit</button>

            </form>
        </div>
    );
}