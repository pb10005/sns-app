import * as React from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Button } from "./Button";

type Props = {
  nickname: string;
  bio: string;
  isPublic: boolean;
  isMyProfile: boolean;
  isFollowing?: boolean;
  follow: () => void;
  unFollow: () => void;
};

export const ProfileCard: React.FC<Props> = (props: Props) => {
  const { nickname, bio, isPublic, isMyProfile, isFollowing, follow, unFollow } = props;
  return (
    <>
      <div className="py-2 px-3">
        <p className="font-bold">
          {nickname}
          {!isPublic && <LockClosedIcon className="h-5 w-5" />}
        </p>
        <p className="whitespace-pre-wrap break-words">{bio}</p>
        {!isMyProfile && !isFollowing && <Button onClick={() => void follow()}>フォロー</Button>}
        {!isMyProfile && isFollowing && <Button onClick={() => void unFollow()}>フォロー解除</Button>}
      </div>
    </>
  );
};