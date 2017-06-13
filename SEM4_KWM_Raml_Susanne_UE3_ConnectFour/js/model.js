window.connectFour = window.connectFour || {};

(function (namespace, window) {
    'use strict';

    class Model {
        constructor() {
            this.numRows = connectFour.CONFIG.numRows;
            this.numColumns = connectFour.CONFIG.numColumns;
            this.lineLength = connectFour.CONFIG.lineLength;

            this.noToken = "-";
            this.xToken = "x";
            this.oToken = "o";

            this.board = [];

            this.player1 = true;
            this.player2 = false;
            this.curPlayer = this.player1;


            console.log("hello model constructor");
        }

        // --------- public ---------

        init() {
            console.log("in init");
            for (let $i = 0; $i < this.numColumns; $i++) {
                this.board[$i] = [];
                /*for (let $j = 0; $j < this.numRows; $j++) {
                    this.board[$i][$j] = this.noToken;
                }*/
            }
        }

        insertTokenAt(columnIndex) {
            console.log(columnIndex);
            if(this.curPlayer == this.player1){
                this.board[columnIndex].push("x");
                this.curPlayer = this.player2;
            }
            else {
                this.board[columnIndex].push("o");
                this.curPlayer = this.player1;
            }

            $(this).trigger("change");
        }

        isInsertTokenPossibleAt(columnIndex) {
           if(this.board[columnIndex].length >= this.numRows){
               console.log("false");

               return false;
            }
            else return true;
           //return true;
        }

        toString() {
            let output = "";
            for (let $i = 0; $i < this.numColumns; $i++) {
                for (let $j = this.numRows-1; $j >= 0; $j--) {
                    if(this.board[$i][$j] == null){
                        output += "<span>"+this.noToken+"</span>";
                    }
                    else {
                        output += "<span>" + this.board[$i][$j] + "</span>";
                    }
                }
                output += "<br/>";
            }
            return output;

        }

        // --------- private ---------


    }

    namespace.Model = Model;

})(window.connectFour, window);

