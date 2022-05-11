# Remote Book Club (RBC)

## About

A simple website to host a remote book club. Users can log in to add suggestions to the reading list, see the current book or review the reading history.

### Tech Stack

- [Node.js](https://nodejs.org/en/docs/guides/getting-started-guide/) JavaScript runtime environment.
- [Express](https://expressjs.com/) web framework for Node.js.
- [Jest](https://jestjs.io/) to write and run unit tests.
- [ESLint](https://eslint.org) for linting.
- [ESBuild](https://esbuild.github.io/getting-started/) to bundle JS source files.


### Functionality

- You don't have to be logged in to see the reading history
- Users can sign up to RBC with email, name and a username
- The username and email are unique
- In order to start a conversation about the book, users can comment on books

**MVP**

- User: See current book and discussion date
- User: Can see all previously selected books

<details><summary>MVP user stories & wireframe</summary>

```
As a RBC member
So that I can keep up with my reading
I would like to be able to see the current book and discussion date

As a RBC member
So that I can keep track of my reading
I would like to be able see all previous remote-book-club selected books
```

![](./images/wireframeMVP.png)


</details>
<br>

**Additional**<br>

- User: Sign up
- User: Sign in
- User: Sign out
- User: Add book suggestion
- User: Get reminder emails

<details><summary>Additional user stories & wireframes</summary>

```
As a RBC member
In order to interact with the application
I would like to be able to sign up

As a RBC member
So that I could access my account
I would like to be able to sign in

As a RBC member
So that I could keep my account secure
I would like to be able to sign out

As a RBC member
So that I can suggest a new book
I would like to be able to post my book suggestion

As a RBC member
So that I am kept up to date with my reading
I would like to recieve an email every time a new book is selected

As a RBC member
So that I don't miss a discussion
I would like to recieve an email reminder the morning of a book discussion with a link
```

![](./images/wireframeAdditional.png)

</details>