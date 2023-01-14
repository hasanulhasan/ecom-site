import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import login from '../../src/asset/login.gif'
import { AuthContext } from './Context/AuthProvider/AuthProvider';


const Login = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const { signIn, providerLogin } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const from = location.state?.from?.pathname || '/'

  const handleLogin = (data) => {
    setLoginError('');
    // console.log(data);
    signIn(data.email, data.password)
      .then(result => {
        const user = result.user;
        // console.log(user);
        // toast('Login successful');
        reset();
        navigate(from, { replace: true })
      })
      .catch(err => {
        console.error(err.message);
        setLoginError(err.message);
      })
  }

  const googleButton = () => {
    console.log('clicked');
    providerLogin(googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        toast('Login successful');
        navigate(from, { replace: true });
      })
      .catch(err => {
        console.error(err);
      })
  }

  return (
    <div>
      <div className="py-10 bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <img src={login} alt='login'></img>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <p className='text-4xl text-center p-2 py-4 font-bold'>Login</p>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type='email' {...register("email", { required: "Email Address is required" })} placeholder="Email" className="input input-bordered w-full" />
                  {errors.email && <p role="alert" className='text-red-600'>{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type='password' {...register("password", { required: "Password is required" })} placeholder="Password" className="input input-bordered w-full" />
                  {errors.password && <p role="alert" className='text-red-600'>{errors.password?.message}</p>}
                </div>
                {loginError && <p className='text-red-600 text-center'>{loginError}</p>}
                <div className='flex justify-center'>
                  <button className="btn btn-active btn-accent mt-3 w-full text-white">Log in</button>
                </div>
                <p className='p-1 text-center'>New in Mobile Market? Go <Link to='/signup' className='text-cyan-600 font-bold'>Sign up</Link></p>
                <div className="divider">OR</div>
                <div className='flex justify-center'>
                  <button onClick={googleButton} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                      <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                    <p>Login with Google</p>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;