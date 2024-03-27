import { auth, googleProvider } from './config.js';
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import DashBoard from './dashboard.js';

function LoginPage() {
    const [user] = useAuthState(auth);
    
    const signInWithGoogle = async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    return (
      <>
      {user ? (
        <>
          <DashBoard />
        </>
      ) : (
        <button type="submit" className="loginButtonStyle" onClick={signInWithGoogle}>Sign In with Google</button>
      )}
    </>
    );
}

export default LoginPage;