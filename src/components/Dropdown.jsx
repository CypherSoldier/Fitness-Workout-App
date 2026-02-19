import { auth } from '../services/firebase';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';


function DropDown({ user }) {
  const { logout } = useAuth();               // ← get the full logout from hook
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (auth.currentUser) {
        await auth.signOut();                 // ← sign out from Firebase
      }

      await logout();                         // ← then call the hook's logout to clear JWT

      navigate('/login', { replace: true});                    // ← redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  //console.log(user?.displayName)
  
  return (
      <div className="dropdown">
      <button className="profile-btn" type="button" aria-expanded="false">
      <img src={user?.photoURL} alt="profile" referrerPolicy="no-referrer" />
      </button>
      <div className="dropdown-menu">
        <Link to="/CypherSoldier/Profile" className="dropdown-item">My Profile</Link>
        <button className="dropdown-item"  onClick={(e) => {
            e.preventDefault();     // ← very important – prevents navigation
            handleLogout();
          }}>Log Out</button>
      </div>
      </div>
    );
  }

export default DropDown;