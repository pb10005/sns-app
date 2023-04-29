import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Sidebar, ProfileCard } from "../../components";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

import { api } from "../../utils/api";

const NOT_LOGGED_IN_ERR_MSG = "マイページを見るにはログインしてください。";

const Profile: NextPage = () => {
    const { data: sessionData } = useSession();
    const { data, isLoading, isSuccess } = api.profile.show.useQuery({
        userId: sessionData?.user?.id || "",
    });

    const profile = data && (data?.length || 0) > 0 ? data[0] : null;

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
                            {NOT_LOGGED_IN_ERR_MSG}
                        </div>}
                    {isSuccess && <>
                        <ProfileCard
                            nickname={profile?.nickname || "Anonymous"}
                            bio={profile?.bio || ""}
                            isPublic={profile?.isPublic || false}
                            isMyProfile={true}
                            follow={() => void (0)}
                            unFollow={() => void (0)}
                        />
                        <Link href="/profile/edit">
                            <PencilSquareIcon className="h-6 w-6 mx-2" />
                        </Link>
                    </>}
                </section>
            </main>
        </>
    );
};

export default Profile;
