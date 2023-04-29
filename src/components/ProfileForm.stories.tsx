import { ProfileForm } from "./ProfileForm";

export default {
    title: "Profile/Form",
    component: ProfileForm,
};

export const NormalProfileForm = () => <ProfileForm
    onSendProfile={(n, b, i) => {
        return alert(`nickname: ${n}, bio: ${b}, ${i ? "public" : "private"}`);
    }
    }></ProfileForm>;

export const PostFormWithDefaultContent = () => {
    return (
        <ProfileForm
            defaultNickname="John"
            defaultBio="よろしくおねがいします"
            defaultPublic={true}
            onSendProfile={(n, b, i) => alert(`nickname: ${n}, bio: ${b}, ${i ? "public" : "private"}`)}
        ></ProfileForm>
    );
};
