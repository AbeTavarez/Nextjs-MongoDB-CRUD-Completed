"use client";
import { useState } from "react";
import { deleteTodo, updateTodo } from "@/actions";

export default function Todo({ text, id }) {
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTodo(id, newText)
    setShowUpdateInput(!showUpdateInput);
  };

  return (
    <div className="border rounded p-5 flex justify-between items-center min-w-96 mt-5 min-h-24">
      {/* TODO TEXT  */}
      <div>{text}</div>

      {/* UPDATE TODO INPUT  */}
      {showUpdateInput && (
        <input
          className="text-black mx-2 rounded"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          type="text"
        />
      )}

      {/* CANCEL BUTTON OR DELETE BUTTON */}
      <div className="space-x-5">
        {showUpdateInput ? (
          <button
            onClick={() => setShowUpdateInput(!showUpdateInput)}
            className="hover:border hover:rounded p-1"
          >
            CANCEL
          </button>
        ) : (
          <button
            onClick={() => deleteTodo(id)}
            className="hover:border hover:rounded p-1"
          >
            DELETE
          </button>
        )}

        {/* SAVE BUTTON OR UPDATE BUTTON  */}
        {showUpdateInput ? (
          <button
            onClick={handleUpdate}
            className="hover:border hover:rounded p-1"
          >
            SAVE
          </button>
        ) : (
          <button
            onClick={() => setShowUpdateInput(!showUpdateInput)}
            className="hover:border hover:rounded p-1"
          >
            UPDATE
          </button>
        )}
      </div>
    </div>
  );
}
