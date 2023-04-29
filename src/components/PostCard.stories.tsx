import { PostCard } from "./PostCard";

export default {
    title: "Post/Card",
    component: PostCard,
};

export const NormalCard = () => (
    <PostCard
        id="test"
        authorId="test"
        authorName="Test"
        content="Hello"
        createdAt={new Date()}
        likeCount={0}
        isLiked={false}
        isMyPost={true}
        onLike={() => { alert("like") }}
        onDelete={() => { alert("delete") }}
        onDeleteLike={() => alert("delete like")}
    ></PostCard>
);

export const NormalCardWithLongContent = () => (
    <PostCard
        id="test"
        authorId="test"
        authorName="Test"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        createdAt={new Date()}
        likeCount={0}
        isLiked={false}
        isMyPost={true}
        onLike={() => { alert("like") }}
        onDelete={() => { alert("delete") }}
        onDeleteLike={() => alert("delete like")}
    ></PostCard>
);
export const LikedCard = () => (
    <PostCard
        id="test"
        authorId="test"
        authorName="Test"
        content="Hello"
        createdAt={new Date()}
        likeCount={10}
        isLiked={true}
        isMyPost={true}
        onLike={() => { alert("like") }}
        onDelete={() => { alert("delete") }}
        onDeleteLike={() => alert("delete like")}
    ></PostCard>
);
