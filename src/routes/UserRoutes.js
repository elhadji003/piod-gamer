import Dashboard from "../pages/users/Dashboard";
import ProfileUser from "../pages/users/ProfileUser";
import UpdateProfileUser from "../pages/users/UpdateProfileUser";

export const userRoutes = [
  { path: "/dashboard-user", element: Dashboard },
  { path: "/profil-user", element: ProfileUser },
  { path: "/updateProfile", element: UpdateProfileUser },
];
