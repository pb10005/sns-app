import { PostForm } from "./PostForm";

export default {
    title: "Post/Form",
    component: PostForm,
};

export const NormalPostForm = () => <PostForm onSendPost={(content) => alert(content)}></PostForm >;

export const PostFormWithDefaultContent = () => (
    <PostForm
        defaultContent="Hello"
        onSendPost={(content) => {
            alert(content);
        }}
    ></PostForm>
);