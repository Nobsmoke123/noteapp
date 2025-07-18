import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-x-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-tertiary font-mono tracking-tighter">
            Thinkboard
          </h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" /> Add Note
            </Link>

            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" /> Add Tag
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
