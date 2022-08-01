import React from 'react'
import { useSelector } from "react-redux";
import { Navigate, Route,Routes } from "react-router-dom";

export const ProtectedRoute = ({component:Component,...rest}) => {

    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
 <>

{loading === false && (
    <Routes>

        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Navigate to="/login" />;
            }

            if (isAuthenticated === true && user.role !== "admin") {
              return <Navigate to="/login" />;
            }

            return <Component {...props} />;
          }}
        />
    </Routes>
      )}
 </>
  )
}
