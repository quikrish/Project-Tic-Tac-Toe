# Project-Tic-Tac-Toe
theodinproject Project: Tic Tac Toe

A simple Tic Tac Toe game built using JavaScript, HTML, and CSS. This project demonstrates the use of modular JavaScript, event handling, and DOM manipulation to create an interactive browser-based game.

## Features

- Two-player mode: Players take turns placing their markers (`X` and `O`).
- Game state management using a module pattern.
- Dynamic rendering of the game board based on the current state.
- Win detection for rows, columns, and diagonals.
- Tie detection when the board is fully occupied without a winner.
- Option to restart the game.

## Table of Contents

- [How to Play](#how-to-play)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [How It Works](#how-it-works)
  - [Gameboard Module](#gameboard-module)
  - [Player Factory](#player-factory)
  - [GameController Module](#gamecontroller-module)
- DEMO

## How to Play

1. Open the game in your browser.
2. Players take turns clicking on the board to place their markers (`X` or `O`).
3. The first player to align three markers horizontally, vertically, or diagonally wins.
4. If all cells are filled without a winner, the game ends in a tie.

## Project Structure

```
├── index.html      # Main HTML file
├── style.css       # Stylesheet for the project
├── main.js       # Main JavaScript file
├── README.md       # Project documentation
```

## Technologies Used

- **HTML**: To structure the game board and UI elements.
- **CSS**: To style the game board and enhance the user experience.
- **JavaScript**: To implement game logic, state management, and interactivity.

## How It Works

### Gameboard Module
The `Gameboard` module manages the state of the game board:
- **Board Initialization**: A 3x3 array representing the game grid.
- **Update Method**: Validates and updates cells when a player makes a move.
- **Read-Only Access**: Provides the current board state for rendering.

### Player Factory
The `Player` factory function creates player objects:
- **Properties**: Each player has a `name` and a `marker` (`X` or `O`).

### GameController Module
The `GameController` module handles the main game logic:
- **Switch Turn**: Alternates between players after each valid move.
- **Check Winner**: Validates win conditions for rows, columns, and diagonals.
- **Check Tie**: Determines if the game ends in a draw.
- **Play Round**: Integrates all the above functions to execute a player turn.

### Rendering
The board is dynamically re-rendered after each move:
- Clears the existing board (`innerHTML = ""`).
- Loops through the current state and updates cells based on their values.
- Attaches click event listeners to each cell for player interaction.

## DEMO
https://quikrish.github.io/Project-Tic-Tac-Toe/
