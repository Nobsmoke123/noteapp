import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import RichEditor from "../components/RichEditor";
import axios from "axios";
import AuthContext from "../components/AuthContext";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

export interface AddNote {
  tag: string;
  content: string;
}

export interface Tag {
  createdAt: string;
  deletedAt: string;
  id: string;
  name: string;
  userId: string;
}

const CreateNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [formData, setFormData] = useState<AddNote>({
    tag: "",
    content: "",
  });

  const { authData } = useContext(AuthContext);

  const navigate = useNavigate();

  const submitForm = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (formData.tag === "" || content === "") {
      toast.error("Please select a tag and enter a note.");
      setIsLoading(false);
      return;
    }
    try {
      await axios.post(
        "http://localhost:8000/api/v1/notes",
        {
          tag: formData.tag,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      toast.success("Note created successfully.");
      navigate("/notes");
    } catch (error) {
      console.log("The error is:");
      console.log(error);
      toast.error("An error occurred.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!authData.isLoggedIn) {
      navigate("/signin");
    }

    const fetchTags = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/tags/", {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });
        const { data } = res.data;
        console.log("The tags are: ");
        console.log(res.data);
        setTags(data);
      } catch (error) {
        console.log("The error is:");
        console.log(error);
      }
    };

    fetchTags();
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-w-screen min-h-screen p-8 flex">
      <div className="shadow-md rounded-xl border-3 border-amber-300 w-[600px] h-[500px] mx-auto p-8 flex flex-col justify-center">
        <Link to={"/notes"} className="link link-primary">
          <ArrowLeft className="size-5 inline text-primary text-2xl tracking-tighter" />
          Back to Notes
        </Link>

        <h2 className="text-3xl text-center tracking-tighter mt-4">
          Create Note
        </h2>

        <form
          action=""
          onSubmit={submitForm}
          className="flex flex-col gap-5 mt-4"
        >
          <div className="form-group">
            <label htmlFor="tag" className="block mb-2">
              Tag
            </label>
            <select
              name="tag"
              className="input w-[500px]"
              id="tag"
              onChange={onInputChange}
              required
            >
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="block mb-2">
              Note
            </label>
            <RichEditor onChange={setContent} />
          </div>

          <button type="submit" className="btn btn-primary mt-6">
            {isLoading && (
              <span className="loading loading-dots loading-xl"></span>
            )}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
