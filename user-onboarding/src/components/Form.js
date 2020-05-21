import React, { useState,useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup'


const formSchema = yup.object().shape({
    name: yup
            .string()
            .trim()
            .required("Name is Required."),
    email: yup
            .string()
            .email("Please Enter a Valid Email Address."),
            // .required("Please Enter a Valid Email Address."),
    password: yup
            .string()
            // .matches(/^[a-zA-Z0-9!@#$%^&*]+$/)
            .min(5)
            .required(),
    terms: yup.boolean().oneOf([true], "please agree to terms of use"),
    // role: yup
    //         .required("Please Select a Role"),

})


const Form = _ => {
    

    // Ability to toggle the button when fields are complete 
    const [ buttonDisabled, setButtonDisabled ] = useState(true)

 
    // Initial Form state 
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        terms: ""
    });



    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        terms: ""
    });




    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid)
        })
    }, [formState])



    const [post, setPost] = useState([])



    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(response => {
                console.log(response.data)
                setPost(response.data)
                setFormState({
                    name: "",
                    email: "",
                    password: "",
                    role: "",
                    terms: ""
                })
            })
            .catch(err => console.log("API Response Error", err.response))
    }

    const validateChange = e => {
        // Reach will allow us to "reach" into the schema and test only one part.
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
    };


    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState, [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        };

        // validateChange(e);
        setFormState(newFormData);
    };





    return (
        <div>
            <form onSubmit={formSubmit}>
                <label htmlFor="name">
                    Name
                <input
                        id="name"
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={inputChange}
                    />
                </label>
                <br />
                <label htmlFor="email">
                    Email
                <input
                        id="email"
                        type="text"
                        name="email"
                        value={formState.email}
                        onChange={inputChange}
                        required
                    />
                </label>
                <br />
                <label htmlFor="password">
                    Password
                <input
                        id="password"
                        type="password"
                        name="password"
                        minLength="8"
                        value={formState.password}
                        onChange={inputChange}
                        required
                    />
                </label>
                <br />
                <label>Role
                    <select
                        onChange={inputChange}
                        value={formState.role}
                        name="role"
                    >
                        <option value=''>- Select an option -</option>
                        <option value='Student'>Student</option>
                        <option value='Alumni'>Alumni</option>
                        <option value='Instructor'>Instructor</option>
                        <option value='TL'>Team Lead</option>
                    </select>
                </label>
                <br />
                <label htmlFor="checkbox">
                    Agree to Terms?
                <input
                        id="checkbox"
                        type="checkbox"
                        checked={formState.role}
                        name="checkbox"
                        onChange={inputChange}
                    />
                </label>
                <br />
                <button disabled={!buttonDisabled}>Submit</button>
            </form>
        </div>
    )
}

export default Form
