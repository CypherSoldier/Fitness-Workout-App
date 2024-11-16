import { auth, googleProvider } from './config.js';
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import DashBoard from './dashboard.js';

/*const apiCall = () => {
  axios.get('http://localhost:8080').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}*/

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
        <div className="items">
            <form className="info">
              <p className="intro">Hi there!</p>
                <div className="loginButton">
                <button type="submit" className="loginButtonStyle" onClick={signInWithGoogle}>Sign In With Google</button>
                </div>
            </form>
        </div>

      )}
    </>
    );
}

//<button onClick={apiCall}>Make API Call</button>
export default LoginPage;