import { authRoutesPaths, protectedRoutesPaths } from "./routes";
import { Route, Routes } from "react-router-dom";

import BaseLayout from "@/layouts/BaseLayout";
import AppLayout from "@/layouts/AppLayout";
import RouteGuard from "./routeGuard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* auth / public routes */}
      <Route path="/" element={<RouteGuard requireAuth={false} />}>
        <Route element={<BaseLayout />}>
          {authRoutesPaths.map(({ title, path, element }, index) => (
            <Route key={title + index} path={path} element={element} />
          ))}
        </Route>
      </Route>

      {/* Protected routes */}
      <Route path="/" element={<RouteGuard requireAuth={true} />}>
        <Route element={<AppLayout />}>
          {protectedRoutesPaths.map(({ title, path, element }, index) => (
            <Route key={title + index} path={path} element={element} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
