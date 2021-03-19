import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

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

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


export default function App() {

  //for user signin and signout
  const [ user ] = useAuthState(auth);
  
  
  return (
    <div className="App">
      <header>
        <h1>Chat Out Here! ⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {
  const signInWithGoogle =  () => {
    
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not use for any other purpose than project!</p>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (

    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  const dummy = useRef();
  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);

  //can listen to data using the hooks 
  const [messages] = useCollectionData(query, {idField: 'id'});

  const[formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const {uid, photoURL } = auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>

      </main>

      <form onSubmit={sendMessage}>
        
        <input value = {formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice"/>

        <button type="submit" disabled={!formValue}>🕊️</button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (<>
    <div className = {`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}