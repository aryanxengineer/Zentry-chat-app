import BaseLayout from "@/layouts/BaseLayout";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      {/* auth / public routes */}
      <Route path="/">
        <Route element={<BaseLayout />} />
      </Route>


    </Routes>
  );
};

export default AppRoutes;
