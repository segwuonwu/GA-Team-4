import { useState } from "react";

const useSearch = formSubmit => {
  const [input, setInput] = useState("");

  const handleInputChange = e => {
    e.persist();
    setInput(e.target.value);
  }

  const handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    formSubmit();
  }

  return {
    setInput,
    input,
    handleInputChange,
    handleSubmit
  }
}

export default useSearch;