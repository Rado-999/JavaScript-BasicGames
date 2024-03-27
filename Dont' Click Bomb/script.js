const container = document.getElementsByClassName('container')[0]
const allBoxes = Array.from(document.getElementsByClassName('box'))
const easyMode = document.getElementsByClassName('easyBtn')[0]
const allModes = document.getElementsByClassName('buttons')[0]
const body = document.getElementsByTagName('body')[0]


let bombs = 5
let bombsPositions = []
let gameRound = 0

let gameMessage = document.createElement('p')


easyMode.addEventListener('click', startGame)

function startGame(){
    putTheBombs()
    allBoxes.forEach((box)=>{
        box.classList.remove('clicked')
    })

    gameMessage.textContent = `You start the game in ${easyMode.textContent} Mode`
    body.appendChild(gameMessage)
    
    let modes = Array.from(allModes.children)
    modes.forEach(element => {
        element.style.display = 'none'
    });

    console.log(bombsPositions)
    container.addEventListener('click', startRound)

    function startRound(e){
        let clickedBox = e.target
        if (clickedBox.classList.contains('clicked')){
            gameMessage.textContent = `Round ${gameRound}.This box is already clicked!Please click box that is not black`
            return
        }
        
        
        let indexOfClickedBox = allBoxes.indexOf(clickedBox)

        if (bombsPositions.includes(indexOfClickedBox)){
            gameOver()
            return
        }
        clickedBox.classList.add('clicked')
        let clickedBoxes = allBoxes.filter((el)=>el.classList.contains('clicked'))
        if (clickedBoxes.length === (allBoxes.length)-bombs){
            winnableScenario()
            return
        }
        gameRound ++
        gameMessage.textContent = `Round ${gameRound}`
        

    }
    

    function putTheBombs(){
        let randomBox
        bombsPositions=[]
        for (let index = 0; index < bombs; index++) {
            do{
                randomBox = Math.floor(Math.random()*allBoxes.length)
            }
            while(bombsPositions.includes(randomBox))
            bombsPositions.push(randomBox)
        }
        
    }

    function gameOver(){
        gameMessage.textContent = `Bomb explode! Game Over! You die at round ${gameRound+1}`
        prepareForNewGame()
    }

    function winnableScenario(){
        gameMessage.textContent = `Congratilutaions! You didn't explode any bomb`
        prepareForNewGame()
    }

    function prepareForNewGame(){
        container.remove()
    }

    function chooseMode(){
        modes.forEach((element)=>{
            element.style.display = 'inline'
        })
    }
}


