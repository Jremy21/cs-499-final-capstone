# CS 499 Capstone Repository Code Review Plan

This repository contains my CS 499 capstone work and the enhancements I will complete across the course. The goal is to show professional level full stack development and clear problem solving. I will improve code quality, improve performance, and improve database handling.

## Project Artifact Overview

My main artifact is a full stack web application that I created during a previous SNHU course. The backend uses Node.js and Express. The database uses MongoDB. This project is a strong fit because it supports real world features like user actions and data searching.

## Enhancement Goals By Category

### Category One Software Engineering and Design

I cleaned up the existing code and improved readability across the project. I also added a search by state feature that is easy to use. This work showed that I can design maintainable code and add useful features.

Planned results included a clear request flow from the UI to the server. Planned results included consistent naming and better separation of concerns. Planned results included a user friendly search experience.

### Category Two Algorithms and Data Structures

I improved the logic used to process and filter data. I reduced repeated operations that slowed down the app. I also made the filtering steps easier to follow.

Planned results included fewer unnecessary loops. Planned results included cleaner filtering steps that scale better. Planned results included more reliable results when data sets grow.

### Category Three Databases

I updated database queries to support state based searching. I added safe handling for cases where the state was not found. I returned clear messages when no results were returned.

Planned results included safer query logic. Planned results included data validation for user input. Planned results included consistent responses that protected the app from bad input.

## Files Updated In This Repository

These are the main files and folders I updated during CS 499. The list may expand later as the project grows.

### Backend changes

`app_api/routes/index.js`
This connected the new search route to the API.

`app_api/routes/trips.js`
This included the state search endpoint and request handling.

`app_api/controllers/tripsController.js`
This held the search logic and the response formatting.

`app_api/models/trip.js`
This was updated to ensure the state field was consistent and query ready.

### Admin or UI changes

`app_admin/src/app/services/trip-data.service.ts`
This called the search endpoint and passed state input.

`app_admin/src/app/components/trips`
This included the UI updates for state search and results display.

`app_admin/src/app/app-routing.module.ts`
This was updated to support the new search flow.

### Documentation changes

`README.md`
This tracked the code review plan, the enhancement work, and the final results.

`docs` folder
This held flowcharts, pseudocode, and course narrative drafts.

## Testing and Validation Plan

I tested the state search using valid states and invalid states. I tested empty input and mixed case input. I confirmed that the API returned safe responses every time. I also confirmed that the UI displayed clear messages when no results were found.

## Security Mindset Notes

I validated search input before it reached the database. I avoided returning detailed error objects to the client. I kept responses consistent so the app stayed predictable and safe.