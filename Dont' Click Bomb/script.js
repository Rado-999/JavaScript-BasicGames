const container = document.getElementsByClassName('container')[0]
const allBoxes = Array.from(document.getElementsByClassName('box'))
const easyMode = document.getElementsByClassName('easyBtn')[0]
const hardMode = document.getElementsByClassName('hardBtn')[0]
const modes = Array.from(document.getElementsByClassName('buttons')[0].children)
const body = document.getElementsByTagName('body')[0]
const header = document.getElementsByTagName('h1')[0]
const gameState = document.getElementsByClassName('gameState')[0]
const gameOverText = document.getElementsByClassName('gameOverParagraph')[0]
const gameOverContainer = document.getElementsByClassName('gameOverContainer')[0]
const tryAgainbtn = document.getElementsByClassName('tryAgainBtn')[0]
const clickedBoxMsg = document.getElementsByClassName('clickedBoxMsg')[0]


const gameModeSettings = {
    'Easy':{
        'bombs':5,
        'cells':50,
    },
    'Hard':{
        'bombs':10,
        'cells':100
    }

}


easyMode.addEventListener('click', startGame)
hardMode.addEventListener('click', startGame)


let gameRound, bombsPositions;



function startGame(e){
    let modeName = e.target.textContent
    let modeSettings = gameModeSettings[modeName]

        modes.forEach(element => {
            element.style.display = 'none'
        });


    header.style.display = 'none'
    

    prepareGame()

    function prepareGame(){
        container.style.display='inline-grid'
        container.classList.add(modeName.toLowerCase())
        gameRound = 0
        bombsPositions  = []

        // function checkIsFirstGame(){
        //     if(allBoxes.filter((box)=>box.classList.contains('clicked')).length === 0){
        //         return true
        //     }
        //     return false
        // }
        
        // if (checkIsFirstGame()){
            for (let index = 0; index < modeSettings.cells; index++) {
                let cell = allBoxes[index]
                cell.style.display = 'block'        
            }
        // }

        allBoxes.forEach(
            (box)=>box.classList.remove('clicked')
        )

        
        gameState.style.display = 'block'
        gameState.textContent = `You start the game in ${modeName} Mode`
    
        putTheBombs()
    
        function putTheBombs(){
            let randomBox
            bombsPositions=[]
            for (let index = 0; index < modeSettings.bombs; index++) {
                do{
                    randomBox = Math.floor(Math.random()*allBoxes.length)
                }
                while(bombsPositions.includes(randomBox))
                bombsPositions.push(randomBox)
            }
            
        }
    }
    
    container.addEventListener('click', startRound)

    
    function startRound(e){
        clickedBoxMsg.style.display = 'none'
        let clickedBox = e.target
        if (clickedBox.classList.contains('container')){
            return
        }
    
        if (clickedBox.classList.contains('clicked')){
            gameState.textContent = `Round ${gameRound}`
            clickedBoxMsg.style.display = 'block'
            return
        }
        
        let indexOfClickedBox = allBoxes.indexOf(clickedBox)
    
        if (bombsPositions.includes(indexOfClickedBox)){
            return gameOver()
        }
        clickedBox.classList.add('clicked')
        let clickedBoxes = allBoxes.filter((el)=>el.classList.contains('clicked'))
        if (clickedBoxes.length === (allBoxes.length)-(modeSettings.bombs).length){
            return winnableScenario()
        }
        gameRound ++
        gameState.textContent = `Round ${gameRound}`   
        }
        
    
    
    
        function gameOver(){
            container.removeEventListener('click', startRound)
            container.classList.remove(modeName.toLowerCase())
            gameOverContainer.style.display = 'block'
            gameState.textContent = `Bomb explode! Game Over! You die at round ${gameRound+1}`

            prepareForNewGame()

            tryAgainbtn.addEventListener('click', chooseDifficult)

            function chooseDifficult(){
                gameState.style.display = 'none'
                header.style.display = 'block'
                gameOverContainer.style.display = 'none'
                modes.forEach(element => {
                    element.style.display = 'inline'
                });
                
            }

        }
    
        function winnableScenario(){
            gameState.textContent = `Congratilutaions! You didn't explode any bomb`
            prepareForNewGame()
        }
    
        function prepareForNewGame(){
            container.style.display = 'none'
            allBoxes.forEach((box)=>{
                box.style.display = 'none'
            })
        }
    
}





