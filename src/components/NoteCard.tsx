import { Link } from "react-router";
import type { Note } from "../pages/Home";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";

const NoteCard = ({ note }: { note: Note }) => {
  return (
    <Link
      to={`/notes/${note.id}`}
      className="card bg-base-100 hover:shadow-lg transition-all  duration-200 border-2 border-solid border-tertiary w-[340px]"
    >
      <div className="card-body">
        <h4 className="card-title text-tertiary-100 tracking-tighter">
          #{note.id}
        </h4>
        <p>{note.content.substring(0, 500)}...</p>
        <div className="card-actions flex justify-between">
          <span>{formatDate(note.createdAt)}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error">
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
