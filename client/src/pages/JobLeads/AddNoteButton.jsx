import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateCandidateStatus } from "../../app/slices/candidateSlice";

const AddNoteButton = ({ candidateId, existingNote = "" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(existingNote);
  const dispatch = useDispatch();

  // Update local note if existingNote changes externally
  useEffect(() => {
    if (!isEditing) {
      setNote(existingNote);
    }
  }, [existingNote, isEditing]);

  const handleSaveNote = async () => {
    if (!note.trim()) {
      toast.error("Note cannot be empty.");
      return;
    }

    try {
      await dispatch(
        updateCandidateStatus({ id: candidateId, updateData: { note } })
      ).unwrap();
      toast.success("Note saved successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(`Failed to save note: ${error}`);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
      {isEditing ? (
        <>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Enter note..."
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              resize: "vertical",
              width: "250px",
              marginRight: "0.5rem",
            }}
          />
          <button className="btn btn-primary" onClick={handleSaveNote}>
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setIsEditing(false);
              setNote(existingNote);
            }}
            style={{ marginLeft: "0.5rem" }}
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          className="btn btn-note"
          onClick={() => setIsEditing(true)}
        >
          {existingNote ? "Edit Note" : "Add Note"}
        </button>
      )}
    </div>
  );
};

export default AddNoteButton;
