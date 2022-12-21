import React, { useState } from 'react';
import { register } from '../../api/apiAuth';
import Layout from '../Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from '../../utils/auth';
import { Redirect } from 'react-router-dom';

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: {},
        disabled: false
    });

    const {name, email, password, error, disabled} = values;

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        const submitBtn = document.querySelector('.submitBtn');
        const loader = document.createElement('i');
        loader.className = 'fa fa-spinner fa-spin';
        submitBtn.textContent = ' Processing...';
        submitBtn.prepend(loader);
        
        setValues({
            ...values,
            disabled: true
        });

        register({name: name, email: email, password: password})
            .then(response => {
                submitBtn.textContent = 'Register';

                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: {},
                    disabled: false
                });

                toast.success(`${response.data.message}`, {autoClose: 3000});
            })
            .catch(err => {
                submitBtn.textContent = 'Register';

                setValues({
                    ...values,
                    error: err.response.data,
                    disabled: false
                });
                if (err.response.data.message) {
                    toast.error(`${err.response.data.message}`, {autoClose: 3000});
                }
            });
    }

    return (
        <Layout title='Register' classname='container'>
            <ToastContainer />
            {isAuthenticated() ? <Redirect to='/' /> : ''}
            <div className="row">
                <div className="col-lg-7 col-md-10 m-auto">
                    <form className='loginForm' onSubmit={handleSubmit}>
                        <h1>Register Here</h1>
                        <div className="mb-3">
                            <label className="form-label">Your Name</label>
                            <input type="text" className={`form-control ${error.name ? 'is-invalid' : ''}`} name='name' value={name} onChange={handleChange} />
                            <div className="text-danger">
                                {error.name ? error.name : ''}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="text" className={`form-control ${error.email ? 'is-invalid' : ''}`} name='email' value={email} onChange={handleChange} />
                            <div className="text-danger">
                                {error.email ? error.email : ''}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className={`form-control ${error.password ? 'is-invalid' : ''}`} name='password' value={password} onChange={handleChange} />
                            <div className="text-danger">
                                {error.password ? error.password : ''}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary submitBtn" disabled={disabled}>Register</button>
                        </form>
                </div>
            </div>
        </Layout>
    );
};

export default Register;