import { User } from "@/types";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      {user.profilePictureUrl ? (
        <img
          src={user.profilePictureUrl}
          alt={user.username || "User"}
          className="h-14 w-14 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white">
          {user.username?.charAt(0).toUpperCase() || "U"}
        </div>
      )}

      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white">
          {user.username || "Unknown User"}
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {user.email}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Team Id: {user.teamId}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
