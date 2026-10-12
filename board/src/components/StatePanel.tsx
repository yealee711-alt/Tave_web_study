import { Link } from "react-router-dom";
import Icon from "./Icon";

function StatePanel({ message, error = false, loading = false }: { message: string; error?: boolean; loading?: boolean }) {
  return (
    <div className="paper mx-auto max-w-3xl py-16 text-center" role={error ? "alert" : "status"}>
      <div className={`mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl ${error ? "bg-rose-50 text-rose-500" : "bg-[#eeebfa] text-accent"}`}>
        {loading ? <span className="size-6 animate-spin rounded-full border-2 border-accent/20 border-t-accent motion-reduce:animate-none" /> : <Icon name="note" />}
      </div>
      <p className="px-4 text-sm leading-7 text-muted">{message}</p>
      {!loading && <Link to="/posts" className="btn btn-secondary mt-6"><Icon name="arrow" />목록으로</Link>}
    </div>
  );
}

export default StatePanel;
