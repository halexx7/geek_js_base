
class CheassBoard {
    constructor() {
        this.x = 8;
        this.y = 8;
        this.nameColumn = ['','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        this.nameRow = [1, 2, 3, 4, 5, 6, 7, 8];
        this.createCheassBoard();
    }

    drawNameColumn(arr) {
        let colName = container.appendChild(document.createElement("div"));
        colName.setAttribute("class", "col__name");
        for (let i = 0; i <= this.x; i++) {
            const field = document.createElement("span");
            field.setAttribute("class", "field");
            field.textContent = arr[i];
            colName.appendChild(field);
        }
    }

    drawNameRow(arr, board) {
        let rowName = board.appendChild(document.createElement("div"));
        rowName.setAttribute("class", "chessboard__name-row");
        for (let i = 0; i < this.y; i++) {
            const field =document.createElement("span");
            field.setAttribute("class", "field");
            field.textContent = arr[i];
            rowName.appendChild(field);
        }
    }

    createCheassBoard() {
        let container = document.getElementById("container");
       
        //Создаем div и присваиваем имена колонкам от A до H
        this.drawNameColumn(this.nameColumn);

        //Создаем div доски
        let chessBoard = document.createElement("div");
        chessBoard.setAttribute("class", "chessboard");
        container.appendChild(chessBoard);

        //Создаем div и присваиваем имена строкам от 1 до 8
        this.drawNameRow(this.nameRow, chessBoard);

        //Создаем div игрового поля
        let gameField = document.createElement("div");
        gameField.setAttribute("class", "chessboard__gamefield");
        chessBoard.appendChild(gameField);
    
        //Отрисовываем черно-белые поля
        for (let i = 0; i < this.y; i++) {
            let row = gameField.appendChild(document.createElement("div"));
            row.setAttribute("class", "row");
    
            for (let j = 0; j < this.x; j++) {
                const field = document.createElement("span");
    
                if ( i % 2 == 0 ) {
    
                    if ( j % 2 == 0 ) {
                        field.setAttribute("class", "white  field");
                    } else {
                        field.setAttribute("class", "black  field");
                    }
    
                } else {
    
                    if ( j % 2 == 0 ) {
                        field.setAttribute("class", "black  field");
                    } else {
                        field.setAttribute("class", "white  field");
                    }
    
                }
    
                row.appendChild(field);
            }
        }
    }

};

new CheassBoard();