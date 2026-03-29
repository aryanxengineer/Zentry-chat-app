import { Outlet } from "react-router-dom";

interface props {
  requireAuth?: boolean;
}

const RouteGuard = ({ requireAuth }: props) => {

    console.log(requireAuth?.toString());

  return <Outlet />
};

export default RouteGuard;
