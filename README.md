# FactoredTest.

## What is this project?
This repository contains a basic employee management web app, developed for the Fullstack test at Factored, by David Pérez Zapata.

The project was made using the following main technologies:
* [FastAPI](https://fastapi.tiangolo.com) for the backend.
* [React.js](https://react.dev) for the frontend.
* [SQLAlchemy](https://www.sqlalchemy.org) with SQLite for the database management.
* [Docker](https://www.docker.com) for the deployment and compatibility in other machines.

<br>

Other libraries used are:
* [Bulma CSS Framework](https://bulma.io) for the styling of the JSX code inside React components.
* [React Router](https://reactrouter.com/en/main) to control some parts of the routing and navigation.

<br>

---
<br>

## How to run this project.
In order to use this project, you must follow these steps:

1. **Download Docker:** Go to [the installation page of Docker](https://docs.docker.com/desktop/install/windows-install/) and download and install Docker on your computer.

2. **Download or clone the repository:** In the main page of the repository, click on the `<>Code` green button and either select a clone method or download the ZIP file to your computer.

3. **Open a Command Prompt or Terminal:** Go to the project's folder (the one that you just downloaded) on your computer and open it. Inside it right-click and select "Open in Terminal".

4. **Run Docker command:** In the terminal, run the command `docker compose up`. This will mount the containers and images required for the project to work properly.

5. **Use the app:** Once the installation and configuration of the project containers (from the last command) are complete, open a browser and write http://localhost:3000/. This will open the main page of the application.

6. **Main functionalities:**  This application allows you to register and login with employee accounts and manage the stored skills they have. Once you create an account (register), you can login wit this account and manage your skills: creating, updating or deleting them. Also, these are displayed in a Spider type chart on your profile.


**Note:** These steps are only for Windows users.