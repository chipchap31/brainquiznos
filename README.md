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

---

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

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
   1. Go to the "Contact Us" page
   2. Try to submit the empty form and verify that an error message about the required fields appears
   3. Try to submit the form with an invalid email address and verify that a relevant error message appears
   4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:

- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.

## Credits

### Content

- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media

- The photos used in this site were obtained from ...

### Acknowledgements

- I received inspiration for this project from X
