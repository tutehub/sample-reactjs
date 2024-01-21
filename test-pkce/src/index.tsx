// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();





import { AuthContext, AuthProvider, TAuthConfig, IAuthContext, TRefreshTokenExpiredEvent } from "react-oauth2-code-pkce"
import ReactDOM from 'react-dom/client';
import { useContext } from 'react';




const authConfig: TAuthConfig = {
  clientId: 'e5tzviowoxgwbbzk7pau',
  authorizationEndpoint: 'https://cowpte.com:8702/oauth2/authorize',
  tokenEndpoint: 'https://cowpte.com:8702/oauth2/token',
  redirectUri: 'http://localhost:3000/authorized',
  scope: 'openid profile',
  preLogin: () => localStorage.setItem('preLoginPath', window.location.pathname),
  postLogin: () => window.location.replace(localStorage.getItem('preLoginPath') || ''),
  decodeToken: false,
  autoLogin: false,
}

const UserInfo = (): JSX.Element => {
  const { token, tokenData, login, logOut, idToken, error }: IAuthContext = useContext(AuthContext)

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

