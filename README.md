# 象棋/Elephant Chess

Way for my dad to teach me 象棋/Elephant Chess when we are not seated at the 象棋/Elephant Chess board together

## In-Progress Idea List

* Single-page application has only one board and two players, Dad and me
* The board is stable and stays exactly as it is so the game can be picked right back up, just like the physical board
* Game rule implementation/enforcement
* Legal move highlighting
* Explain legality/illegality of the move, citing the rule in question

## Application of the Three Principles of Redux to the App

1. Single source of truth with respect to Dad's view and my view of the state of the game
1. Only action emitted upon Dad's legal move/my legal move can change the read-only state of the game
1. The only way to transform the state of the game is through the pure function/reducer written to take in Dad's emitted action/my emitted action and return the new state of the game
