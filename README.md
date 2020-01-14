# Brainquiznos

Stream Two Project: Interactive Frontend Development Milestone Project - Code Institute

This is my second project which primarily focuses on Javascript and the interaction of users to the given data.
I named this project Brainquiznos, inspired by the "Popquiznos" in the movie "21 Jumpstreet".
Brainquiznos is a memory game where players are challenged to match images within the given time.

## Rules

The rules of the game is quite simple. The players must match all of the images within the duration of the game after they were shown the images.

The game has three modes:

- Easy mode

  - Hint time: 15 seconds
  - Game duration: 1:30 seconds
  - Total tiles: 20
  - Points multiplier: (time left when puzzle was solved x 0.3)
  - Lost game points lost: 10

- Normal mode

  - Hint time: 15 seconds
  - Game duration: 1:30 seconds
  - Total tiles: 24
  - Points multiplier: (time left when puzzle was solved x 0.5)
  - Lost game points lost: 7

- Hard mode
  - Hint time: 15 seconds
  - Game duration: 2 minutes
  - Total tiles: 30
  - Points multiplier: (time left when puzzle was solved x 1)
  - Lost game points lost: 5

---

## UX

I always start my UX process with research. The research involves comparing at least three existing memory game website and getting random users that justify my target audience to test each websites.

These are the list of websites that I have chosen to be tested:

1.  [Webgamesonline](https://www.webgamesonline.com/memory/)
2.  [Dkmgames](https://dkmgames.com/Memory/pairsrun.php)
3.  [Helpfulgames](https://www.helpfulgames.com/subjects/brain-training/memory.html)

Read more about the UX Design [here](https://brainquiznos.com/uxdesign).

## Features

- **Secure login system** - allows users to create an account fast and simple by having them fill out the required fields. Also, to prevent third party from playing with their account when they are away from keyboard.

- **Slider** - the slider contains the game themes. This allows users to choose their choice of theme that they find comfortable playing.

- **Leadearboard** - allows user to see the scores of the other players in order to see where they rank. This encourages the user to keep playing.

- **Points Graph** - the graph allows the users keep track of their previous game points.

- **Life / Life replenishment** - this is just an extra feature I implemented. A user losses a life every time one lost a game. The life will be replenish after three minutes. The user is prevented to start a new game if they don't have any lives left.

- **Pause game** - allows user to pause the game, in order for them to stop the time if they get distracted.

- **Restart game** - allows user to restart the game, in order for them to save time from going back to the dashboard. The game will have the same theme after one restart.

- **Difficulty options** - after a user clicks on one of the themes. A modal that shows the game difficulty options opens. This prompts the users on what difficulty they want to play the game.

- **Avatar Icon** - the avatar icon's image is set depending on the gender of the user. Its main purpose is to help user navigate the page as it contains the link to the leaderboard and stats. Also, this is where user will find the logout button that destroys the current cookie and redirect to landing page.

- **[Font Awesome](https://fontawesome.com/)** - The project also takes advantage of this free icon library in order to make the site more attractive.

### Features Left to Implement

- I will implement [Sendgrid](https://sendgrid.com/) to enable account verification and password recovery feature.

- In the stats page, I will show the user's previous games that contains the amount of clicks and how accurate they are.

- To add a weekly winner, whoever is at the top of the leaderboard every week is the winner.

- Change the gameplay by going up a level while the game gets harder each level.

- User report system - enables users to report other users who has an inappropriate usernames or they believe cheating.

- Game tiles change when user failed to find a match in certain time.

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- [CharJS](https://www.chartjs.org/)

  - It is an open source charting library for designers and also developers. The project utilizes this library to show the points gained depending on the game mode.

- [Sass](https://sass-lang.com/)

  - It is a powerful css preprocessor. I used this technology to make reusable css codes.

- [bcrypt](https://www.npmjs.com/package/bcrypt)

  - It is a library to help you hash password. The user's password is hashed to improve privacy and security.

- [body-parser](https://www.npmjs.com/package/body-parser)

  - It is a Node js body parsing middleware.It parse incoming request bodies in a middleware before your handlers, available under the req.body property. This project uses this library to read json data easily.

- [cookie-session](https://www.npmjs.com/package/cookie-session)

  - A simple cookie session middleware that store session data on the client within a cookie. This allows users to reduce the amount of times they have to login.

- [dotenv](https://www.npmjs.com/package/dotenv)

  - it allows the project to load environment variables. While in development mode, the project to place sensitive data like api keys inline to the code. Implementing this type of data inline will be exposed when pushed to github.

- [ejs](https://ejs.co/)

  - It is a simple templating language that lets you generate HTML markup with plain JavaScript. The project uses this libraries to make the html reusable and avoid too much editing different files.

- [Express](https://expressjs.com/)

  - It is is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. The reason for using this framework is because the it supports the templating engine used which is [ejs](https://ejs.co/).

- [helmet](https://www.npmjs.com/package/helmet)

  - It helps you secure your express apps by setting various HTTP headers. the project uses helmet to make improve security when communicating to the server.

- [mogoose](https://mongoosejs.com/)

  - It provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box. The project use this library because the application needs to store such as users basic and game informations.

- [morgan](https://www.npmjs.com/package/morgan)

  - It is a http requests logger for Node js. This helps makes sure that any request from client to the server are working properly. This is done by logging the request path name and the how long it took.

- [nodemon](https://www.npmjs.com/package/nodemon)
  - It is an excellent tool when working with node js web applications. This project relies on nodemon in development mode.

---

## Testing

1. **As a new user, I want to sign up for an account so that can have
   access.**

   1. Go to sign up page.
   1. Try to submit without filling any fields and an error message popped up.
   1. Try to submit an invalid email and an error message.
   1. Try to submit username field with invalid requirements from the system and an error message appears.
   1. Try to submit passwords that does not match and an error message appears.
   1. Submit the form with form with valid entries the page rendered a success page with the username.

      When my mentor first time signed up, she come across a bug that says "cannot read user".
      It was an error at one of the parameters being pass to my signup-success [route](https://github.com/chipchap31/brainquiznos/blob/master/routes/userRoute.js). The fix was to change "user" with "loggedIn" at line 45.

      When reviewed in the channel #peer-code-review, one of the student mentioned that when signing up and get an error, all of the input fields losses its value. As a result, he has to fill out all of them again. The fix was to add value attribute for all of the input fields except the radio type and re-rendering the value when received an error.

1. **As a user, I want to sign in so that I can start playing.**

   1. Go to login page.

   1. Try to submit without filling any fields and an error message popped up.

   1. Try to submit with a username not on database and an error message appears.
   1. If the username is found but the password is wrong an error message appears.
   1. Try to submit passwords that does not match and an error message appears.
   1. Submit the form with form with valid entries the page rendered the game interface.

1. **As a user, I want to start the game so that I can start solving the puzzles.**

   1. Go to main game interface.

   1. Slider of theme works going left and right and theme was successfully chosen by clicking.

   1. The difficulty modal renders and choosing the mode works.

   1. User successfully reached the main game and can start playing.

   During my own testing, I found at that sometime, after pressing the difficulty options, the images are not loaded straight away. As a result, the tiles are not rendered because they rely on the data fetched from unsplash api.

   I solved this by adding the tiles first as a placeholder without the images and preventing the start button from rendering before the images are loaded. You can have a look at it [here](https://github.com/chipchap31/brainquiznos/blob/e2a7ed9775668e7f6811ade8c01ff92fe761428d/assets/js/game.js#L176) until line 216.

   I also got a comment from one of the students that after choosing two images to match, the game doesn't let one choose another image straight away.

   The fix was to edit this block of code at this [line](https://github.com/chipchap31/brainquiznos/blob/e2a7ed9775668e7f6811ade8c01ff92fe761428d/assets/js/game.js#L266).

   ```javascript
   _.choices.length >= 2 ? setTimeout(() => _.proccessChoices(), 1000) : null;
   ```

   into this

   ```javascript
   _.choices.length >= 2 ? setTimeout(() => _.proccessChoices(), 400) : null;
   ```

1. **As a user, I want to be able to pause the game so that I can stop the time whenever I am doing something else.**

   1. The pause button works when the game started. During hint countdown the images hides and the countdown stops.

   1. A modal pops up asking the user if the user wants to continue or exit the game. Both buttons works.

   1. When the continue button is pressed the countdown continues and the images are shown again during the hint countdown only.

   1. The pause modal disappears and the user can continue playing.

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:

- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.

This project is hosted by the platform called [Heroku](https://www.heroku.com/).

Before deploying to production, I always make sure that the environment variables are in .gitignore to avoid commiting to github and make public. I also like to branch out from develop and create a release branch as it allows me to create a minor debugging.

The next step is to create a new application on Heroku. I called my app brainquiznos and choose Europe as the region. Heroku supports github so all I have to do is logged in to my github and connect the branch of my choice.

The Mongo uri for my database is different from the development mode, so it is essential that I have unique value in my .env.

The last and but not least is to apply for domain name. I registered "brainquiznos" at [NameCheap](https://www.namecheap.com/).

## Quick start

1. Clone the repo and install the dependencies.

   ```
   $ git clone  https://github.com/chipchap31/brainquiznos.git
   ```

1. Clone the repo and install the dependencies.

   ```
   $ npm install
   ```

1. Sign up for Unsplash api key [here](https://unsplash.com/developers)
1. Create a .env file in the root directory and add the required fields

   ```
   MONGO_URI=YOUR MONGODB URI
   UNSPLASH_KEY=YOUR UNSPLASH API KEY
   COOKIE_KEY_1=TYPE RANDOM STRING HERE
   COOKIE_KEY_2=TYPE RANDOM STRING HERE

   ```

1. Start the server

   ```
   $ npm run dev
   ```

1. Open http://localhost:8000/ on your browser.

## Credits

### Media

- The images for the game are all from the website [Unspash](https://unsplash.com/).
