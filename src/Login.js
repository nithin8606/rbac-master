import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Clear session on page load
    useEffect(() => {
        sessionStorage.clear();
    }, []);

    // Validate the form inputs
    const validate = () => {
        let result = true;
        if (!username) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (!password) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    };

    // Proceed to login using the API
    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();

        if (validate()) {
            const inputobj = {
                username: username,
                password: password
            };

            // API call to authenticate the user
            fetch("https://localhost:44308/User/Authenticate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputobj)
            })
                .then((res) => res.json())
                .then((resp) => {
                    if (resp && resp.jwtToken) {
                        toast.success('Login Successful!');
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('jwttoken', resp.jwtToken);

                        // Redirect to the home page after successful login
                        navigate('/');
                    } else {
                        toast.error('Invalid credentials, please try again');
                    }
                })
                .catch((err) => {
                    toast.error('Login Failed: ' + err.message);
                });
        }
    };

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLoginusingAPI} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input 
                                    type="text" 
                                    value={username} 
                                    onChange={e => setUsername(e.target.value)} 
                                    className="form-control" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={e => setPassword(e.target.value)} 
                                    className="form-control" 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button> | 
                            <Link className="btn btn-success" to={'/register'}>New User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
