// A board is not meant to be instanced, 
// it's just to define a common API

class Board {
    constructor(tileClass, N, M){
        this._tc = tileClass;
        this.resetBoard(N, M);
    }

    copyBoard(board) {
        if (board.length == 0 || board[0].length == 0) {
            console.error("Board dimensions must be greater than 0");
            return;
        }

        this.setBoard(board.length, board[0].length, (x, y) => board[x][y]);
    }

    resetBoard(N, M) {
        this.N = N;
        this.M = M;

        this.boards = [];

        for (var r = 0; r < 3; r++) {
            let br = [];
            for (var c = 0; c < 3; c++) {
                let m = [];
                for (var x = 0; x < this.N; x++) {
                    let mr = [];
                    for (var y = 0; y < this.M; y++) {
                        mr.push(this._tc());
                    }
                    m.push(mr);            
                }
                br.push(m);        
            }
            this.boards.push(br);
        }
    }

    setBoard(N, M, tileSetter) {
        this.resetBoard(N, M);

        /* board[i, j] is mapped by translating the pos by [(i-1)*N, (j-1)*M] units
            [0, 0] -> [-N, -M]
            [0, 1] -> [-N, 0]
            [0, 2] -> [-N, M]
            [1, 0] -> [0, -M]
            [1, 1] -> [0, 0]
            [1, 2] -> [0, M]
            [2, 0] -> [N, -M]
            [2, 1] -> [N, 0]
            [2, 2] -> [N, M]
        */
        
        for (var x = 0; x < this.N; x++) {
            for (var y = 0; y < this.M; y++) {
                this.setPos([x, y], tileSetter(x, y));
            }
        }
    }

    setPos(pos, value) {
        let touchedPositions = this.touchedPositions(pos);
        for (var boardC = 0; boardC < 3; boardC++ ) {
            for (var boardR = 0; boardR < 3; boardR++ ) {
                let boardPos = touchedPositions[boardC][boardR];
                this.boards[boardC][boardR][boardPos[0]][boardPos[1]] = value;
            }
        }    
        
        return touchedPositions;
    }

    touchedPositions(pos) {
        let tc = [];
        for (var boardC = 0; boardC < 3; boardC++ ) {
            let row = [];
            for (var boardR = 0; boardR < 3; boardR++ ) {
                let boardPos = this.translate(pos, [(boardC-1)*this.N, (boardR-1)*this.M]);
                row.push(boardPos);
            }
            tc.push(row);
        }

        return tc;
    }

    inBounds(pos) {
        return 0 <= pos[0] && pos[0] < this.N && 0 <= pos[1] && pos[1] < this.M;
    }

    at(pos) {
        if (!this.inBounds(pos)) {
            console.error("(" + pos[0] + "," + pos[1] + ") do not describe a valid board position");
            return;
        }

        return this.boards[1][1][pos[0]][pos[1]];
    }

    translate(pos, dir) {
        console.error("method not implemented");
    }

    up(pos) {
        return this.translate(pos, [-1, 0]);
    }

    down(pos) {
        return this.translate(pos, [1, 0]);
    }

    left(pos) {
        return this.translate(pos, [0, -1]);
    }

    right(pos) {
        return this.translate(pos, [1, 0]);
    }

    upRight(pos) {
        return this.translate(pos, [-1, 1]);
    }

    upLeft(pos) {
        return this.translate(pos, [-1, -1]);
    }

    downRight(pos) {
        return this.translate(pos, [1, 1]);
    }

    downLeft(pos) {
        return this.translate(pos, [1, -1]);
    }
}