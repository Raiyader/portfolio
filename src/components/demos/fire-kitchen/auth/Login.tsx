import { Link, useNavigate } from "react-router-dom";
import orange from "../../../../assets/demos/fire-kitchen/orange-fruit.webp";
import React, { useRef, useState } from "react";
import Error from "../../../../components/demos/fire-kitchen/UI/Error";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredEmail = emailRef.current!.value;
    const enteredPassword = passwordRef.current!.value;

    const data = {
      email: enteredEmail,
      password: enteredPassword,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email || !data.password) {
      return;
    }

    const isValidEmail = (email: string) => emailRegex.test(email);

    if (!isValidEmail(enteredEmail)) {
      setHasError(true);
      setErrorMessage("Please enter a valid email");
      return;
    }

    localStorage.setItem("firekitchen", data.email)
    navigate("/demo/fire-kitchen/recipes")
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex flex-col justify-center items-center px-4 py-10"
      style={{ backgroundImage: `url(${orange})` }}
    >
      <div className="bg-black/60 p-8 rounded-lg w-full max-w-md text-white font-merienda shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold leading-tight">
            Good to See You Again! <br /> Let’s Get Cooking
          </h2>
        </div>

        <form onSubmit={submitHandler} noValidate>
          {hasError && <Error title="" message={errorMessage} />}

          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              required
              className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-firekitchenprimary"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              required
              className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-firekitchenprimary"
            />
          </div>

          <div className="mt-6 mb-4 text-center">
            <button
              type="submit"
              className="border-2 border-firekitchenprimary text-firekitchenprimary px-6 py-2 rounded-md font-semibold hover:bg-firekitchenprimary hover:text-black transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-4 text-neutral-200">
          <p className="mb-1 font-semibold">Don't you have an account?</p>
          <Link
            to="/demo/fire-kitchen/register"
            className="text-firekitchenprimary font-semibold hover:underline"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
