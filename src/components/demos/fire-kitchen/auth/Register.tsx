import React, { useRef, useState } from "react";
import orange from "../../../../assets/demos/fire-kitchen/orange-fruit.webp";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../../../components/demos/fire-kitchen/UI/Error";
import RegisterInfoModal from "../UI/RegisterInfoModal";
import SuccessRegisterModal from "../UI/SuccessRegisterModal";

const Register = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkRef = useRef<HTMLInputElement>(null);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(null);
  const navigate = useNavigate()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredEmail = emailRef.current!.value;
    const enteredFirstName = firstNameRef.current!.value;
    const enteredLastName = lastNameRef.current!.value;
    const enteredPassword = passwordRef.current!.value;
    const isChecked = checkRef.current?.checked;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValidEmail = (email: string) => emailRegex.test(email);

    if (
      enteredFirstName.trim().length == 0 ||
      enteredLastName.trim().length == 0 ||
      !isChecked
    ) {
      setHasError(true);
      setErrorMessage("All fields are required!");
      return;
    }

    if (!isValidEmail(enteredEmail)) {
      setHasError(true);
      setErrorMessage("Please enter a valid email");
      return;
    }

    const minPasswordLength = 6

    if (enteredPassword.trim().length < minPasswordLength) {
      setHasError(true);
      setErrorMessage(`Password must be at least ${minPasswordLength} characters long!`);
      return;
    }

    setHasError(false);

    const data = {
      firstName: enteredFirstName.charAt(0).toUpperCase() + enteredFirstName.slice(1).toLowerCase(),
      lastName: enteredLastName.charAt(0).toUpperCase() + enteredLastName.slice(1).toLowerCase(),
      email: enteredEmail,
      password: enteredPassword
    }

    setFormData(data)
    setIsSubmitted(true)
    e.currentTarget.reset();
  };

  const submitModalHandler = () => {
    setIsSubmitted(false)
    navigate("/demo/fire-kitchen/login")
  }

  return (
    <>
      <RegisterInfoModal isOpen={openInfoModal} onClose={() => setOpenInfoModal(false)} />
      <SuccessRegisterModal isOpen={isSubmitted} onClose={submitModalHandler} formData={formData} />
      <div
        className="w-full min-h-screen bg-cover bg-center flex flex-col justify-center items-center px-4 py-10"
        style={{ backgroundImage: `url(${orange})` }}
      >
        <div className="bg-black/60 p-8 rounded-lg w-full max-w-xl text-white font-merienda shadow-lg">
          <div className="mb-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              Join the Kitchen Crew!
            </h2>
            <h3 className="text-lg md:text-xl mt-2 font-semibold">Create an Account</h3>
          </div>

          <form onSubmit={submitHandler}>
            {hasError && <Error title="" message={errorMessage} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block font-semibold mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  ref={firstNameRef}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-firekitchenprimary"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block font-semibold mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  ref={lastNameRef}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-firekitchenprimary"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                ref={emailRef}
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
                className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-firekitchenprimary"
              />
            </div>

            <div className="mb-5">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="check"
                  name="check"
                  ref={checkRef}
                  required
                  className="form-checkbox h-4 w-4 text-orange-500 mr-2"
                />
                <span className="font-semibold">I agree with Terms of Service</span>
              </label>
            </div>

            <div className="text-center mb-6">
              <button
                type="submit"
                className="border-2 border-firekitchenprimary text-firekitchenprimary px-6 py-2 rounded-md font-semibold hover:bg-firekitchenprimary hover:text-black transition-colors duration-300"
              >
                Register
              </button>
            </div>
          </form>

          <div className="text-center mt-4 text-neutral-200">
            <p className="mb-1 font-semibold">Already have an account?</p>
            <Link
              to="/demo/fire-kitchen/login"
              className="text-firekitchenprimary font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
