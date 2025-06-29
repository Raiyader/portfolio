import type React from "react";
import { Form } from "react-router-dom";

const AccountInfo = () => {
  const email = localStorage.getItem("abyssalshopping")
  const user = localStorage.getItem(`abyssalshopping/${email}`);
  const userEmail = user ? JSON.parse(user).email : ""

  const addAddressHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    return;
  };

  return (
    <ul className="flex justify-center items-center mx-auto grid gap-6 w-full max-w-3xl px-4 py-8">
      <li className="grid grid-cols-[30%_1fr] gap-x-12">
        <p className="font-medium pl-8">Username:</p>
        <p className="flex items-center">Test User</p>
      </li>

      <li className="grid grid-cols-[30%_1fr] gap-x-12">
        <p className="font-medium pl-8">Email:</p>
        <p className="flex items-center">{userEmail}</p>
      </li>

      <li className="grid grid-cols-[30%_1fr] gap-x-12">
        <p className="font-medium pl-8">Address:</p>
        <div className="flex flex-col items-start">
          <Form onSubmit={addAddressHandler} className="w-full max-w-md">
            <textarea
              id="address"
              name="address"
              rows={5}
              className="w-full border border-neutral-300 rounded p-2 text-base focus:outline-none focus:ring-2 focus:ring-abyssalternative"
            />
            <button
              type="submit"
              className="mt-4 px-8 py-3 text-white rounded text-base font-medium bg-gradient-to-b from-[rgb(158,0,220)] to-[rgb(35,1,45)] hover:from-[rgb(158,2,220)] transition-colors"
            >
              Add Address
            </button>
          </Form>
        </div>
      </li>
    </ul>
  );
};

export default AccountInfo;
