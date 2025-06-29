import { useRef, useState } from "react";
import { Form } from "react-router-dom";
import Error from "../UI/Error";

function ForgotPass() {
  const [hasError, setHasError] = useState(false);
  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null)
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = (email: string) => emailRegex.test(email);

    const enteredEmail = emailRef.current!.value;

    if (!isValidEmail(enteredEmail)) {
      setHasError(true);
      setErrorTitle("")
      setErrorMessage("Please enter a valid email.");
      return;
    }

    setHasError(true)
    setErrorTitle("Demo Mode")
    setErrorMessage("Password reset functionality is not available.")

    e.currentTarget.reset();
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-abysssecondary via-abysssecondary to-abyssalternative text-white flex items-center justify-center">
      <Form
        onSubmit={submitHandler}
        className="flex flex-col items-center w-full max-w-md px-6"
      >
        <h1 className="mb-10 pb-4 text-center font-pacifico text-4xl text-abyssalternative">
          Abyss
        </h1>
        {hasError && <Error title={errorTitle} message={errorMessage} />}
        <label htmlFor="email" className="mb-2 text-center text-lg text-abyssalternative font-medium">
          Enter your email address to receive a password reset link.
        </label>
        <input
          type="email"
          id="email"
          name="email"
          ref={emailRef}
          className="w-full mb-6 px-4 py-2 focus:rounded border-b-2 border-abyssalternative text-black focus:outline-none focus:ring-2 focus:ring-abyssalternative"
        />
        <button
          type="submit"
          className="bg-gradient-to-b from-abyssalternative to-[rgb(35,1,45)] hover:from-[rgb(158,2,220)] text-white px-6 py-3 rounded-md text-lg"
        >
          Send Reset Link
        </button>
      </Form>
    </div>
  );
}

export default ForgotPass;
