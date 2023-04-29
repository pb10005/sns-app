import * as React from "react";
import { useState } from "react";
import { Button } from "./Button";

type Props = {
  defaultContent?: string;
  onSendPost: (content: string) => void;
};

export const PostForm: React.FC<Props> = (props: Props) => {
  const { defaultContent, onSendPost } = props;
  const [post, setPost] = useState<string>(defaultContent || "");

  const sendPost = () => {
    onSendPost(post);
    setPost("");
  };

  return (
    <>
      <div className="py-2 px-3">
        <textarea
          className="w-full rounded-lg bg-gray-200 p-4"
          placeholder="投稿しましょう"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        ></textarea>
        <Button onClick={() => void sendPost()}>投稿する</Button>
      </div>
    </>
  );
};
