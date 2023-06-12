import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const RequireLogin = ({ children }) => {
   const isLogin = Cookies.get("token");
   if (!isLogin) {
      return <Navigate to="/login" />;
   }
   return (
      <>{children}</>
   );
};

RequireLogin.propTypes = {
   children: PropTypes.node.isRequired,
};

export default RequireLogin;