import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/UserSlice"; 

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
      setShowPassword((preve) => !preve);
    };

  
    const [data, setData] = useState({
      email: "",
      password: "",
    });

    const navigate = useNavigate()

    const userData = useSelector(state => state)

    const dispatch = useDispatch()
  
    const handleOnChange = (e) => {
      const {name, value} = e.target
      setData ((preve) => {
          return {
              ...preve,
              [name] : value
          }
      })
    }
  
    const handleSubmit = async(e) => {
      e.preventDefault()
      const {email, password} = data
      if( email && password) {
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`, {
          method : "POST",
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })

        const dataRes = await fetchData.json()
        console.log(dataRes);
        toast(dataRes.message)
        
        if(dataRes.alert) {
          dispatch(loginRedux(dataRes))
          setTimeout(() => {
            navigate("/")
          }, 1000)
        }
        
      } 
      else {
        toast ("Please enter correct password")
      }
      console.log(userData)
    }

  return (
    <div>
          <div className="p-3 md:p-4 ">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4 rounded  shadow-md">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md flex m-auto">
          <img src={loginSignupImage} alt="" className="w-full" />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>




          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-1 py-1 rounded focus-within:outline-green-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex mt-1 mb-2 bg-slate-200 px-1 py-1 rounded focus-within:outline focus-within:outline-green-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" 
            w-full bg-slate-200 border-none  border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="max-w-[150px] w-full m-auto bg-green-400 hover:bg-green-600 cursor-pointer rounded-full  text-white text-xl font-medium text-center py-1 mt-4">
            Login
          </button>
        </form>
        <p className="text-sm mt-3">
          Don't have account ?{" "}
          <Link to={"/signup"} className="text-green-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default Login;
