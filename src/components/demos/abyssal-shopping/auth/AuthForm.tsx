import React, { useRef, useState } from "react";
import { Form, Link, useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import RegisterInfoModal from "./RegisterInfoModal";
import Error from "../UI/Error";
import SuccessRegisterModal from "./SuccessRegisterModal";
import { useCart } from "../../../../store/demos/abyssal-shopping/CartContext";

const AuthForm = () => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState<any>(null);
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPassRef = useRef<HTMLInputElement>(null)
  const checkRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [openModal, setOpenModal] = useState(!isLogin);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { syncWithLocalStorage } = useCart()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredEmail = emailRef.current!.value.trim();
    const enteredPassword = passwordRef.current!.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = (email: string) => emailRegex.test(email);

    if (!isValidEmail(enteredEmail)) {
      setHasError(true);
      setErrorMessage("Please enter a valid email.");
      return;
    }

    const minPasswordLength = 6;
    if (!isLogin && enteredPassword.length < minPasswordLength) {
      setHasError(true);
      setErrorMessage(`Password must be at least ${minPasswordLength} characters long.`);
      return;
    }

    if (isLogin) {
      // Only email & password needed
      localStorage.setItem("abyssalshopping", enteredEmail)
      const isExistingUser = localStorage.getItem(`abyssalshopping/${enteredEmail}`)
      const user = isExistingUser ? JSON.parse(isExistingUser).email : ""
      if (user === enteredEmail) {
        const userCart = isExistingUser ? JSON.parse(isExistingUser).cart : []
        const userOrders = isExistingUser ? JSON.parse(isExistingUser).orders : []
        const userNotice = isExistingUser ? JSON.parse(isExistingUser).demoNotice : true
        localStorage.setItem(`abyssalshopping/${enteredEmail}`, JSON.stringify({ email: enteredEmail, cart: userCart, orders: userOrders, demoNotice: userNotice }))
      } else {
        localStorage.setItem(`abyssalshopping/${enteredEmail}`, JSON.stringify({ email: enteredEmail, cart: [{ id: "food-001", quantity: 1 }, { id: "office-001", quantity: 1 }], orders: [], demoNotice: true }))
      }
      syncWithLocalStorage(enteredEmail)
      navigate("/demo/abyssal-shopping");
      return;
    }

    // --- Register Mode ---
    const enteredUsername = usernameRef.current!.value.trim();
    const enteredConfirmPass = confirmPassRef.current!.value.trim();
    const isChecked = checkRef.current?.checked;

    if (enteredUsername.length === 0) {
      setHasError(true);
      setErrorMessage("Please enter a valid username.");
      return;
    }

    if (enteredPassword !== enteredConfirmPass) {
      setHasError(true);
      setErrorMessage("Passwords do not match. Please make sure you typed them correctly.");
      return;
    }

    if (!isChecked) {
      setHasError(true);
      setErrorMessage("Please accept the terms of service to proceed with registration.");
      return;
    }

    const checkEmail = localStorage.getItem(`abyssalshopping/${enteredEmail}`)
    if (checkEmail) {
      setHasError(true);
      setErrorMessage("This email already exist");
      return;
    }

    // All passed
    setHasError(false);

    const data = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
    };

    setFormData(data);
    setIsSubmitted(true);
    e.currentTarget.reset();
  };


  const submitModalHandler = () => {
    setIsSubmitted(false)
    navigate("/demo/abyssal-shopping/auth?mode=login")
  }

  return (
    <>
      <RegisterInfoModal isOpen={openModal} onClose={() => setOpenModal(false)} />
      <SuccessRegisterModal isOpen={isSubmitted} onClose={submitModalHandler} formData={formData} />
      <Form onSubmit={submitHandler} className="w-full max-w-md min-h-screen text-white px-4">
        {hasError && <Error title="" message={errorMessage} />}
        {!isLogin && (
          <>
            <label htmlFor="username" className="block mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              ref={usernameRef}
              className="w-full mb-3 px-4 py-2 focus:rounded border-b-2 border-abysssecondary text-black focus:outline-none focus:ring-2 focus:ring-abysssecondary"
            />
          </>
        )}

        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          ref={emailRef}
          className="w-full mb-3 px-4 py-2 focus:rounded border-b-2 border-abysssecondary text-black focus:outline-none focus:ring-2 focus:ring-abysssecondary"
        />

        <label htmlFor="password" className="block mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          ref={passwordRef}
          className="w-full mb-3 px-4 py-2 focus:rounded border-b-2 border-abysssecondary text-black focus:outline-none focus:ring-2 focus:ring-abysssecondary"
        />

        {isLogin && (
          <Link
            to="/demo/abyssal-shopping/reset-password"
            className="block text-end text-white hover:underline mb-3"
          >
            Forgot your password?
          </Link>
        )}

        {!isLogin && (
          <>
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              ref={confirmPassRef}
              className="w-full mb-3 px-4 py-2 focus:rounded border-b-2 border-abysssecondary text-black focus:outline-none focus:ring-2 focus:ring-abysssecondary"
            />
          </>
        )}

        {!isLogin && (
          <div className="flex items-start mb-4">
            <input
              type="checkbox"
              className="mr-2 mt-1"
              ref={checkRef}
            />
            <span>I agree with terms of service</span>
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 px-6 py-3 text-lg rounded-lg transition-colors 
            ${isSubmitting
                ? "bg-gradient-to-b from-[rgb(188,100,220)] to-[rgb(105,1,145)] text-neutral-300"
                : "bg-gradient-to-b from-abyssalternative to-[rgb(35,1,45)] hover:from-[rgb(158,2,220)] text-white"
              }`}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default AuthForm;
