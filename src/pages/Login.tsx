// import React from 'react';
import ChangeThemes from '../components/ChangesThemes';
import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";
import {Formik} from "formik";
import axiosInstance, {configureAxios} from "../api/axiosInstance";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [])

    return (
        // screen
        <div className="w-full p-0 m-0">
            {/* container */}
            <div className="w-full min-h-screen flex justify-center items-center bg-base-200 relative">
                {/* theme */}
                <div className="absolute top-5 right-5 z-[99]">
                    <ChangeThemes/>
                </div>
                <div
                    className="w-full h-screen xl:h-auto xl:w-[30%] 2xl:w-[25%] 3xl:w-[20%] bg-base-100 rounded-lg shadow-md flex flex-col items-center p-5 pb-7 gap-8 pt-20 xl:pt-7">
                    <div className="flex items-center gap-1 xl:gap-2">
                        <img src={'https://z4yuow5eef.ufs.sh/f/NUCcwkouEy5SB64UlIfw1btWfSBu78ZMo4YgaQJlKV2iRepT'} className={'w-[50px]'}/>
                    </div>
                    <span className="xl:text-xl font-semibold">
                Vyb
          </span>
                    <span className="xl:text-xl font-semibold">
            Hello, 👋 Welcome Back!
          </span>
                    <div className="w-full flex flex-col items-stretch gap-3">
                        <Formik
                            initialValues={{email: '', password: ''}}
                            validate={values => {
                                const errors: any = {};
                                if (!values.email) {
                                    errors.email = 'Email is required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                return errors;
                            }}
                            onSubmit={(values, {setSubmitting}) => {
                                setTimeout(() => {
                                  axiosInstance.post('/auth/admin/login',values).then((res)=>{
                                    console.log('res',res?.data);

                                    configureAxios(res?.data?.access_token);
                                    toast('Successfully logged in');
                                    localStorage.setItem('token',res?.data?.access_token);
                                    localStorage.setItem('user',JSON.stringify(res?.data?.admin));

                                    setTimeout(()=>{
                                       navigate('/');
                                    },1000);

                                  }).catch((err)=>{
                                    toast(err?.message);
                                    setSubmitting(false);
                                  })
                                }, 400);
                            }}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting,
                                  /* and other goodies */
                              }) => (
                                <form onSubmit={handleSubmit}>
                                    <label className="input input-bordered min-w-full flex items-center gap-2 mt-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className="w-4 h-4 opacity-70"
                                        >
                                            <path
                                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                                            <path
                                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                                        </svg>
                                        <input
                                            type="email"
                                            name={'email'}
                                            className="grow grow:bg-white  input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                                            placeholder="Email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                    </label>
                                  <span className={'text-[#ff0000] font-bold text-[10px] mt-1 mb-1'}>{errors.email && touched.email && errors.email}</span>
                                    <label className="input input-bordered flex items-center gap-2 mt-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className="w-4 h-4 opacity-70"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <input
                                            name={'password'}
                                            type="password"
                                            className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                                            placeholder="Password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                        />
                                    </label>
                                  <span className={'text-[#ff0000] font-bold text-[10px] mt-1 mb-1'}> {errors.password && touched.password && errors.password}</span>


                                    <button
                                        type={'submit'}
                                        disabled={isSubmitting}
                                        className="btn btn-block btn-primary  mt-2"
                                    >
                                        Log In
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
