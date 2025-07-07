import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const toggleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:8000/api/v1/auth/register", {
        ...formData,
      });
      toast.success("You can log in now.");
      navigate("/signin");
    } catch (error) {
      console.log("The error is:");
      console.log(error);
      toast.error("An error occured. Please try again later.");
    }
    //TODO:
    setIsLoading(false);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center border-2 border-neutral rounded-xl bg-neutral w-[500px] h-[500px] px-4">
        <h3 className="text-3xl mb-7 tracking-tighter"> Sign Up </h3>
        <form onSubmit={submitForm} className="flex flex-col gap-5">
          <div className="form-group">
            <label htmlFor="fullname" className="block">
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              onChange={onInputChange}
              value={formData.fullname}
              className="input w-[300px]"
              placeholder="What should we call you?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={onInputChange}
              value={formData.email}
              className="input w-[300px]"
              placeholder="Where can we reach you?"
            />
          </div>

          <div className="relative form-group  w-[300px]">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type={isClicked ? "text" : "password"}
              id="password"
              name="password"
              onChange={onInputChange}
              value={formData.password}
              className="input w-[300px]"
              placeholder="Secure your account."
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
