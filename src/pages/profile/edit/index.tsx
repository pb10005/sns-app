import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { Sidebar, ProfileForm } from "../../../components";
import { useRouter } from "next/router";

import { api } from "../../../utils/api";

const EditProfile: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { data, isSuccess } = api.profile.show.useQuery({
    userId: sessionData?.user?.id || "",
  });

  const sendMutation = api.profile.upsert.useMutation({
    async onSuccess() {
      await router.push("/profile");
    },
  });

  const profile = data && (data.length > 0) ? data[0] : null;

  const onSendProfile = async (nickname: string, bio: string, isPublic: boolean) => {
    await sendMutation.mutateAsync({
      nickname,
      bio,
      isPublic,
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
            <ProfileForm
              defaultNickname={profile?.nickname}
              defaultBio={profile?.bio || ""}
              defaultPublic={profile?.isPublic}
              onSendProfile={(nickname: string, bio: string, isPublic: boolean) => void onSendProfile(nickname, bio, isPublic)}
            />
          )}
        </section>
      </main>
    </>
  );
};

export default EditProfile;
