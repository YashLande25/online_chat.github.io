import React from 'react'
import { auth, provider } from './firebase';
import "./Login.css";
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {

  const [{}, dispatch] = useStateValue();

    const signIn = () => {
         auth
         .signInWithPopup(provider)
         .then((result)=>{
            dispatch({
              type: actionTypes.SET_USER,
              user : result.user,
            })
            console.log(result);
         })
         .catch((error)=> alert(error.message));
    };

  return (
    <div className='login'>
        <div className='login__container'>
            <img  src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png?20220228223904'/>
            <div className='login__text'>
                <h1>Sign in to Online Chat</h1>
            </div>
            <button  className='login__signUpBtn'  onClick={signIn}>Sign In With Google</button>
        </div>
    </div>
  )
}

export default Login