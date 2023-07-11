# Plan

## func int main

- console out "Please enter input"
- console in save input string
- create board class using the input string as input
- return 0

## class board

- initialize instructions var by formating the input string into a vector
- initialize facing var dafault N
- initialize postion var default 0,0
- initialize directions vector with N,E,S,W

### run a function for each move

- switch with cases for M, L || R
- if M run function for with another switch cases for facing direction
- if L || R run function for turning, use current facing direction and find its index in the posible directions vector then add or subtract 1 and use that direction.

after all moves are done print out result in format positon, facing.
