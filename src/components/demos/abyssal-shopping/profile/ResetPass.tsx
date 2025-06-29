import type React from "react";
import { useRef, useState } from "react";
import { Form } from "react-router-dom";
import Error from "../UI/Error";

function ResetPass() {
  const passwordRef = useRef<HTMLInputElement>(null)
  const newPassdRef = useRef<HTMLInputElement>(null)
  const confirmNewPassdRef = useRef<HTMLInputElement>(null)
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorTitle, setErrorTitle] = useState<string>("");
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const enteredPassword = passwordRef.current?.value;
    const enteredNewPassword = newPassdRef.current?.value;
    const enteredConfirmNewPassword = confirmNewPassdRef.current?.value;

    //check if enteredPassword is correct
    //..

    //check current password is the same with new password
    if (enteredPassword?.trim() === enteredNewPassword?.trim()) {
      setHasError(true);
      setErrorMessage("Current password and new password cannot be the same");
      return
    }

    const minPasswordLength = 6;
    if (enteredNewPassword!.length < minPasswordLength) {
      setHasError(true);
      setErrorMessage(`Password must be at least ${minPasswordLength} characters long`);
      return;
    }

    if (enteredNewPassword?.trim() !== enteredConfirmNewPassword?.trim()) {
      setHasError(true);
      setErrorMessage("Passwords do not match. Please make sure you typed them correctly");
      return;
    }

    setHasError(true);
    setErrorTitle("Demo Mode")
    setErrorMessage("Password reset functionality is not available.")
    // change password
    return;
  };

  return (
    <div className="w-full mt-10 flex flex-col justify-center items-center text-black">
      {hasError && <Error title={errorTitle || ""} message={errorMessage} />}
      <Form
        onSubmit={submitHandler}
        className="flex flex-col items-center justify-start md:justify-center w-full max-w-xs px-4"
      >
        <label htmlFor="password" className="self-start mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          ref={passwordRef}
          className="w-full mb-4 px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
        />

        <label htmlFor="new-password" className="self-start mb-2">
          New password
        </label>
        <input
          type="password"
          id="new-password"
          name="new-password"
          ref={newPassdRef}
          className="w-full mb-4 px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
        />

        <label htmlFor="confirm-new-password" className="self-start mb-2">
          Confirm new password
        </label>
        <input
          type="password"
          id="confirm-new-password"
          name="confirm-new-password"
          ref={confirmNewPassdRef}
          className="w-full mb-4 px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
        />

        <button
          type="submit"
          className="mt-4 px-4 py-3 rounded-lg bg-gradient-to-b from-purple-600 to-[rgb(35,1,45)] text-white text-base font-semibold hover:bg-purple-700 transition"
        >
          Change Password
        </button>
      </Form>
    </div>
  );
}

export default ResetPass;
