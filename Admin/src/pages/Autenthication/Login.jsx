import React, { useState, useRef } from "react";
import ButtonWrapper from "../../Components/Buttons";
import Input from "../../Components/Input";
import { FetchData } from "../../Utils/fetchFromAPI";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formRef = useRef(null);

  const handleemailChange = (e) => {
    console.log("Email:", e.target.value);
    setemail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    console.log("Password:", e.target.value);
    setPassword(e.target.value);
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      email,
      password,
    };
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Form data:", data);

    try {
      const response = await FetchData("admin/login", "post", data);
      if (response && response.data) {
        localStorage.setItem("AccessToken", response.data.token);
        window.location.href = "/home";
      }
    } catch (error) {
      setError("Login failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-primary ">
      <div className="flex flex-col justify-center items-center w-full">
        <section className="flex justify-center items-center w-full">
          <div className="flex justify-center items-center flex-col gap-10 py-20 w-[30%] rounded-xl drop-shadow-lg bg-decent-white">
            <form
              ref={formRef}
              className="flex justify-center items-center flex-col gap-5 w-[70%]"
              onSubmit={login}
            >
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleemailChange}
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <ButtonWrapper
                type="submit"
                children={loading ? "Logging in..." : "Login"}
              />
            </form>
            {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
