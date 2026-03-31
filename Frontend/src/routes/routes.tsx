import Signin from "@/pages/auth/sign-in";
import Signup from "@/pages/auth/sign-up";
import Chat from "@/pages/chat";
import SingleChat from "@/pages/chat/chatId";

export const AUTH_ROUTES = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
};

export const PROTECTED_ROUTES = {
  CHAT: "/chat",
  SINGLE_CHAT: "/chat/:chatid",
};

export const authRoutesPaths = [
  {
    title: "Sign-in",
    path: AUTH_ROUTES.SIGN_IN,
    element: <Signin />,
  },
  {
    title: "Sign-up",
    path: AUTH_ROUTES.SIGN_UP,
    element: <Signup />,
  },
];

export const protectedRoutesPaths = [
  {
    title: "Chat",
    path: PROTECTED_ROUTES.CHAT,
    element: <Chat />,
  },
  {
    title: "Single-chat",
    path: PROTECTED_ROUTES.SINGLE_CHAT,
    element: <SingleChat />,
  },
];

export const isAuthRoute = (pathname: string) => {
    return Object.values(AUTH_ROUTES).includes(pathname);
}
