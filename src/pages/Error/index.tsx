import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'utils/routes';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>We are unable to find the page you are looking for</p>
      <button onClick={() => navigate(AppRoutes.Gallery)}>Return to Gallery</button>
    </div>
  );
};
