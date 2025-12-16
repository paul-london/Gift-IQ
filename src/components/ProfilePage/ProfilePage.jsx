import "./ProfilePage.css";
import UserInfoCard from "./UserInfoCard/UserInfoCard";
import BudgetSlider from "./BudgetSlider";
import GiftGrid from "./GiftGrid";
import AddGiftForm from "./AddGiftForm/AddGiftForm";
import ConfirmModal from "../ConfirmationModal/ConfirmationModal";
import UnsavedChangesModal from "../UnsavedChangesModal/UnsavedChangesModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import UploadAvatarModal from "../UploadAvatarModal/UploadAvatarModal";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../utils/constants";

import {
  getProfile,
  updateBudget,
  addGift,
  updateGiftStatus,
  deleteGift,
  uploadAvatar,
  updateProfile,
} from "../../utils/api";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ currentTab, token, setCurrentTab }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isSavedView = params.get("saved") === "true";
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [newGift, setNewGift] = useState({
    name: "",
    price: "",
    link: "",
    description: "",
  });

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    index: null,
  });

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
        setHasUnsavedChanges(false);
      } catch (err) {
        console.error("Profile load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  useEffect(() => {
    if (currentTab === "saved") {
      navigate("/smart_gift_planner/profile");
    }
  }, []);

  async function handleBudgetChange(value) {
    setHasUnsavedChanges(true);
    try {
      const authToken = token || localStorage.getItem("token");

      const updated = await updateBudget(authToken, value);
      setProfile(updated);
    } catch (err) {
      console.error("Budget update error:", err);
    }
  }

  async function handleAddGift(form) {
    setHasUnsavedChanges(true);
    try {
      const authToken = token || localStorage.getItem("token");

      const updated = await addGift(authToken, form);

      setProfile((prev) => ({
        ...prev,
        gifts: updated,
      }));
    } catch (err) {
      console.error("Add gift error:", err);
    }
  }
  async function handleStatusChange(index, status) {
    setHasUnsavedChanges(true);
    try {
      const authToken = token || localStorage.getItem("token");

      const updatedGift = await updateGiftStatus(authToken, index, status);

      setProfile((prev) => {
        const copy = [...prev.gifts];
        copy[index] = updatedGift;
        return { ...prev, gifts: copy };
      });
    } catch (err) {
      console.error("Status update error:", err);
    }
  }

  function askDeleteGift(index) {
    setDeleteModal({ open: true, index });
  }
  async function confirmDeleteGift() {
    try {
      const authToken = token || localStorage.getItem("token");

      const updated = await deleteGift(authToken, deleteModal.index);

      setProfile((prev) => ({ ...prev, gifts: updated }));
    } catch (err) {
      console.error("Delete gift error:", err);
    } finally {
      setDeleteModal({ open: false, index: null });
    }
  }

  function cancelDeleteGift() {
    setDeleteModal({ open: false, index: null });
  }

  function handleBackClick() {
    if (isSavedView) {
      navigate("/smart_gift_planner");
      return;
    }

    if (hasUnsavedChanges) {
      setShowUnsavedModal(true);
    } else {
      navigate("/smart_gift_planner");
    }
  }

  function confirmLeavePage() {
    setHasUnsavedChanges(false);
    setCurrentTab("home");
    navigate("/smart_gift_planner");
  }

  function cancelLeavePage() {
    setShowUnsavedModal(false);
  }

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Could not load profile.</p>;

  async function handleSaveChanges() {
    try {
      const authToken = token || localStorage.getItem("token");

      if (!authToken) {
        console.error("❌ No token found when saving");
        return;
      }

      const updated = await updateBudget(authToken, profile.budget);
      setProfile(updated);
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error("Save error:", err);
    }
  }
  function handleEditProfile() {
    setShowEditModal(true);
  }

  function closeEditModal() {
    setShowEditModal(false);
  }
  async function saveProfileAvatar(file) {
    try {
      const authToken = token || localStorage.getItem("token");
      const updated = await uploadAvatar(authToken, file);

      setProfile((prev) => ({
        ...prev,
        avatar: updated.avatar,
      }));
    } catch (err) {
      console.error("Upload error:", err);
    }
  }
  function openAvatarUploader() {
    setShowAvatarModal(true);
  }
  async function handleSaveProfile(updatedFields) {
    try {
      const authToken = token || localStorage.getItem("token");

      const updated = await updateProfile(authToken, updatedFields);

      setProfile((prev) => ({
        ...prev,
        ...updated,
      }));

      setShowEditModal(false);
    } catch (err) {
      console.error("Profile update error:", err);
    }
  }

  return (
    <div className="profile-container">
      <button className="back-btn" onClick={handleBackClick}>
        ← Back to Homepage
      </button>

      {!isSavedView && (
        <div className="profile-header">
          <UserInfoCard
            user={profile}
            onEditProfile={handleEditProfile}
            onChangeAvatar={openAvatarUploader}
          />
          <BudgetSlider value={profile.budget} onChange={handleBudgetChange} />
          <div className="profile-right">
            <div className="profile-actions">
              <button className="save-btn" onClick={handleSaveChanges}>
                Save Changes
              </button>
              <button className="cancel-btn" onClick={handleBackClick}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <h2 className="gift-title">Your Saved Gifts</h2>
      <GiftGrid
        gifts={profile.gifts}
        onStatusChange={handleStatusChange}
        onDelete={askDeleteGift}
      />
      {!isSavedView && (
        <AddGiftForm
          onAdd={handleAddGift}
          newGift={newGift}
          setNewGift={setNewGift}
        />
      )}
      <ConfirmModal
        open={deleteModal.open}
        title="Delete this gift?"
        message="This gift will be removed from your saved list."
        onConfirm={confirmDeleteGift}
        onCancel={cancelDeleteGift}
      />
      <UnsavedChangesModal
        open={showUnsavedModal}
        onConfirm={confirmLeavePage}
        onCancel={cancelLeavePage}
      />
      {showEditModal && (
        <EditProfileModal
          open={showEditModal}
          onClose={closeEditModal}
          onSave={handleSaveProfile}
          currentName={profile.name}
          currentAvatar={profile.avatar}
          currentRelationship={profile.relationship}
        />
      )}
      {showAvatarModal && (
        <UploadAvatarModal
          open={showAvatarModal}
          onClose={() => setShowAvatarModal(false)}
          onUploaded={saveProfileAvatar}
          token={token || localStorage.getItem("token")}
          currentAvatar={profile?.avatar ? `${baseUrl}${profile.avatar}` : ""}
        />
      )}
    </div>
  );
}
