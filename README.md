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

- Normal mode

  - Hint time: 10 seconds
  - Game duration: 1:30 seconds
  - Total tiles: 24
  - Points multiplier: (time left when puzzle was solved x 0.5)

- Hard mode
  - Hint time: 10 seconds
  - Game duration: 2 minutes
  - Total tiles: 30
  - Points multiplier: (time left when puzzle was solved x 1)

---

## UX

I always start my UX process with research. The research involves comparing at least three existing memory game website and getting random users that justify my target audience.

These are the list of websites that I have chosen to be tested:

1.  [Webgamesonline](https://www.webgamesonline.com/memory/)
2.  [Dkmgames](https://dkmgames.com/Memory/pairsrun.php)
3.  [Helpfulgames](https://www.helpfulgames.com/subjects/brain-training/memory.html)

### Feedback for each websites

#### [Webgamesonline](https://www.webgamesonline.com/memory/)

Webgamesonline is a really simple memory game. When the users initially the page, they didn't have any trouble to start the game. The main reason for this is because the main game is already visible to the users when loaded. The font size is greater than the ideal font size which is 16px. Except for the button's text and the time lapsed. The colour scheme is fantastic. Although, the colour of the solved images are the same with the unsolved. As a result, two of the users click on them by mistake.

#### [Dkmgames](https://dkmgames.com/Memory/pairsrun.php)

Dkmgames is a an awesome website, because it has multiple games within its website. It has a login system that let's you save your progress. The goal of the game is to complete each level that gets harder as you go along.

In terms of usability, you have no controls at all. The font size are great and it is readable because it is greater than the ideal font size. The colour could be better because it is doesn't fit the context of the page. The page does not scale very well, because it images stays on the same place which is in to left of the page. As a result, some all of the users find it really difficult to click the images.

[Helpfulgames](https://www.helpfulgames.com/subjects/brain-training)

Helpfulgames is a bit similar to [Dkmgames](https://dkmgames.com/Memory/pairsrun.php)

**Usability** - When the users load the website they were able to determine what the website is all about and started playing straight away

**Font Size** - The font size is really greater than the ideal 16px so overall the font size is fine. Except for the button's text and the time.

**Colour** - The overall colour palette is fantastic. The colour of the solved tiles are the same with the unsolved. As a result, two of my users clicked on them.

**Scale** - The whole document does not scale at all for mobile landscape. The time that shows when the users started game became really small as well as the button to start a new game.

Use this section to provide insight into your UX process, focusing on who this website is for, what it is that they want to achieve and how your project is the best way to help them achieve these things.

In particular, as part of this section we recommend that you provide a list of User Stories, with the following general structure:

- As a user type, I want to perform an action, so that I can achieve a goal.

This section is also where you would share links to any wireframes, mockups, diagrams etc. that you created as part of the design process. These files should themselves either be included as a pdf file in the project itself (in an separate directory), or just hosted elsewhere online and can be in any format that is viewable inside the browser.

## Features

- **Secure login system** - allows users to create an account fast and simple by having them fill out the required fields. Also, to prevent third party from playing with their account when they are away from keyboard.In the near future, I will implement [Sendgrid](https://sendgrid.com/) to enable account verification and password recovery feature.

### Existing Features

- Feature 1 - allows users X to achieve Y, by having them fill out Z
- ...

For some/all of your features, you may choose to reference the specific project files that implement them, although this is entirely optional.

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

### Features Left to Implement

- Another feature idea

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- [JQuery](https://jquery.com)
  - The project uses **JQuery** to simplify DOM manipulation.

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
