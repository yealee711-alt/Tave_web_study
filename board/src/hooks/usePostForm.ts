import { useState } from "react";
import type { Post } from "../types/post";

type PostFormValues = Omit<Post, "id">;

function usePostForm(
  initialValues: PostFormValues = {
    title: "",
    content: "",
    author: "",
  },
) {
  const [values, setValues] = useState<PostFormValues>(initialValues);
  const [error, setError] = useState("");

  const handleChange = (field: keyof PostFormValues, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    if (
      !values.title.trim() ||
      !values.content.trim() ||
      !values.author.trim()
    ) {
      setError("모든 항목을 입력해주세요.");
      return false;
    }

    setError("");
    return true;
  };

  return {
    values,
    setValues,
    error,
    setError,
    handleChange,
    validate,
  };
}

export default usePostForm;
