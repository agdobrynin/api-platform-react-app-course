export const BLOG_POST_LIST = "BLOG_POST_LIST";
export const BLOG_POST_LIST_ADD = "BLOG_POST_LIST_ADD";

export const blogPostList = () => ({
    type: BLOG_POST_LIST,
    data: [
        {
            id: 1,
            title: "hello One",
        },
        {
            id: 2,
            title: "hello Two",
        }
    ],
});

export const blogPostAdd = () => ({
    type: BLOG_POST_LIST_ADD,
    data: {
        id: Math.floor(Math.random() * 100 + 1),
        title: "Blog post title",
    },
});
