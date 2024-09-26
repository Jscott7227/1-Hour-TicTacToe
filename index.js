window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const isValidAction = (tile) => {
        return tile.innerHTML === '';  // Check if tile is empty (no image)
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };

    const xImage = 'image.png';
    const oImage = 'undefined.png';

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);

        // Change player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        // Remove current text or image
        playerDisplay.innerHTML = '';

        // Create img element to display image
        const playerImg = document.createElement('img');
        playerImg.src = currentPlayer === 'X' ? xImage : oImage;
        playerImg.alt = currentPlayer;  // Optional: Set alt text as the current player ('X' or 'O')

        playerImg.style.width = '100px';  // Change to desired width
        playerImg.style.height = '100px'; 

        // Append image to the display
        playerDisplay.appendChild(playerImg);

        // Add the appropriate class (optional, if you're using it for styling purposes)
        playerDisplay.classList.add(`player${currentPlayer}`);
    };

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === "" || b === "" || c === "") {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes("")) announce(TIE);
    }

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerHTML = '';  // Clear any existing content

            // Create img element for the tile
            const playerImg = document.createElement('img');
            playerImg.src = currentPlayer === 'X' ? xImage : oImage;
            playerImg.alt = currentPlayer;

            playerImg.style.width = '100px';  // Adjust image size for the tile
            playerImg.style.height = '100px'; 

            // Append the image to the tile
            tile.appendChild(playerImg);

            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    };

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerHTML = '';  // Clear any images
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    resetButton.addEventListener('click', resetBoard);
});