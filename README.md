# *LiftWyse*

## A simple, intuitive fitness app designed for planning and tracking workouts with success indicators and gesture-based interaction.
## Table of Contents

    Project Overview
    Features
    Technologies Used
    Screenshots
    Installation
    Usage
    CI/CD Workflow
    Contributing
    License

# Project Overview

The Fitness App allows users to plan their workouts, log each set, and track progress. The app includes intuitive gesture-based interactions, making workout tracking easy and engaging.
Features

    Workout Planning: Plan workouts ahead of time and log individual sets.
    Progress Tracking: Swipe left for incomplete sets, swipe right for successful sets.
    Real-Time Database Storage: User workout data is saved and retrieved in real-time.
    Intuitive UI: Swipe gestures make it easy to log workout success or failure on the fly.
    CI/CD Workflow: Includes stages for mockup creation, code testing, development branches, and version control.

# Technologies Used

    Frontend: React Native [HTML, CSS], Expo Go SDK
    Backend: TypeScript, Firebase Realtime Database (RDB)
    Version Control: GitHub, following a CI/CD approach

# Installation

Clone the repository:
    
    git clone https://github.com/JAGerales/liftWyse.git
    cd liftWyse

Install dependencies:

    npm install

Set up Firebase:

    Set up a Firebase project and enable the Realtime Database.
    Obtain your Firebase configuration credentials and add them to a .env file.

Run the app:

    expo start

Usage

    Create a Workout: Go to the "Plan" tab to set up your workout.
    Log Sets: Swipe right to mark a set as complete or left to mark it as incomplete.
    View Progress: Access workout history and metrics on the "Profile" tab. [ COMING SOON ] 

# CI/CD Workflow

The project follows a CI/CD lifecycle, including:

    Mockup Creation: Initial design created in Figma.
    Development Branches: All new features are developed in separate branches [feature branch] and merged into the development branch after review to test with other components. Once ready to deploy, development merges with staging/main.
    Continuous Testing: Each feature undergoes testing before deployment.

# Contributing

    Fork the repository.
    Create a new feature branch (git checkout -b feature/your-feature).
    Commit your changes (git commit -am 'Add a new feature').
    Push to the branch (git push origin feature/your-feature).
    Create a pull request.

# License

This project is licensed under the MIT License. See the LICENSE file for details.
