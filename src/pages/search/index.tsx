import { type NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { Sidebar, PostForm, PostCard } from "../../components";

import { api } from "../../utils/api";

const LOADING_MSG = "読み込み中...";

const Search: NextPage = () => {
  const utils = api.useContext();
  const { data: sessionData } = useSession();
  const [text, setText] = useState<string>("");

  // No. 9 タイムラインを検索する
  const {
    data: searchTimeline,
    isLoading,
    isSuccess,
  } = api.timeline.searchTimeline.useQuery({
    text,
  });

  // No. 11 タイムラインを削除する
  const deleteMutation = api.timeline.delete.useMutation({
    async onSuccess() {
      await utils.timeline.searchTimeline.invalidate();
    },
  });

  // No. 14 いいね
  const likeMutation = api.like.create.useMutation({
    async onSuccess() {
      await utils.timeline.searchTimeline.invalidate();
    },
  });

  // No. 15 いいね解除
  const deleteLikeMutation = api.like.delete.useMutation({
    async onSuccess() {
      await utils.timeline.searchTimeline.invalidate();
    },
  });

  const onLike = async (id: string) => {
    await likeMutation.mutateAsync({ postId: id });
  };

  const onDeleteLike = async (id: string) => {
    await deleteLikeMutation.mutateAsync({ postId: id });
  };

  const onDelete = async (id: string) => {
    await deleteMutation.mutateAsync({ postId: id });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await utils.timeline.searchTimeline.invalidate();
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid min-h-screen grid-cols-12 divide-x">
        <section className="col-span-3 divide-y">
          <Sidebar />
        </section>
        <section className="col-span-9">
          <div className="flex flex-col divide-y">
            <form onSubmit={onSubmit} className="my-2 mx-1">
              <input
                className="w-full rounded-full bg-gray-200 p-2"
                placeholder="投稿を検索"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </form>
            {isLoading && <div className="flex items-center justify-center rounded-none bg-white">{LOADING_MSG}</div>}
            {isSuccess &&
              searchTimeline.map(
                ({ id, author, content, createdAt, authorId, likes }) => (
                  <div key={id}>
                    <PostCard
                      id={id}
                      authorId={authorId}
                      authorName={author?.userProfile?.nickname || "Anonymous"}
                      content={content}
                      createdAt={createdAt}
                      likeCount={likes.length}
                      isLiked={likes.some(
                        (l) => l.senderId === sessionData?.user?.id
                      )}
                      isMyPost={authorId === sessionData?.user?.id}
                      onLike={() => void onLike(id)}
                      onDeleteLike={() => void onDeleteLike(id)}
                      onDelete={() => void onDelete(id)}
                    />
                  </div>
                )
              )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Search;
