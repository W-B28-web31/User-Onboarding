import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup'


const schema = yup.object().shape({
    name: yup.string().min(2).max(15).required(),
    email: yup.string().email(),
    password: yup.string().min(6).max(12).required(),
    tos: yup.boolean().required()
});




const Form = props => {
    
    const [ user, setUser ] = useState({
        name:'',
        email:'',
        password: '',
        tos: false
    })

    const handleChange = ( {target: { name, value, checked}} ) => {
        value = name === 'tos' ? checked : value;
        setUser(user => ({
            ...user,
            [name]:value
        }));
    };
    const [errors, setErrors] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        // console.log(user)
        schema.validate(user)
            .then(values => {
                axios.post('https://reqres.in/api/users', values)
                    .then(response => {
                        props.addNewUser(response.data);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })
            .catch(error => {
                setErrors(error.errors)
            })
        
    };

    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Name
                <input
                        id="name"
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="email">
                    Email
                <input
                        id="email"
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
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
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br /> 
                {/* <label>Role
                    <select
                        onChange={inputChange}
                        value={props.role}
                        name="role"
                    >
                        <option value=''>- Select an option -</option>
                        <option value='Student'>Student</option>
                        <option value='Alumni'>Alumni</option>
                        <option value='Instructor'>Instructor</option>
                        <option value='TL'>Team Lead</option>
                    </select>
                </label>
                <br /> */}
                <label htmlFor="checkbox">
                    Agree to Terms?
                <input
                        id="checkbox"
                        type="checkbox"
                        checked={user.tos}
                        name="tos"
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button>Submit</button>
            </form>

            {errors.length > 0 && (
                <div className="errors">
                    {errors.map(error => (
                        <p key={error}>{error}</p>
                    ))}

                </div>
            )}
        </div>
    )
}

export default Form
