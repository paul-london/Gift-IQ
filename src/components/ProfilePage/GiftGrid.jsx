import { useState } from "react";
import GiftCard from "./GiftCard";
import "./GiftGrid.css";

import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

export default function GiftGrid({ gifts, onStatusChange, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!gifts || gifts.length === 0) {
    return <p>No gifts saved yet.</p>;
  }

  // Called when user clicks the delete button on a card
  function handleAskDelete(index) {
    setSelectedIndex(index);
    setShowConfirm(true);
  }

  // Called when user clicks "Yes" in the modal
  function handleConfirmDelete() {
    if (selectedIndex === null) return;
    onDelete(selectedIndex);          // <-- calls ProfilePage delete handler
    setShowConfirm(false);
    setSelectedIndex(null);
  }

  // Called when user clicks "No"
  function handleCancelDelete() {
    setShowConfirm(false);
    setSelectedIndex(null);
  }

  return (
    <>
      <div className="gift-list">
        {gifts.map((gift, index) => (
          <GiftCard
            key={index}
            gift={gift}
            index={index}
            onStatusChange={onStatusChange}
            // instead of calling ProfilePage directly, open modal
            onDelete={handleAskDelete}
          />
        ))}
      </div>

      {/* Confirmation modal renders here, only when showConfirm = true */}
      <ConfirmationModal
        open={showConfirm}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
