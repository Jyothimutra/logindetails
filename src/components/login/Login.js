 import "./Login.scss";
import React, { useState , useRef} from 'react';
import { useNavigate } from "react-router-dom";
import isEmpty from "lodash";
export const Login = () => {

    const [fieldsInput , setFieldsInput] = useState({});
    const [errorMessages , setErrorMessages] = useState({});
    const submitButtonClicked = useRef(false);
    const navigate = useNavigate();

    const validateInput = (data = fieldsInput) => {
        let hasError = false;
        const obj = {};
        if(!data.email){
            obj.email = "Please enter the Email";
            hasError = true;
        }
        else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))) {
            obj.email = "You have entered invalid email";
            hasError = true;
        }

        if(!data.password){
            obj.password = "Please enter the password";
            hasError = true;
        } else if(data.password.length < 8){
            obj.password = "password sould be atleast 8 characters";
            hasError = true;
        }

        if(data.confirmpassword !== data.password){
            obj.confirmpassword = "password and confirm password does not match";
            hasError = true;
        }

        if(!data.fullname){
            obj.fullname = "Please enter the Full Name";
            hasError = true;
        }

        if(!data.phonenumber){
            obj.phonenumber = "Please enter the Phone Number";
            hasError = true;
        } else if(data.phonenumber.length !== 10){
            obj.phonenumber = "Phone should be of 10 digits";
            hasError = true;
        }

        if(!data.terms){
            obj.terms = "Please Accept the terms";
            hasError = true;
        }

        setErrorMessages(obj);
        return hasError;
    }

    const onChangeInput = (e) => {
        const obj = {...fieldsInput};
        if(e.target.name === "terms"){
            obj[e.target.name] = e.target.checked;
        } else {
            obj[e.target.name] = e.target.value;
        }
        setFieldsInput(obj);
        if(submitButtonClicked.current){
            validateInput(obj);
        }
    }

    const submitClicked = () => {
        const hasError = validateInput();
        submitButtonClicked.current = true;
        if(!hasError){
            navigate("/chart");
        }
    }

    return (
        <div className="login__form">
            <span className="login__form--title">Create An Account</span>
            <div className="login__form--field">
                <label className="login__form--field__label">Your Email Address</label>
                <input className="login__form--field__input" type="email" name="email" onChange={(e) => onChangeInput(e)}/>
                <span className="login__form--field__error">{errorMessages.email}</span>
            </div>
            <div className="login__form--field">
                <label className="login__form--field__label">Your Password</label>
                <input className="login__form--field__input" type="password" name="password" onChange={(e) => onChangeInput(e)}/>
                <span className="login__form--field__error">{errorMessages.password}</span>
            </div>
            <div className="login__form--field">
                <label className="login__form--field__label">Confirm Your Password</label>
                <input className="login__form--field__input" type="password" name="confirmpassword" onChange={(e) => onChangeInput(e)}/>
                <span className="login__form--field__error">{errorMessages.confirmpassword}</span>
            </div>
            <div className="login__form--field">
                <label className="login__form--field__label">Your Full Name</label>
                <input className="login__form--field__input" type="text" name="fullname" onChange={(e) => onChangeInput(e)}/>
                <span className="login__form--field__error">{errorMessages.fullname}</span>
            </div>
            <div className="login__form--field">
                <label className="login__form--field__label">Your Phone Number</label>
                <input className="login__form--field__input" type="tel" name="phonenumber" onChange={(e) => onChangeInput(e)}/>
                <span className="login__form--field__error">{errorMessages.phonenumber}</span>
            </div>
            <div className="login__form--terms">
                <input type="checkbox" id="terms" name="terms" value="terms" onChange={(e) => onChangeInput(e)}/>
                <span className="login__form--terms__message">I read and agree the Terms and Conditions</span>
                <div className="login__form--field__error ">{errorMessages.terms}</div>
            </div>
            <div className="create__account">
            <button className="create__account--btn" onClick={() =>submitClicked()}>Create Account</button>
            </div>
        </div>
    )
}