import {
  useNavigate,
  useLocation,
  useSearchParams as useRouterSearchParams,
} from "react-router-dom";

export function useReactRouterAdapter() {
  const [searchParams] = useRouterSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  return {
    pathname: location.pathname,
    searchParams,
    navigate,
  };
}
