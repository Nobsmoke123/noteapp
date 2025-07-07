import { EyeIcon, EyeOff } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../components/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Login = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { authData, setAuthData } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  const submitForm = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/v1/auth/login", {
        ...formData,
      });
      const { data } = res.data;
      setAuthData({
        token: data.token,
        userId: data.user.id,
        fullname: data.user.fullname,
        email: data.user.email,
        isLoggedIn: true,
      });
      toast.success(`Welcome back ${data.user.fullname}`);
      navigate("/notes");
    } catch (error) {
      console.log("The error is:");
      console.log(error);
      toast.error("An error occured.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("The authData is:");
    console.log(authData);
    if (authData.isLoggedIn) {
      navigate("/notes");
    }
  }, []);
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center border-2 border-neutral rounded-xl bg-neutral w-[500px] h-[500px] px-4">
        <h3 className="text-3xl mb-7 tracking-tighter"> Sign In </h3>
        <form className="flex flex-col gap-5" onSubmit={submitForm}>
          <div className="form-group">
            <label className="block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              className="input w-[300px]"
              placeholder="Where can we reach you?"
              required
            />
          </div>

          <div className="relative form-group  w-[300px]">
            <label className="block">Password</label>
            <input
              type={isClicked ? "text" : "password"}
              className="input w-[300px]"
              name="password"
              onChange={onInputChange}
              value={formData.password}
              placeholder="Secure your account."
              required
            />

            <div onClick={toggleIsClicked}>
              {isClicked ? (
                <EyeIcon className="absolute size-5 top-8 right-1" />
              ) : (
                <EyeOff className="absolute size-5 top-8 right-1" />
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-2">
            {isLoading && (
              <span className="loading loading-dots loading-xl"></span>
            )}
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
