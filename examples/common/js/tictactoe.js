class TicTacToe {
    constructor(boardID, board) {
        this.board = board;
        this.gameDOM = document.getElementById(boardID);
        this.color = {
            X: "blue",
            O: "red"
        };
        
        // Grab all board copies references
        this.boardsDOM = [];
        for (var boardC = 0; boardC < 3; boardC++ ) {
            for (var boardR = 0; boardR < 3; boardR++ ) {
                let selector = "#\\3" + boardC.toString() + "-\\3" + boardR.toString();
                let bd = this.gameDOM.querySelector(selector);
                this.boardsDOM.push(bd);
            }
        }
        

        this.turnCounter = {
            moveCount: 0, 
            nextTile: function() {
                return "XO"[this.moveCount % 2]
            },
            advanceTile: function() {
                this.moveCount++;
            }
        };

        var ttc = this;



        let mainboardTilesDOMS = this.boardsDOM[4].querySelectorAll("div");
        for (var i = 0; i < mainboardTilesDOMS.length; i++) {
            mainboardTilesDOMS[i].addEventListener("click", (event) => ttc._handleMove(event));
            mainboardTilesDOMS[i].addEventListener("mouseenter", (event) => ttc._handleHover(event));
            mainboardTilesDOMS[i].addEventListener("mouseleave", (event) => ttc._handleHoverOut(event));
        }
        
    }

    _handleMove(e) {
        let parsedpos = parseInt(e.target.id, 10);

        // UGLY: pass responsability to board to check if it is empty or not? 
        if (e.target.style.color != "black" && e.target.textContent) return; // is already occupied;

        let tile = this.turnCounter.nextTile();
        this.turnCounter.advanceTile();
        let pos = [(parsedpos / 3) >> 0, parsedpos % 3];
        let touchedPositions = this.board.setPos(pos, tile);
        this.lastPos = pos;
        if (this.isGameFinished()) {
            console.log("Game Finished!");
        }
        
        for (var boardC = 0; boardC < 3; boardC++ ) {
            for (var boardR = 0; boardR < 3; boardR++ ) {
                let selector = "#\\3" + (3 * touchedPositions[boardC][boardR][0] + touchedPositions[boardC][boardR][1]).toString();
                let tileDom = this.boardsDOM[boardC * 3 + boardR].querySelector(selector);
                tileDom.innerHTML = tile;
                tileDom.style = "color:" + this.color[tile];
            }
        }
    }

    _handleHover(e) {
        let parsedpos = parseInt(e.target.id, 10);

        // UGLY: pass responsability to board to check if it is empty or not? 
        if (e.target.textContent) return; // is already occupied;


        let tile = this.turnCounter.nextTile();
        let pos = [(parsedpos / 3) >> 0, parsedpos % 3];
        let touchedPositions = this.board.touchedPositions(pos, tile);

        for (var boardC = 0; boardC < 3; boardC++ ) {
            for (var boardR = 0; boardR < 3; boardR++ ) {
                let selector = "#\\3" + (3 * touchedPositions[boardC][boardR][0] + touchedPositions[boardC][boardR][1]).toString();
                let tileDom = this.boardsDOM[boardC * 3 + boardR].querySelector(selector);
                tileDom.innerHTML = tile;
                tileDom.style = "color:black";
            }
        }    
    }

    _handleHoverOut(e) {
        let parsedpos = parseInt(e.target.id, 10);

        let tile = this.turnCounter.nextTile();
        let pos = [(parsedpos / 3) >> 0, parsedpos % 3];
        let touchedPositions = this.board.touchedPositions(pos, tile);

        for (var boardC = 0; boardC < 3; boardC++ ) {
            for (var boardR = 0; boardR < 3; boardR++ ) {
                let selector = "#\\3" + (3 * touchedPositions[boardC][boardR][0] + touchedPositions[boardC][boardR][1]).toString();
                let tileDom = this.boardsDOM[boardC * 3 + boardR].querySelector(selector);
                if (tileDom.style.color == "black") {
                    tileDom.style = "";
                    tileDom.innerHTML = "";
                }
            }
        }    
    }

    isGameFinished() {
        let res = false;
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) continue;
                res = res || this.threeInARow(this.lastPos, [i, j])
            }
        }
        return res;
    }

    threeInARow(pos, dir) {
        return  (
                    this.board.at(pos) == this.board.at(this.board.translate(pos, dir)) &&
                    this.board.at(pos) == this.board.at(this.board.translate(pos, [2*dir[0], 2*dir[1]]))
                ) || (
                    this.board.at(pos) == this.board.at(this.board.translate(pos, dir)) &&
                    this.board.at(pos) == this.board.at(this.board.translate(pos, [-1*dir[0], -1*dir[1]])) 
                );
    }
}