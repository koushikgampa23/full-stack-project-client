export type postType = {
  id:number,
  title: string;
  postTitle: string;
  username: string;
  UserId: string;
};

export type AuthContextType = {
  authState: authStateType;
  setAuthState: any;
};

export type authStateType = {
  username: string;
  id: number;
  status: boolean;
};

export type CommentType = {
  id: string;
  commentBody: string;
  username: string;
};

export type listPostType = {
  id: string;
  title: string;
  postTitle: string;
  username: string;
  UserId: string;
  Likes: LikesType[];
};

export type LikesType = {
  id: string;
  PostId: string;
  UserId: string;
};

export type LoginType = {
  username: string;
  password: string;
};

export type SignUpType = {
  username: string;
  password: string;
  securityquestion?: string;
};
