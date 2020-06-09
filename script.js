const GameBoard = (() => {
    const Player = (string) => {
        const id = string;
        return { id }
    };
    const p1 = Player("X");
    const p2 = Player("O");
    let currentPlayer; //khai bao bang const thi khong the gan gia tri duoc (immutable)

    let matrix = [];
    const line = (a, b, c) => {
        if(a==-1||b==-1||c==-1)
            return false;
        if (a.id == b.id & a.id == c.id) return true;
        return false;
    };
    const checkOver = () => {
        if (line(matrix[0], matrix[1], matrix[2])){
            return matrix[0];
        }
        if (line(matrix[6], matrix[7], matrix[8])){
            return matrix[6];
        }
        if (line(matrix[3], matrix[4], matrix[5])){
            return matrix[0];
        }
        if (line(matrix[0], matrix[3], matrix[6])){
            return matrix[0];
        }
        if (line(matrix[1], matrix[4], matrix[7])){
            return matrix[1];
        }
        if (line(matrix[2], matrix[5], matrix[8])){
            return matrix[2];
        }
        if (line(matrix[0], matrix[4], matrix[8])){
            return matrix[0];
        }
        if (line(matrix[2], matrix[4], matrix[6])){
            return matrix[2];
        }
        const draw = matrix.every(function(value){
            return value!=-1;
        });
        if(draw==true)
            return 1;
        return null;
    }

    const playerTurn = function (index) {
        if (matrix[index] == -1) {
            matrix[index] = currentPlayer;
            this.textContent = currentPlayer.id;
            changeTurn();
            console.log(this);
            if(checkOver()==1){
                console.log("Hai doi hoa");
                DisplayController.init();
            }
            else if(checkOver()!=null){
                console.log("Nguoi thang" + checkOver().id);
                DisplayController.init();
            }
        }
    };

    const changeTurn = () => {
        if (currentPlayer == p1) currentPlayer = p2;
        else currentPlayer = p1;
    };

    const resetMatrix = ()=>{
        matrix = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
        currentPlayer = p1;
    }

    return { playerTurn , resetMatrix};
})();


const DisplayController = (() => {
    const gameboard = document.querySelector('.gameboard');

    const init = () => {
        GameBoard.resetMatrix();
        const divs = document.querySelectorAll('.square');
        divs.forEach(element => {
            gameboard.removeChild(element);
        });

        for (let i = 0; i < 9; i++) {
            const div = document.createElement('div');
            div.classList.add("square");
            div.addEventListener('click', GameBoard.playerTurn.bind(div, i));
            gameboard.appendChild(div);
        }
    }
    return { init };
})();

DisplayController.init();