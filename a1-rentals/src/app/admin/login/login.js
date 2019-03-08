import { promises } from "fs";

(function () {

// initialize Firebase
    const config = {
        apiKey: "AIzaSyBRPFTZdKuMG508q5nHu7BRQjPa69y8nwA",
        authDomain: "a1-rentals.firebaseapp.com",
        databaseURL: "https://a1-rentals.firebaseio.com",
        projectId: "a1-rentals"
    };
    firebase.initializeApp(config);

//get elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnLogout = document.getElementById('btnLogout');

//add login event
    btnLogin.addEventListener('click', e => {
        //get email and password
        // TODO: check for real email
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //sign in
        auth.signInWithEmailAndPassword(email, pass);
        promises.catch( e => console.log(e.message));
    });

    btnLogout.addEventListener('click', e=> {
        firebase.auth().signOut();
    });

    //add realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            btnLogout.classList.remove('hide');
        } else {
            console.log('Not logged in.');
            btnLogout.classList.add('hide');
        }
    });


});