import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { Sidebar, PostForm } from "../../../components";

import { api } from "../../../utils/api";

const EditPost: NextPage = () => {
  const router = useRouter();
  const { id: ids } = router.query;
  const id = Array.isArray(ids) ? ids[0] : ids;

  const { data: sessionData } = useSession();
  const utils = api.useContext();

  const { data, isSuccess } = api.timeline.getById.useQuery({
    postId: id || "",
  });

  const content = data?.content || "";

  // No. 9 タイムライン編集
  const sendMutation = api.timeline.edit.useMutation({
    async onSuccess() {
        await utils.timeline.getById.invalidate();
        await router.push("/");
    },
  });

  const onSendPost = async (content: string) => {
    await sendMutation.mutateAsync({
      postId: id || "",
      content,
    });
  };

  return (
    <>
      <main className="grid min-h-screen grid-cols-12 divide-x">
        <section className="col-span-3 divide-y">
          <Sidebar />
        </section>
        <section className="col-span-9">
          {isSuccess && (
            <PostForm defaultContent={content} onSendPost={content => void onSendPost(content)} />
          )}
        </section>
      </main>
    </>
  );
};

export default EditPost;
