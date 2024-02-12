import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { darkLogo } from "../assets";
// fire base registrar usuarios
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {motion} from "framer-motion";
import { RotatingLines } from 'react-loader-spinner'

const Registration = () => {
  const navigate = useNavigate()
  const auth = getAuth()

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  // Error emsages
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCpassword, setErrCpassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");

  // loading state
  const [loading, setLoading] = useState(false);
  const [succesMsg, setSuccesMsg] = useState("");

  // handle functions
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleCPassword = (e) => {
    setCpassword(e.target.value);
    setErrCpassword("");
  };

  //   email validator
  const isValidEmail = (email) => {
    return String(email).toLowerCase().match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/)
  }

  //   submit button
  const handleRegistration = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your name");
    }
    if (!email) {
      setErrEmail("Enter your email");
    } else {
      if (!isValidEmail(email)) {
        setErrEmail("Please enter a valid email");
        setFirebaseErr("")
      }
    }
    if (!password) {
      setErrPassword("Enter your password");
    } else {
      if (password.length < 6) {
        setErrPassword("Password must be at least 6 caracters")
      }
    }
    if (!cpassword) {
      setErrCpassword("Confirm your password");
    } else {
      if (cpassword !== password) {
        setErrCpassword("Password not matched")
      }
    }

    if (clientName && email && isValidEmail(email) && password && password.length >= 6 &&
      cpassword && cpassword === password) {

      // firebase configuration
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: clientName,
          })
          // Signed up 
          const user = userCredential.user;
          console.log(user);
          setLoading(false);
          setSuccesMsg("Account created successfully");
          setTimeout(() => {
            navigate("/singin")
          }, 3000);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("Email already in use, try another one");
          }
          // ..
        });
      console.log(clientName, email, password, cpassword)
      setClientName("")
      setEmail("")
      setPassword("")
      setCpassword("")
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form
          className="w-[370px] mx-auto flex flex-col items-center"
          action=""
          method="get"
        >
          <img className="w-32" src={darkLogo} alt="darkLogo" />
          <div className="w-full border border-zinc-200 p-6">
            <h2 className=" font-titleFont text-3xl font-medium mb-4">
              Create Account
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className=" text-sm font-medium">Your name</p>
                <input
                  onChange={handleName}
                  value={clientName}
                  type="text"
                  className="w-full py-1 border border-zinc-400 px-2 
              text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput
               duration-200"
                />
                {errClientName && (
                  <p
                    className=" text-red-600 text-xs font-semibold tracking-wide flex items-center
                         gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">!</span>
                    {errClientName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className=" text-sm font-medium">
                  Email or movile phone number
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  type="email"
                  className="w-full lowercase py-1 border border-zinc-400 px-2 
              text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput
               duration-200"
                />
                {errEmail && (
                  <p
                    className=" text-red-600 text-xs font-semibold tracking-wide flex items-center
                         gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">!</span>
                    {errEmail}
                  </p>
                )}
                {firebaseErr && (
                  <p
                    className=" text-red-600 text-xs font-semibold tracking-wide flex items-center
                         gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">!</span>
                    {firebaseErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className=" text-sm font-medium">Password</p>
                <input
                  onChange={handlePassword}
                  value={password}
                  type="password"
                  className="w-full  py-1 border border-zinc-400 px-2 
              text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput
               duration-200"
                />
                {errPassword && (
                  <p
                    className=" text-red-600 text-xs font-semibold tracking-wide flex items-center
                         gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">!</span>
                    {errPassword}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className=" text-sm font-medium">Re-enter Password</p>
                <input
                  onChange={handleCPassword}
                  value={cpassword}
                  type="password"
                  className="w-full py-1 border border-zinc-400 px-2 
              text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput
               duration-200"
                />
                {errCpassword ? (
                  <p
                    className=" text-red-600 text-xs font-semibold tracking-wide flex items-center
                         gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">!</span>
                    {errCpassword}
                  </p>
                ) : (
                  <p className=" text-xs text-gray-600">
                    Password must be at least 6 caracters{" "}
                  </p>
                )}

              </div>
              <button
                onClick={handleRegistration}
                className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] 
             to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 
              active:shadow-amazonInput"
              >
                Continue
              </button>

              {
                loading && (
                  <div className="flex justify-center">
                    <RotatingLines
                      visible={true}
                      height="50"
                      width="50"
                      color="#febd69"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                )
              }
              {
                succesMsg && (
                  <div>
                    <motion.p
                    initial={{ y:10, opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{duration:0.5}}
                    className=" text-base font-titleFont font-semibold text-green-600 border-[1px]
                     border-green-700 px-2 text-center"
                    >{succesMsg}</motion.p>
                  </div>
                )
              }
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              By Continuing, you agree to Amazon's
              <span className=" text-blue-600"> Conditions of Use</span> and
              <span className=" text-blue-600"> Privace Notice.</span>
            </p>
            <div>
              <p className="text-xs text-black mt-4 cursor-pointer group">
                Already have an account?
                <Link to={"/singin"}>
                  <span
                    className=" text-blue-600 group-hover:text-orange-700 group-hover:underline
               underline-offset-1"
                  >
                    {" "}
                    Sing In{" "}
                    <span>
                      <ArrowRightIcon />
                    </span>
                  </span>
                </Link>
              </p>
              <p className="text-xs text-black -mt-2 cursor-pointer group">
                Buying for work?
                <span
                  className=" text-blue-600 group-hover:text-orange-700 group-hover:underline
               underline-offset-1"
                >
                  {" "}
                  Create a free business account{" "}
                  <span>
                    <ArrowRightIcon />
                  </span>
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
      {/* pie de pagina */}
      <div
        className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col
      gap-4 items-center justify-center py-10"
      >
        <div className="flex items-center gap-6">
          <p
            className="text-xs cursor-pointer text-blue-600 hover:text-orange-700 hover:underline
               underline-offset-1"
          >
            Conditions of Use
          </p>
          <p
            className="text-xs cursor-pointer text-blue-600 hover:text-orange-700 hover:underline
               underline-offset-1"
          >
            Privacy Notice
          </p>
          <p
            className="text-xs cursor-pointer text-blue-600 hover:text-orange-700 hover:underline
               underline-offset-1"
          >
            {" "}
            Help
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default Registration;
