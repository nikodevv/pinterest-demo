# Tread Demo Project
## Install
    $ git clone https://github.com/nikodevv/pinterest-demo.git pinterest-demo
    $ cd pinterest-demo
    $ npm install
    // You are done the install. 
    // If this was a "real" project steps would continue as follows:
    $ cp src/config/firebaseConfig.example.js \ 
    src/config/firebaseConfig.js
    $ cp src/config/rebrandlyConfig.example.js \ 
    src/config/rebrandlyConfig.js
In a typical installation for a public repo you would need to navigate to `src/config` and fill out the config files with with your firebase service endpoints.
Requires Github to be linked Firebase Auth [as described in the docs](https://firebase.google.com/docs/auth/web/github-auth).
However to make things easier for anyone taking a look at this project, I have comitted my secrets/apikeys and so the last 2 steps are unnecessary. Again, I want to stress that I would never 
actually commit my api keys to a public repo in a real project.

You can verify the installation by running 

    $ npm run-script test
    Test Suites: 13 passed, 13 total
    Tests:       60 passed, 60 total
    Snapshots:   8 passed, 8 total
    Time:        6.003s

For the first half of the project I followed religious TDD. Once I felt that I had 
thoroughly demonstrated my ability to write tests, I stopped writing them 
so that I can finish the project a bit faster.

## Demo
The web app is deployed to `https://pinterest-clone-eb176.firebaseapp.com/`.

Here is a link to my user profile: 
`https://pinterest-clone-eb176.firebaseapp.com/userPage/ZzTZChAFRnf4GhdEyNLX6hWwq5w1` 

All of the requested user stories have been completed. I haven't tested / developed for 
every screen size, so here is a screenshot of the web app on my machine `https://imgur.com/a/GzRC3ic`,

## Deployment
    firebase login // Login to your firebase accoun
    firebase use // Select your project id (in my case "pinterest-clone-eb176")
    npm run build
    firebase deploy
 
