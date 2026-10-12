import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import type { Post } from "../types/post";
import Icon from "./Icon";

type PostFormValues = Omit<Post, "id">;
interface PostFormProps {
  values: PostFormValues;
  onChange: (field: keyof PostFormValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  error: string; isSubmitting: boolean; submitLabel: string; submittingLabel: string; cancelTo: string;
}
function PostForm({ values, onChange, onSubmit, error, isSubmitting, submitLabel, submittingLabel, cancelTo }: PostFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <fieldset disabled={isSubmitting} className="space-y-6">
        <div><label htmlFor="title" className="form-label">제목</label><input id="title" type="text" value={values.title} onChange={(event) => onChange("title", event.target.value)} placeholder="이 기록에 이름을 붙여주세요" className="form-input" /></div>
        <div><label htmlFor="author" className="form-label">작성자</label><input id="author" type="text" value={values.author} onChange={(event) => onChange("author", event.target.value)} placeholder="작성자 이름" className="form-input" /></div>
        <div><label htmlFor="content" className="form-label">내용</label><textarea id="content" value={values.content} onChange={(event) => onChange("content", event.target.value)} rows={9} placeholder="배운 내용이나 나누고 싶은 생각을 자유롭게 적어보세요." className="form-input min-h-60 resize-y" /></div>
      </fieldset>
      {error && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700">{error}</p>}
      <div className="flex flex-wrap justify-end gap-3 border-t border-line pt-6"><Link to={cancelTo} className="btn btn-secondary">취소</Link><button type="submit" disabled={isSubmitting} className="btn btn-primary"><Icon name="edit" className="size-4" />{isSubmitting ? submittingLabel : submitLabel}</button></div>
    </form>
  );
}
export default PostForm;
