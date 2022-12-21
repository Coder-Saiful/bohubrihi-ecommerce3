import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../../api/apiAuth';
import { authenticate, isAuthenticated, userInfo } from '../../utils/auth';
import Layout from '../Layout';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: false,
        disabled: false,
        redirect: false
    });

    const {email, password, error, disabled, redirect} = values;

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

        login({email: email, password: password})
            .then(response => {
                authenticate(response.data.token, () => {
                    submitBtn.textContent = 'Login';

                    setValues({
                        ...values,
                        email: '',
                        password: '',
                        error: false,
                        disabled: false,
                        redirect: true
                    });
                });
            })
            .catch(err => {
                submitBtn.textContent = 'Login';

                setValues({
                    ...values,
                    error: err.response.data,
                    disabled: false,
                    redirect: false
                });
            });
    }

    const redirectUser = () => {
        if (redirect) {
            return <Redirect to={`/${userInfo().role}/dashboard`} />
        }
        if (isAuthenticated()) {
            return <Redirect to='/' />
        }
    }

    return (
        <Layout title='Login' classname='container'>
            {redirectUser()}
            <div className="row">
                <div className="col-lg-7 col-md-10 m-auto">
                <form className='loginForm' onSubmit={handleSubmit}>
                        <h1>Login Here</h1>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="text" className='form-control' name='email' value={email} onChange={handleChange} />
                            <div className="text-danger">
                                {error.message ? error.message + "!" : ''}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className='form-control' name='password' value={password} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary submitBtn" disabled={disabled}>Login</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Login;