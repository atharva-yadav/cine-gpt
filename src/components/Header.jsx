import { useLocation, useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";
import logoutImage from "../assets/logout.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice"

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        if (location.pathname === "/" || location.pathname === "/login") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
      }
    });
    // unsubsribe when component unmounts
    return unsubscribe;
  }, [dispatch, location.pathname, navigate]);

  const user = useSelector((store) => store.user);
  const logoutHandler = () => {
    console.info("User logging out...");
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        console.log("Error occured: ", error);
      });
  };
  return (
    <header className="fixed top-0 left-0 z-50 isolate flex w-full items-center justify-between px-6 py-3 md:px-12 md:py-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-36 bg-linear-to-b from-black via-black/70 to-transparent md:h-52"
      />
      <img
        src={logoImage}
        alt="header-logo-cinegpt"
        className="relative z-10 w-20 cursor-pointer mix-blend-screen md:w-40 lg:w-42"
        onClick={() => navigate("/browse")}
      />
      {user && (
        <div className="relative z-10 flex items-center gap-3">
          <button
            onClick={logoutHandler}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white text-xs md:text-sm font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-md transition duration-200 cursor-pointer shadow-md"
          >
            <span>Sign Out</span>
            <img
              src={logoutImage}
              alt="Sign Out"
              className="h-4 w-4 invert"
            />
          </button>
        </div>
      )}
      {!user && location.pathname !== "/" && location.pathname !== "/login" && (
        <button
          onClick={() => navigate("/login")}
          className="relative z-10 min-h-11 cursor-pointer rounded-md border border-white/30 px-4 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Sign In
        </button>
      )}
    </header>
  );
};

export default Header;
