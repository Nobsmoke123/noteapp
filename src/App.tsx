import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import NoteDetail from "./pages/NoteDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </>
  );
}

export default App;
