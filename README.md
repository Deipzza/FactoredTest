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

## Prerequisites.
In order to use this project, you must have these configurations before-hand:

**Note:** These steps are only for Windows users.

1. **Download and install WinRAR:** Go to the (WinRAR downloads page)[https://www.win-rar.com/download.html?&L=0] and download the one that matches the configuration of your computer. Once downloaded, click on the `.exe` file you just downloaded and execute it in order to install WinRAR.

2. **Download and install Docker:** Go to the [Docker downloads page](https://docs.docker.com/desktop/install/windows-install/) and download Docker on your computer. Once it's downloaded, execute this file you just downloaded to install Docker.

2. **Download or clone this project's repository:** In the main page of this repository, click on the `<>Code` green button and either select a clone method or download the ZIP file to your computer. Be sure to put it in an easy-accessible folder.

<br>

## How to run this project?
Once you have done the previous steps, now you can execute the project:

1. **Open a Command Prompt or Terminal:** Go to the project's folder (the one that you just downloaded) on your computer and open it. If you downloaded the ZIP file, first you have to unzip it, that is, right-click on the file and select "Extract here" on the WinRAR context menu. Inside the folder, right-click and in the context menu select "Open in Terminal".

2. **Run Docker command:** In the terminal, run the command `docker compose up`. This will mount the containers and images required for the project to work properly. Be patient, this can take some time.

3. **Use the app:** Once the installation and configuration of the project containers (from the last command) are complete, open a browser and write http://localhost:3000/. This will open the main page of the application.

4. **Main functionalities:**  This application allows you to register and login with employee accounts and manage the stored skills they have. Once you create an account (register), you can login with this account and manage your skills: creating, updating or deleting them. Also, these are displayed in a Spider type chart on your profile.

5. **Dummy user:** The program has a dummy account that you can use to login immediately after installation. Its credentials are:
    * **email:** `david@mail.com`
    * **password:** `mypassword`
