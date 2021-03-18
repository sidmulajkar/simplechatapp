import './App.css';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  //config data
    apiKey: "AIzaSyB_d0tzvtbUdliI2Lap7fzy8XC3KvER8Rk",
    authDomain: "chatappreact-7668e.firebaseapp.com",
    projectId: "chatappreact-7668e",
    storageBucket: "chatappreact-7668e.appspot.com",
    messagingSenderId: "806289217868",
    appId: "1:806289217868:web:e2a640667c164733ad97e9"
})

function App() {
  //for user signin and signout
  const [ user ] = useAuthState(auth);
  
  
  return (
    <div className="App">
      <header className="App-header">

        <section>
          //if the user is signedin show the chatroom or show the signin button
          {user ? <ChatRoom /> : <SignIn />}
        </section>

      </header>
    </div>
  );
}

export default App;
