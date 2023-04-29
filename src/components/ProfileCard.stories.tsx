import { ProfileCard } from "./ProfileCard";

export default {
    title: "Profile/Card",
    component: ProfileCard,
};

export const NormalCard = () => (
    <ProfileCard
        nickname="John"
        bio="よろしくおねがいします"
        isPublic={true}
        isMyProfile={false}
        isFollowing={true}
        follow={() => alert("フォロー")}
        unFollow={() => alert("フォロー解除")}
    ></ProfileCard>
);
export const MyProfileCard = () => (
    <ProfileCard
        nickname="John"
        bio="よろしくおねがいします"
        isPublic={true}
        isMyProfile={true}
        follow={() => alert("フォロー")}
        unFollow={() => alert("フォロー解除")}
    ></ProfileCard>
);
export const NormalCardWithLongContent = () => (
    <ProfileCard
        nickname="John"
        bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        isPublic={true}
        isMyProfile={false}
        isFollowing={false}
        follow={() => alert("フォロー")}
        unFollow={() => alert("フォロー解除")}
        ></ProfileCard>
);
export const PrivateCard = () => (
    <ProfileCard
        nickname="Alice"
        bio="よろしくおねがいします"
        isPublic={false}
        isMyProfile={true}
        follow={() => alert("フォロー")}
        unFollow={() => alert("フォロー解除")}
        ></ProfileCard>
);
