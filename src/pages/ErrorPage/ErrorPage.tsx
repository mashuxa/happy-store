import { FC } from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage: FC = () => {
  const error = useRouteError() as { message: string };

  return error ? <h1>Error 404</h1> : null;
};

export default ErrorPage;
