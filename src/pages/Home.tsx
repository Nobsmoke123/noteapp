import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import RateLimiter from "../components/RateLimiter";
import axios from "axios";
import AuthContext from "../components/AuthContext";
import { useNavigate } from "react-router";

export interface Note {
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  id: string;
  tags: Array<Record<string, string>>;
  userId: string;
}

const Home = () => {
  const [isRateLimited, setIsRateLimited] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { authData } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authData.isLoggedIn) {
      navigate("/signin");
    }

    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/api/v1/notes/", {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });
        console.log("The notes are:");
        console.log(res.data);
        const { data } = res.data;
        setIsRateLimited(false);
        setNotes(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchNotes();
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        {isRateLimited && <RateLimiter />}

        <div className="max-w-7xl mx-auto p-4 mt-6">
          {isLoading && (
            <span className="loading loading-spinner loading-xl"></span>
          )}

          {notes.length > 0 &&
            notes.map((note: Note, index: number) => (
              <div key={index}>{note.content}</div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
