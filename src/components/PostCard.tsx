import * as React from "react";
import Link from "next/link";
import {
  HandThumbUpIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

type Props = {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  isLiked: boolean;
  isMyPost: boolean;
  onLike: () => void;
  onDeleteLike: () => void;
  onDelete: () => void;
};

export const PostCard: React.FC<Props> = (props: Props) => {
  const {
    id,
    authorId,
    authorName,
    content,
    createdAt,
    likeCount,
    isLiked,
    isMyPost,
    onLike,
    onDeleteLike,
    onDelete,
  } = props;
  const datetimeDisplay = createdAt.toLocaleString();
  return (
    <>
      <div className="py-2 px-3">
        <p className="font-bold"><Link href={`/profile/${authorId}`}>{authorName}</Link></p>
        <p className="text-sm text-gray-500">{datetimeDisplay}</p>
        <p className="whitespace-pre-wrap break-words">{content}</p>
        <div className="flex items-center gap-1">
          <span className="flex items-center">
            <HandThumbUpIcon
              onClick={isLiked ? onDeleteLike : onLike}
              className={`h-5 w-5 cursor-pointer ${
                isLiked ? "text-red-500" : "text-gray-300"
              }`}
            ></HandThumbUpIcon>
            {likeCount ? likeCount : ""}
          </span>
          {isMyPost && (
            <>
              <Link href={`/post/edit/${id}`}>
                <PencilSquareIcon className="h-5 w-5 cursor-pointer text-gray-300"></PencilSquareIcon>
              </Link>
              <TrashIcon
                onClick={onDelete}
                className="h-5 w-5 cursor-pointer text-gray-300"
              ></TrashIcon>
            </>
          )}
        </div>
      </div>
    </>
  );
};
