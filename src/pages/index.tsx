import { type NextPage } from "next";

import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Sidebar, PostForm, PostCard } from "../components";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

import { api } from "../utils/api";

const LOADING_MSG = "読み込み中...";
const RELOAD_MSG = "再読み込み";
const NOT_LOGGED_IN_ERR_MSG = "タイムラインを見るにはログインしてください。";

const Home: NextPage = () => {
  const utils = api.useContext();
  const { data: sessionData } = useSession();

  // No. 8 タイムラインを表示する
  const {
    data: userTimeline,
    isLoading,
    isSuccess,
    isError,
  } = api.timeline.showUserTimeline.useQuery();

  // No. 7 タイムラインに投稿する
  const mutation = api.timeline.create.useMutation({
    async onSuccess() {
      await utils.timeline.showUserTimeline.invalidate();
    },
  });

  // No. 11 タイムラインを削除する
  const deleteMutation = api.timeline.delete.useMutation({
    async onSuccess() {
      await utils.timeline.showUserTimeline.invalidate();
    },
  });

  // No. 14 いいね
  const likeMutation = api.like.create.useMutation({
    async onSuccess() {
      await utils.timeline.showUserTimeline.invalidate();
    },
  });

  // No. 15 いいね解除
  const deleteLikeMutation = api.like.delete.useMutation({
    async onSuccess() {
      await utils.timeline.showUserTimeline.invalidate();
    },
  });

  const reload = () => {
    utils.timeline.showUserTimeline.invalidate();
  };

  const sendPost = async (content: string) => {
    await mutation.mutateAsync({
      content,
    });
  };

  const onLike = async (id: string) => {
    await likeMutation.mutateAsync({ postId: id });
  };

  const onDeleteLike = async (id: string) => {
    await deleteLikeMutation.mutateAsync({ postId: id });
  };

  const onDelete = async (id: string) => {
    await deleteMutation.mutateAsync({ postId: id });
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
          <AuthShowcase />
        </section>
        <section className="col-span-9">
          <div className="flex flex-col divide-y">
            <PostForm
              onSendPost={(content: string) => void sendPost(content)}
            ></PostForm>
            {isLoading && <div className="flex items-center justify-center rounded-none bg-white">{LOADING_MSG}</div>}
            {isError && <div
              className="flex items-center justify-center rounded-none bg-white">
                {NOT_LOGGED_IN_ERR_MSG}
            </div>}
            {isSuccess && (
              <>
                <Button
                  className="flex items-center justify-center rounded-none bg-white"
                  onClick={() => void reload()}
                >
                  <ArrowPathIcon className="h-5 w-5"></ArrowPathIcon>
                  <span>{RELOAD_MSG}</span>
                </Button>
                {userTimeline.map(
                  ({ id, author, content, createdAt, authorId, likes }) => (
                    <div key={id}>
                      <PostCard
                        id={id}
                        authorId={author?.id || ""}
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
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col">
      <button
        className="py-2"
        onClick={sessionData ? () => void signOut() : () => void signIn()}　// No. 1　アカウント登録, No. 3 ログイン, No. 4 ログアウト
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
