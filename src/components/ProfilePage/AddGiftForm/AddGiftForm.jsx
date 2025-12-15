import "./AddGiftForm.css";
import { useState } from "react";

export default function AddGiftForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    link: "",
    description: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(form);
    setForm({ name: "", price: "", link: "", description: "" });
  }

  return (
    <div className="add-gift-container">
      <h3 className="add-gift-title">Add New Gift</h3>

      <form className="add-gift-form" onSubmit={handleSubmit}>
        <input
          name="name"
          className="add-gift-input add-gift-name"
          placeholder="Gift name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="price"
          className="add-gift-input add-gift-price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="link"
          className="add-gift-input add-gift-link"
          placeholder="Link"
          value={form.link}
          onChange={handleChange}
        />

        <textarea
          name="description"
          className="add-gift-input add-gift-desc"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button className="add-gift-btn">Add Gift</button>
      </form>
    </div>
  );
}
