## Unit Assignment: Kudos Board

Submitted by: **Eric**

Deployed Application (optional): [Kudos Board Deployed Site](https://kudos-board-proj-3-1.onrender.com/)

### Application Features

#### CORE FEATURES

- [x] **Home Page**
  - [x] Displays header, banner, search, board grid, and footer.
  - [x] Displays preview of all boards on initial page load.
    - [x] Boards previews should show an image/gif and board title.
  - [x] Users can click on a category (recent, celebration, thank you, inspiration) to filter the boards.
    - [x] Recent displays most recently created boards.
    - [x] Other categories display boards of that type.
  - [x] Users can search for a board by name.
  - [x] Users can click on a board to navigate to a new page containing that board.
  - [x] Users can create a new board.
    - [x] Boards should have a title, category, and author (optional).
  - [x] User can delete boards.
  
- [x] **Board Page**
  - [x] Displays a list of all cards for a board.
    -  [x] Each card features a text message.
    -  [x] Each card features a gif found using the [GIPHY API](https://developers.giphy.com/docs/api/).
    -  [x] Users can optionally sign the card as the author.  
-   [x] Cards can be upvoted.
-   [x] Cards can be deleted.


#### STRETCH FEATURES

- [x] **User Accounts**
  - [x] Users should be able to log in with a username and password.
  - [x] Users should be able to sign up for a new account.
  - [x]  Boards and cards should be associated with a user.
    - [x]  Anonymous cards or cards by guest users should still be allowed.
  - [x] Add a new filter option on the home page to display only the current user's boards.
  - [x] Allow boards to be deleted only if they are owned by the user.
- [x] **Deployment**
  - [x] Website is deployed via Render.
- [x] **Comments**
  - [x] Users should be able to comment on cards.


### Walkthrough Video

[![Video](https://cdn.loom.com/sessions/thumbnails/5c58c6b3871c46199d3593c3f69c5f6c-with-play.gif)](https://www.loom.com/embed/5c58c6b3871c46199d3593c3f69c5f6c?sid=6319f792-cd22-4202-b9cf-b3db44815148)


### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

The topics didn't really help all that much because of the amount of content crammed into the week. If anything, the project this week should be smaller so more resources can be dedicated into teaching the content instead of it being rushed.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If I had more time, I would probably add a logout button instead of a perpetual login form. I finished all of the features and I can't really think of any features I would want to add.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

Once I got the hang of the backend and Prisma with PostgreSQL, mostly everything went smoothly. The major bugs I had were all DB related so I would love if more time was dedicated to teaching DBs. Also, I used Bootstrap which cut down a lot of CSS work on my end.

### Open-source libraries used

[Bootstrap](https://getbootstrap.com/)

### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.
