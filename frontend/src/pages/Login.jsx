import React from 'react';

export const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl front-semibold text-center'>
            Login
            <span className='text-white'> ChatApp</span>
        </h1>
        <form>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text'>Username</span>
                </label>
                <input type='text' placeholder='Enter Username' className='input input-bordered input-primary w-full max-w-xs' />
            </div>
            <div>
                <label className='label'>
                    <span className='text-base label-text'>Password</span>
                </label>
                <input type='password' placeholder='Enter Password' className='input input-bordered input-primary w-full max-w-xs' />
            </div>
            <div>
                <button className='btn btn-block btn-sm mt-2 max-w-xs'>Login</button>
            </div>
            {"Don't have an account?"}
            <a href='/register' className=' text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                Register
            </a>
        </form>
      </div>
    </div>
  );
};
