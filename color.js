let level = false;
let newTrueColor = 'cadetblue';
changeElemColors();

newCol.addEventListener('click', newColors);

newCol.addEventListener('mouseout', function () {
    newCol.style.color = newTrueColor;
    newCol.style.backgroundColor = 'white';
})
newCol.addEventListener('mouseover', function(){
    newCol.style.color = 'white';
    newCol.style.backgroundColor = newTrueColor;
})

window.addEventListener('keyup', newColors)

function toggleDifficulty() {
    easy.classList.toggle('active');
    easy.classList.toggle('inactive');
    hard.classList.toggle('active');
    hard.classList.toggle('inactive');
    level = !level;
    let row = document.querySelectorAll('.row2');
    for (let box of row) {
        box.classList.toggle("vanish")
    }
    changeElemColors();
    newColors();
};
easy.addEventListener('click', toggleDifficulty)
hard.addEventListener('click', toggleDifficulty)

function changeElemColors() {
    hero.style.backgroundColor = newTrueColor;
    let active = document.querySelector('.active')
    let inactive = document.querySelector('.inactive')
    active.style.color = 'white';
    active.style.backgroundColor = newTrueColor;
    inactive.style.color = newTrueColor;
    inactive.style.backgroundColor = 'white';
    newCol.style.color = newTrueColor;
}

let correctColor;
newColors();

function newColors() {
    tryer.textContent = 'Go Ahead!'
    let numBoxes;

    level ? numBoxes = 6 : numBoxes = 3
    
    let colnum = Math.floor(Math.random() * 16777216);
    let col = colnum.toString(16).toUpperCase();
    if(col.length < 6){
        let len = col.length
        for(let i = 0; i < 6 - len; i++){
            col = `${0}${col}`
            console.log('added');
        }
    }
    correctColor = `#${col}`;

    trueColor.textContent = correctColor;

    let index = Math.floor(Math.random() * 3)
    let boxes = document.getElementsByClassName('box');

    function setBoxes(){for (let i = 0; i < numBoxes; i++) {
        let box = boxes[i];

        if (i === index) {
            box.style.backgroundColor = correctColor;
            box.addEventListener("click", Correct)
        }
        else {
            let diffColor = Math.floor(Math.random() * 16777216).toString(16).toUpperCase();
            if (diffColor.length < 6) {
                let leng = diffColor.length
                for (let i = 0; i < 6 - leng; i++) {
                    diffColor = `${0}${diffColor}`
                    console.log('added, diffColor');
                }    
            }
            box.style.backgroundColor = `#${diffColor}`
            box.addEventListener('click', tryAgain)
        }
    }}
    setBoxes()

    function tryAgain() {
        tryer.textContent = 'Try Again';
        this.style.backgroundColor = '#000'
        this.removeEventListener('click', tryAgain)
    }

    function Correct() {
        tryer.textContent = 'Correct!'
        newTrueColor = correctColor;
        let opCol = (16777216 - colnum).toString(16).toUpperCase();
        title.style.color = `#${opCol}`;
        title2.style.color = `#${opCol}`;
        changeElemColors();
        colnum <= 8388608 ? trueColor.style.color = 'white' : trueColor.style.color = 'black';
        for (let i = 0; i < numBoxes; i++) {
            boxes[i].removeEventListener('click', tryAgain)
            boxes[i].style.backgroundColor = correctColor;
        }
        this.removeEventListener("click", Correct)
    }
}
