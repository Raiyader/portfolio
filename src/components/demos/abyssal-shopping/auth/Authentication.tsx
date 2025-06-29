import { Link, useNavigation, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import AuthForm from "./AuthForm";

const Authentication = () => {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="w-full h-screen flex flex-col items-center bg-gradient-to-b from-abysssecondary to-abyssalternative text-abyssalternative font-roboto">
      <h1 className="my-10 pb-6 border-b border-neutral-300 w-1/2 text-center font-pacifico text-4xl text-abyssalternative">
        Abyss
      </h1>
      <h2 className="my-4 text-xl text-white">
        {isLogin ? "Welcome back" : "Create your account"}
      </h2>

      {isSubmitting && <LoadingSpinner />}

      <AuthForm />

      {isLogin ? (
        <>
          <p className="mt-8 mb-4 text-white">Don't you have an account?</p>
          <Link to="?mode=signup" className="text-white hover:underline">
            Create an Account
          </Link>
        </>
      ) : (
        <>
          <p className="mt-8 mb-4 text-white">Do you have an account?</p>
          <Link to="?mode=login" className="text-white hover:underline">
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default Authentication;
