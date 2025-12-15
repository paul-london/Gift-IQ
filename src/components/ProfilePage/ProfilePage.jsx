import "./ProfilePage.css";
import UserInfoCard from "./UserInfoCard/UserInfoCard";
import BudgetSlider from "./BudgetSlider";
import GiftGrid from "./GiftGrid";
import AddGiftForm from "./AddGiftForm/AddGiftForm";

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

  const [newGift, setNewGift] = useState({
    name: "",
    price: "",
    link: "",
    description: "",
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
    const updated = await updateBudget(value);
    setProfile(updated);
  }

  // Add new gift
  async function handleAddGift(e) {
    e.preventDefault();

    const res = await addGift(newGift);
    setProfile((prev) => ({ ...prev, gifts: res.data }));
    setNewGift({ name: "", price: "", link: "", description: "" });
  }

  // Update gift status
  async function handleStatusChange(index, status) {
    const updatedGift = await updateGiftStatus(index, status);

    setProfile((prev) => {
      const copy = [...prev.gifts];
      copy[index] = updatedGift.data;
      return { ...prev, gifts: copy };
    });
  }

  // Delete gift
  async function handleDeleteGift(index) {
    const updated = await deleteGift(index);
    setProfile((prev) => ({ ...prev, gifts: updated.data }));
  }

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Could not load profile.</p>;

  return (
    <div className="profile-page">
      {/* Back Button */}
      <button className="profile-back" onClick={() => navigate("/")}>
        ← Back to Homepage
      </button>

      {/* User Info Card */}
      <UserInfoCard user={profile} />

      {/* Budget Section */}
      <div className="profile-budget">
        <BudgetSlider value={profile.budget} onChange={handleBudgetChange} />
      </div>

      <hr />

      {/* Gift Header */}
      <h2>Your Saved Gifts</h2>

      {/* Gift Grid */}
      <GiftGrid
        gifts={profile.gifts}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteGift}
      />

      <hr />

      <AddGiftForm onAdd={handleAddGift} />
    </div>
  );
}
