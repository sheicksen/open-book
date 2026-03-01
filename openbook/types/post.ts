export type PostTag = "Post" | "Project" | "Tutorial";
export interface Post {
    id: number;
    author: string;
    avatar: string;
    avatarColor: string;
    time: string;
    title: string;
    body: string;
    image: boolean;
    imageBg?: string;
    tag: PostTag;
    tagColor: string;
    likes: number;
    comments: number;
  }

  //Time should become timestamp
