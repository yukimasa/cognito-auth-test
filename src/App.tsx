// import logo from "./logo.svg";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";

import { Amplify, Auth } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";
import { useEffect, useState } from "react";

Amplify.configure(awsExports);

function App() {
  const [group, setGroup] = useState();

  useEffect(() => {
    // Amplify SDKを使用してユーザーのグループ取得
    Auth.currentSession().then((user) => {
      const { payload } = user.getIdToken();
      if (payload && payload["cognito:groups"]) {
        console.log(payload["cognito:groups"]);
        setGroup(payload["cognito:groups"]);
      }

      // 特定のグループに所属していないユーザーは強制ログアウトする;
      // if (
      //   !payload ||
      //   !payload["cognito:groups"] ||
      //   !payload["cognito:groups"].includes("administrators")
      // ) {
      //   Auth.signOut();
      // }
    });
  }, []);

  return (
    <div className="App">
      <h1>We now have Auth!</h1>
      <Authenticator>
        {({ signOut, user }) => (
          <main className="main">
            <h2>Hello {user?.username}!!</h2>
            {group && <p>your group is {group}.</p>}
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </div>
  );
}

export default App;
