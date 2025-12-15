// src/components/ProfilePage/ProfilePage.jsx
import "./ProfilePage.css";
import UserInfoCard from "./UserInfoCard/UserInfoCard";
import BudgetSlider from "./BudgetSlider";
import GiftGrid from "./GiftGrid";
import AddGiftForm from "./AddGiftForm/AddGiftForm";
import ConfirmModal from "../ConfirmationModal/ConfirmationModal";

import {
  getProfile,
  updateBudget,
  addGift,
  updateGiftStatus,
  deleteGift,
} from "../../utils/api";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ user, token }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [giftToDelete, setGiftToDelete] = useState(null);

  const [newGift, setNewGift] = useState({
    name: "",
    price: "",
    link: "",
    description: "",
  });

  // modal state for deleting a gift
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    index: null,
  });

  // Load profile
  useEffect(() => {
    async function load() {
      try {
        const authToken = token || localStorage.getItem("token");
        if (!authToken) {
          console.log("⚠ No token found");
          return;
        }

        const data = await getProfile(authToken);
        setProfile(data);
      } catch (err) {
        console.error("Profile load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  // Update budget
  async function handleBudgetChange(value) {
    try {
      const updated = await updateBudget(value);
      setProfile(updated);
    } catch (err) {
      console.error("Budget update error:", err);
    }
  }

  // Add new gift
  async function handleAddGift(e) {
    e.preventDefault();

    try {
      const res = await addGift(newGift);
      setProfile((prev) => ({ ...prev, gifts: res.data }));
      setNewGift({ name: "", price: "", link: "", description: "" });
    } catch (err) {
      console.error("Add gift error:", err);
    }
  }

  // Update gift status
  async function handleStatusChange(index, status) {
    try {
      const updatedGift = await updateGiftStatus(index, status);

      setProfile((prev) => {
        const copy = [...prev.gifts];
        copy[index] = updatedGift.data;
        return { ...prev, gifts: copy };
      });
    } catch (err) {
      console.error("Status update error:", err);
    }
  }

  // STEP 1: open delete confirmation modal
  function askDeleteGift(index) {
    setDeleteModal({ open: true, index });
  }

  // STEP 2: actually delete once user confirms
  async function confirmDeleteGift() {
    try {
      const updated = await deleteGift(deleteModal.index);
      setProfile((prev) => ({ ...prev, gifts: updated.data }));
    } catch (err) {
      console.error("Delete gift error:", err);
    } finally {
      setDeleteModal({ open: false, index: null });
    }
  }

  // Cancel delete
  function cancelDeleteGift() {
    setDeleteModal({ open: false, index: null });
  }

  // cancel / go back (you can add a separate modal later if you want)
  function handleBackClick() {
    navigate("/smart_gift_planner");
  }

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Could not load profile.</p>;

  return (
    <div className="profile-container">
      {/* Back Button */}
      <button className="back-btn" onClick={handleBackClick}>
        ← Back to Homepage
      </button>

      {/* HEADER ROW: avatar/info (left) + budget (right) */}
      <div className="profile-header">
        {/* Left: avatar, name, relationship, icons */}
        <UserInfoCard user={profile} />

        {/* Right: budget + save/cancel */}
        <div className="profile-right">
          <div className="budget-section">
            <label className="budget-label"></label>
            <BudgetSlider
              value={profile.budget}
              onChange={handleBudgetChange}
            />
          </div>

          <div className="profile-actions">
            <button className="save-btn">Save Changes</button>
            <button className="cancel-btn" onClick={handleBackClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>

     
      <h2 className="gift-title">Your Saved Gifts</h2>

      <GiftGrid
        gifts={profile.gifts}
        onStatusChange={handleStatusChange}
        onDelete={askDeleteGift} 
      />

     
      <AddGiftForm
        onAdd={handleAddGift}
        newGift={newGift}
        setNewGift={setNewGift}
      />

   
      <ConfirmModal
        open={deleteModal.open}
        title="Delete this gift?"
        message="This gift will be removed from your saved list."
        onConfirm={confirmDeleteGift}
        onCancel={cancelDeleteGift}
      />
    </div>
  );
}
