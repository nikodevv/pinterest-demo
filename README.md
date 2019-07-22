# Tread Demo Project
## Install
    $ git clone https://github.com/nikodevv/pinterest-demo.git pinterest-demo
    $ cd pinterest-demo
    $ npm install
    $ cp src/config/firebaseConfig.example.js \ 
    src/config/firebaseConfig.js
Afterwards navigate to `/src/config/firebaseConfig.js` and fill out the config file with with your firebase service endpoints.
Requires Github to be linked Firebase Auth [as described in the docs](https://firebase.google.com/docs/auth/web/github-auth).
 Feel free to message me if you would like access to my Firebase project.
 
## Deployment
    firebase login // Login to your firebase accoun
    firebase use // Select your project id (in my case "pinterest-clone-eb176")
    npm run build
    firebase deploy
 
