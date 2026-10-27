import { useRef, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import validate from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const navigate = useNavigate();
  const [isSignInForm, setisSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };

  const email = useRef(null);
  const password = useRef(null);
  const [validationErrorMessage, setvalidationErrorMessage] = useState(null);
  const handleBtnClick = () => {
    const msg = validate(email.current.value, password.current.value);
    setvalidationErrorMessage(msg);

    if (msg) return;

    // Create user if Email & Password is valid
    if (!isSignInForm) {
      // Sign Up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.info("User: ", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setvalidationErrorMessage(
            `${errorMessage} Error code: ${errorMessage}`,
          );
        });
    } else {
      // Sign In logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setvalidationErrorMessage(
            `${errorMessage} Error code: ${errorMessage}`,
          );
        });
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 pb-10 pt-28 text-white sm:px-6">
      <Header />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,38,38,0.18),_transparent_55%)]"
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative z-10 w-full max-w-md rounded-xl border border-white/10 bg-zinc-900/85 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-9"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
          Your next favorite film awaits
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          {isSignInForm
            ? "Sign in to discover movies picked for you."
            : "Create an account and find your next movie night favorite."}
        </p>

        <div className="mt-8 space-y-5">
          {!isSignInForm && (
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-200">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                autoComplete="name"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-200">
              Email
            </label>
            <input
              id="email"
              name="email"
              ref={email}
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-200">
              Password
            </label>
            <input
              id="password"
              name="password"
              ref={password}
              type="password"
              placeholder="Enter your password"
              autoComplete={isSignInForm ? "current-password" : "new-password"}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            />
          </div>
        </div>

        {validationErrorMessage && (
          <p role="alert" className="mt-4 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {validationErrorMessage}
          </p>
        )}
        <button
          type="submit"
          className="mt-7 w-full cursor-pointer rounded-lg bg-red-600 p-3 font-semibold text-white transition-colors duration-200 hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
          onClick={handleBtnClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="mt-6 text-center text-sm text-zinc-400">
          {isSignInForm ? "New to CineGPT?" : "Already registered?"}{" "}
          <button
            type="button"
            className="cursor-pointer text-red-500"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? "Sign Up Now" : "Sign In"}
          </button>
        </p>
        <div className="mt-6 border-t border-white/10 pt-5 text-center">
          <button
            type="button"
            onClick={() => navigate("/browse")}
            className="min-h-11 cursor-pointer px-4 text-sm font-medium text-zinc-300 transition-colors hover:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            Explore as guest
            <span aria-hidden="true"> →</span>
          </button>
        </div>
      </form>
    </main>
  );
};

export default Login;
