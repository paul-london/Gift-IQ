import GiftCard from "./GiftCard";

export default function GiftList({ gifts, onStatusChange, onDelete }) {
  if (!gifts || gifts.length === 0) {
    return <p>No gifts saved yet.</p>;
  }

  return (
    <div className="gift-list">
      {gifts.map((gift, index) => (
        <GiftCard
          key={index}
          gift={gift}
          index={index}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
