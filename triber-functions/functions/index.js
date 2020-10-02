const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

admin.initializeApp();

const firebaseConfig = {
  apiKey: 'AIzaSyB6NdzMYZPq9_lhuOktxgl80iFYROLVli4',
  authDomain: 'triber-bf4d1.firebaseapp.com',
  databaseURL: 'https://triber-bf4d1.firebaseio.com',
  projectId: 'triber-bf4d1',
  storageBucket: 'triber-bf4d1.appspot.com',
  messagingSenderId: '818206872379',
  appId: '1:818206872379:web:e8fc87b792f3e8defedd1e',
  measurementId: 'G-WCNZZ5RZ14',
};

const firebase = require('firebase');
const { onRequest } = require('firebase-functions/lib/providers/https');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

// Get Screams

app.get('/screams', (req, res) => {
  db.collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(screams);
    })
    .catch((err) => console.error(err));
});

// Post Screams

app.post('/scream', (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: 'Body Must Not Be Empty' });
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
  };

  db.collection('screams')
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created succesfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: `something went wrong` });
      console.error(err);
    });
});

const isEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.match(emailRegEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

// Signup route

app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  let errors = {};

  if (isEmpty(newUser.email)) {
    errors.email = 'Must Not Be Empty';
  } else if (!isEmail(newUser.email)) {
    error.email = 'Must Be A Valid Email Address';
  }

  if (isEmpty(newUser.password)) errors.password = 'Must Not Be Empty';
  if (newUser.password !== newUser.confirmPassword)
    errors.confirmPassword = 'Password Must Match';
  if (isEmpty(newUser.handle)) errors.handle = 'Must Not Be Empty';

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  //TODO validate data
  let token, userId;

  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'this handle is already taken' });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already existed' });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

// Login Route

app.post('/login', (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  let errors = {};

  if (isEmpty(user.email)) errors.email = 'Must Not Be Empty';
  if (isEmpty(user.password)) errors.password = 'Must Not Be Empty';

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 'auth/wrong-password') {
        return res
          .status(403)
          .json({ general: 'Wrong Credentials, Please Try Again' });
      } else return res.status(500).json({ error: err.code });
    });
});

exports.api = functions.https.onRequest(app);
