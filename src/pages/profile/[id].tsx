import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { Sidebar, ProfileCard } from "../../components";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

import { api } from "../../utils/api";

const USER_NOT_FOUND = "ユーザーが見つかりません。";
const NOT_LOGGED_IN_ERR_MSG = "フォローするにはログインしてください。";

const Profile: NextPage = () => {
    const router = useRouter();
    const { id: ids } = router.query;
    const id = Array.isArray(ids) ? ids[0] : ids;

    const { data: sessionData } = useSession();
    const utils = api.useContext();

    const { data, isLoading, isSuccess } = api.profile.show.useQuery({
        userId: id || ""
    });

    const profile = data && (data?.length || 0) > 0 ? data[0] : null;

    // No. 5 フォロー
    const followMutation = api.following.create.useMutation({
        async onSuccess() {
            await utils.profile.show.invalidate();
        }
    });

    // No. 6 フォロー解除
    const unFollowMutation = api.following.delete.useMutation({
        async onSuccess() {
            await utils.profile.show.invalidate();
        }
    });


    const follow = async () => {
        await followMutation.mutateAsync({
            followeeId: id || ""
        });
    };

    const unFollow = async () => {
        await unFollowMutation.mutateAsync({
            followeeId: id || ""
        });
    };

    return (
        <>
            <main className="grid min-h-screen grid-cols-12 divide-x">
                <section className="col-span-3 divide-y">
                    <Sidebar />
                </section>
                <section className="col-span-9">
                    {!data &&
                        <div
                            className="flex items-center justify-center rounded-none bg-white my-4">
                            {USER_NOT_FOUND}
                        </div>}
                    {followMutation.isError && 
                        <div
                            className="flex items-center justify-center rounded-none bg-white my-4">
                            {NOT_LOGGED_IN_ERR_MSG}
                        </div>}
                    {isSuccess && <>
                        <ProfileCard
                            nickname={profile?.nickname || "Anonymous"}
                            bio={profile?.bio || ""}
                            isPublic={profile?.isPublic || false}
                            isMyProfile={profile?.userId === sessionData?.user.id}
                            isFollowing={profile?.user.followers.some(f => f.followerId === sessionData?.user.id)}
                            follow={() => void follow()}
                            unFollow={() => void unFollow()}
                        />
                    </>}
                </section>
            </main>
        </>
    );
};

export default Profile;
