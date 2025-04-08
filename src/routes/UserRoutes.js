import BlogGaming from "../pages/users/BlogGaming";
import CreatePost from "../pages/users/CreatePost";
import Dashboard from "../pages/users/Dashboard";
import Parametre from "../pages/users/Parametre";
import ProfileUser from "../pages/users/ProfileUser";
import UpdatePost from "../pages/users/UpdatePost";
import UpdateProfileUser from "../pages/users/UpdateProfileUser";

export const userRoutes = [
  { path: "/dashboard-user", element: Dashboard },
  { path: "/profil-user", element: ProfileUser },
  { path: "/updateProfile", element: UpdateProfileUser },
  { path: "/gaming-post", element: BlogGaming },
  { path: "/create-post", element: CreatePost },
  { path: "/update-post/:id/", element: UpdatePost },
  { path: "/parametre", element: Parametre },
];
