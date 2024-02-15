import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { Navigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: user ? <Navigate to="/browse" /> : <Login />,
    },
    {
      path: "/browse",
      element: user? <Browse /> : <Navigate to="/" />,
    },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        setUser(user);
      } else {
        dispatch(removeUser());
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
