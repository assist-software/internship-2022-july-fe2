import React from "react";
import useAuth from "../../hooks/useAuth";

const Onboarding = () => {
  const { setAuth } = useAuth();
  return (
    <div>
      <h1>Login page</h1>
      <button onClick={() => setAuth({ name: "Team undefined" })}>Login</button>
    </div>
  );
};

export default Onboarding;
