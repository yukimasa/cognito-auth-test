// import logo from "./logo.svg";
import "@aws-amplify/ui-react/styles.css";

import { Amplify, Auth } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

function App() {
  // 特定のグループに所属していないユーザーは強制ログアウトする
  // useEffect(() => {
  //   Auth.currentSession().then((user) => {
  //     const { payload } = user.getIdToken();
  //     if (
  //       !payload ||
  //       !payload["cognito:groups"] ||
  //       !payload["cognito:groups"].includes("administrators")
  //     ) {
  //       Auth.signOut();
  //     }
  //   });
  // }, []);

  // Amplify SDKを使用してユーザーのグループ取得
  Auth.currentSession().then((user) => {
    const { payload } = user.getIdToken();
    if (payload && payload["cognito:groups"]) {
      console.log(payload["cognito:groups"]);
    }
  });

  return (
    <div className="App">
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user?.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </div>
  );
}

export default App;
