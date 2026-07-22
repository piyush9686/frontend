import { IndianRupee } from "lucide-react";

const RewardBadge = ({ reward }) => {
  if (!reward || Number(reward) <= 0) return null;

  return (
    <div className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded-full shadow font-semibold">
      <IndianRupee size={16} />
      <span>{Number(reward).toLocaleString()}</span>
    </div>
  );
};

export default RewardBadge;