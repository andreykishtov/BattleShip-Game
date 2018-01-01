# BattleShip Game

## Intro

BattleShip Game or Sea Battle​ is a game for two players. It is played on
ruled grids (paper or board) on which the players' fleets of ships (including battleships)
are marked. The locations of the fleet are concealed from the other player. Players
alternate turns calling "shots" at the other player's ships, and the objective of the game
is to destroy the opposing player's fleet.

ServerSide

## Main Technologies

### ServerSide

socket.IO, Node.js.

### ClientSide

Pure Javascript and the HTML5 Canvas.

## Key Notes

1. Player can logon to the game using a nickname (no password needed)
   If nickname is already used by another user online, player should chose a
   different nickname.
2. Player can see a list of other players currently not in a game
3. Player can request to play with another player from above list
4. Game proceed by turns, first player is the one that starts the game.
5. All decision making is done on the server to prevent cheating.

## High Level Design

```
                          +-------+
                          |clients|                  +-----------+
                          +---+---+                  |random ship|
            files sent to     |                      |generator  |
            all clients    +--v---+                  +-------+---+
           +---------------+server+-----------+              ^
           |               +----+-+        +--v--+           |
           |                    |          |users+------+    |
       +---v---------------+    |          +-----+   +--v----+---+
       |client static files|    |                    |game logics|
       +--+----------------+    +------------+       +----^------+
          |                                  |            |
 +--------v--+          +-------+         +--v----+       |
 |user logics+--------+->emiters<---------+emiters+-------+
 +-------+---+        | +-------+         +-------+
         |            |      +--------------^
+--------v----+       |         socket.IO connection
| board Drawer|      +v----------+
+-------------+      |game logics|
                     +-----------+
```
