import { AuthContext, AuthProvider, TAuthConfig, IAuthContext, TRefreshTokenExpiredEvent } from "react-oauth2-code-pkce"
import ReactDOM from 'react-dom/client';
import { useEffect, useContext } from 'react';
import reportWebVitals from './reportWebVitals';



const authConfig: TAuthConfig = {
  clientId: 'e5tzviowoxgwbbzk7pau',
  authorizationEndpoint: 'https://cowpte.com:8702/oauth2/authorize',
  tokenEndpoint: 'https://cowpte.com:8702/oauth2/token',
  redirectUri: 'http://localhost:3000/authorized',
  scope: 'openid profile',
  preLogin: () => localStorage.setItem('preLoginPath', window.location.pathname),
  postLogin: () => window.location.replace(localStorage.getItem('preLoginPath') || ''),
  decodeToken: true,
  autoLogin: false,
}

const UserInfo = (): JSX.Element => {
  const { token, tokenData, login, logOut, idToken, error }: IAuthContext = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await fetch('https://cowpte.com:8705/api/v1/questions/ra/count', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          console.log(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);



  if (error) {
    return (
      <>
        <div style={{ color: 'red' }}>An error occurred during authentication: {error}</div>
        <button onClick={() => logOut()}>Logout</button>
      </>
    )
  }

  return (
    <>
      {token ? (
        <>
          <div>
            <h4>Access Token (JWT)</h4>
            <pre
              style={{
                width: '400px',
                margin: '10px',
                padding: '5px',
                border: 'black 2px solid',
                wordBreak: 'break-all',
                whiteSpace: 'break-spaces',
              }}
            >
              {token}
            </pre>
          </div>
          <div>
            <h4>Login Information from Access Token (Base64 decoded JWT)</h4>
             <pre>{JSON.stringify(tokenData, null, 2)}</pre>
          </div>
          <button onClick={() => logOut()}>Logout</button>
        </>
      ) : (
        <>
          <div>You are not logged in.</div>
          <button onClick={() => login()}>Login</button>
        </>
      )}
    </>
  )
}



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <AuthProvider authConfig={authConfig}>
      <UserInfo />
    </AuthProvider>
  );


  reportWebVitals();
