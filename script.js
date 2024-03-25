const startBtn = document.getElementsByTagName('button')[0]
const container = document.getElementsByClassName('container')[0]
const cells = Array.from(document.getElementsByClassName('cell'))
const body = document.getElementsByTagName('body')[0]


let gameRoundParagraph = document.createElement('p')

startBtn.addEventListener('click', startGame)

function startGame(){
    let round = 0

    let timeout, chronometer, seconds;

    let reactionTime = 3000
    startBtn.disabled = true
    body.appendChild(gameRoundParagraph)   

    function nextRound(){
        reactionTime = reactionTime - 200
        if (reactionTime < 500){
            reactionTime = 500
        }

        let remaingTime = reactionTime

        chronometer = setInterval(()=>{
            remaingTime  -=10 
            if(remaingTime<=0){
                clearInterval(chronometer)
            }
            seconds = remaingTime/1000
            gameRoundParagraph.textContent = `Round ${round} - Seconds: ${seconds.toFixed(1)}`
        },10)

        timeout = setTimeout(gameOver, reactionTime)
        round++
        let currentCell = getRandomCell()
        currentCell.classList.add('target-cell')
        container.addEventListener('click',cellIsclicked)
    }

    function getRandomCell(){ 
        let cell
        do{
            let randomIndex = Math.floor(Math.random() * cells.length)
            cell = cells[randomIndex]
        }
        while(cell.classList.contains('target-cell'))
        return cell
    }

    function cellIsclicked(e){
        let target= e.target
        
        if (target.classList.contains('target-cell')){
            clearTimeout(timeout)
            clearInterval(chronometer)
            nextRound()
            target.classList.remove('target-cell')
        }  
    }   

    function gameOver(){
        gameRoundParagraph.textContent = `Game Over! Round ${round}`
        startBtn.disabled = false
        container.removeEventListener('click', cellIsclicked)
        cells.forEach((element)=>{
            element.classList.remove('target-cell')
        })
    }

    nextRound()
}
