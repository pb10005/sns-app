import * as React from "react";
import { useState } from "react";
import { Button } from "./Button";

type Props = {
  defaultNickname?: string;
  defaultBio?: string;
  defaultPublic?: boolean;
  onSendProfile: (nickname: string, bio: string, isPublic: boolean) => void;
};

export const ProfileForm: React.FC<Props> = (props: Props) => {
  const { defaultNickname, defaultBio, defaultPublic, onSendProfile } = props;
  const [nickname, setNickname] = useState<string>(defaultNickname || "");
  const [bio, setBio] = useState<string>(defaultBio || "");
  const [isPublic, setPublic] = useState<boolean>(defaultPublic || false);

  const sendProfile = () => {
    onSendProfile(nickname, bio, isPublic);
  };

  return (
    <>
      <div className="py-2 px-3">
        <input
          className="mb-2 w-full rounded-lg bg-gray-200 p-4"
          placeholder="ニックネーム"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <textarea
          className="mb-2 w-full rounded-lg bg-gray-200 p-4"
          placeholder="プロフィール"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <div className="mb-2 w-full">
          <input
            type="checkbox"
            id="public"
            checked={isPublic}
            onChange={() => setPublic((prevState) => !prevState)}
          />
          <label htmlFor="public">アカウントを公開する</label>
        </div>
        <Button onClick={() => void sendProfile()}>設定する</Button>
      </div>
    </>
  );
};
