#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

using namespace std;

class Board {
    private:
        vector<char> directions = {'N', 'E', 'S', 'W'};
        vector<char> moves = {};
        vector<int> position = {0, 0};
        vector<int> maxSize = {4, 4};
        char facing = 'N';

        void turn(char direction) {
            vector<char>::iterator itr;
            itr = find(directions.begin(), directions.end(), facing);
            int currentIndex = distance(directions.begin(), itr);

            switch(direction) {
                case 'r':
                case 'R':
                    switch(currentIndex) {
                        case 3:
                            facing = directions[0];
                            break;
                        default:
                            facing = directions[currentIndex + 1];
                            break;
                    }
                    break;
                case 'l':
                case 'L':
                    switch(currentIndex) {
                        case 0:
                            facing = directions[3];
                            break;
                        default:
                            facing = directions[currentIndex - 1];
                            break;
                    }
            }
        };

        void move() {
            switch(facing) {
                case 'N':
                    if(position[1] != maxSize[1]) {
                        position[1] = ++position[1];
                    }
                    break;
                case 'E':
                    if(position[0] != maxSize[0]) {
                        position[0] = ++position[0];
                    }
                    break;
                case 'S':
                    if(position[1] != 0) {
                        position[1] = --position[1];
                    }
                    break;
                case 'W':
                    if(position[0] != 0) {
                        position[0] = --position[0];
                    }
                    break;
            }
        };

    public: 
        string inputString;

        void formatInputString() {
        this->moves.assign(inputString.begin(), inputString.end());
        }

        void runMoves() {
            for (const char nextMove: moves) {
                cout << '\n' << to_string(position[0]) << ',' << to_string(position[1]) << ' '<< facing;
                switch (nextMove) {
                case 'M':
                case 'm':
                    move();
                    break;
                case 'L':
                case 'l':
                case 'R':
                case 'r':
                    turn(nextMove);
                    break;
                default:
                    break;
                }
            }
        }

        string printEndPos() {
            string res = to_string(position[0]) + " " + to_string(position[1]) + " " + facing;
            return res;
        }
};

int main() {
    cout << "Please enter your input string: ";
    string input = "";
    cin >> input;

    Board newBoard;
    newBoard.inputString = input;
    newBoard.formatInputString();
    newBoard.runMoves();
    cout << '\n' << "Your moves" << '\n';
    cout << '\n' << newBoard.printEndPos();
    return 0;
}

