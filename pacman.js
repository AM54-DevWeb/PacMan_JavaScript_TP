/******************************************/

/*          Déclaration de la grille      */

/******************************************/

/* 0 -> mur                               */

/* 1 -> sol                               */

/* 2 -> bonbon                            */

/******************************************/

let monTableauOrigine = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,2,0],
    [0,2,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,2,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,2,0,2,0,0,0,0,0,2,0,2,0,0,2,0],
    [0,2,2,2,2,0,2,2,2,0,2,2,2,0,2,2,2,2,0],
    [0,0,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,0,0],
    [0,1,1,0,2,0,2,2,2,2,2,2,2,0,2,0,1,1,0],
    [0,0,0,0,2,0,2,0,0,1,0,0,2,0,2,0,0,0,0],
    [2,2,2,2,2,2,2,0,1,1,1,0,2,2,2,2,2,2,2],/*CENTRE*/
    [0,0,0,0,2,0,2,0,0,1,0,0,2,0,2,0,0,0,0],
    [0,1,1,0,2,0,2,2,2,2,2,2,2,0,2,0,1,1,0],
    [0,0,0,0,2,0,2,0,0,0,0,0,2,0,2,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,2,0],
    [0,2,2,0,2,2,2,2,2,2,2,2,2,2,2,0,2,2,0],
    [0,0,2,0,2,0,2,0,0,0,0,0,2,0,2,0,2,0,0],
    [0,2,2,2,2,0,2,2,2,0,2,2,2,0,2,2,2,2,0],
    [0,2,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,2,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

let monTableau = []

for (let i in monTableauOrigine) {

    monTableau.push(monTableauOrigine[i].slice())

}

/////////////DECLARATION TIMERS////////////

let monTimer
let stopT = false

/////////////DECLARATION PACMAN, GRILLE ET FANTOMES////////////

let myPac = new Pacman(0,1,1) 

let fantome1 = new Fantome(8,10,1) 

let tabFantome = [
    {
    x:9,
    y:10,
    direction:1
    },
    
    {
    x:10,
    y:10,
    direction:1
    }

    
]

let numFan = 0
let score = 0
let grille = new Contener()


///////////////////////////////   FANTOME /////////////////////////////////////////

document.querySelector("#ajoutefantomes").onclick = function ajouteFantomes(){
    tabFantome.push({x:10, y:10, direction:1})
    demarreTimer()
}

// ::::::::::.....DEPLACEMENT ALEATOIRE FANTOME.....::::::::::

function fantomeDirection(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ::::::::::.....AFFICHAGE TABLEAU FANTOME.....::::::::::

function afficheFantomes(numFan) {
    //On attrape le contener avec le getElement
    let contener = document.getElementById('contener')

    let monElem = document.createElement('div');
    monElem.classList.add("fantomes"+(n%6))

    monElem.style.gridRow = (tabFantome[n].y +1)
    monElem.style.gridColumn = (tabFantome[n].x + 1)


    //on ajoute l'element div dans la page
    contener.appendChild(monElem)
}

// ::::::::::.....DEPLACEMENT TABLEAU FANTOME.....::::::::::

let n = 0

function moveFantomes(){

    tabFantome[n].direction = fantomeDirection(0,7);
    if (tabFantome[n].direction == 5){tabFantome[n].direction=2}
    if (tabFantome[n].direction == 0){tabFantome[n].direction=3}
    if (tabFantome[n].direction == 6){tabFantome[n].direction=1}
    if (tabFantome[n].direction == 7){tabFantome[n].direction=4}

    //1=droite 2=bas 3=gauche 4=haut

    if (tabFantome[n].direction == 1){
        tabFantome[n].x ++
        if (tabFantome[n].x > (monTableau[0].length - 1)) {
            tabFantome[n].x = 0
        }
    }else if(tabFantome[n].direction == 2){
        tabFantome[n].y ++
        if (tabFantome[n].y > (monTableau.length - 1)) {
            tabFantome[n].y = 0
        }
    }else if(tabFantome[n].direction == 3){
        tabFantome[n].x --
        if (tabFantome[n].x < 0) {
            tabFantome[n].x = monTableau[0].length - 1
        }
    }else if(tabFantome[n].direction == 4){
        tabFantome[n].y --
        if (tabFantome[n].y < 0) {
            tabFantome[n].y = monTableau.length - 1
        }
    }
}


// ::::::::::.....MUR TABLEAU FANTOME.....::::::::::

function murFantomes(){
    if(monTableau[tabFantome[n].y][tabFantome[n].x] == 0 && tabFantome[n].direction == 1){
        tabFantome[n].x--
    }else if(monTableau[tabFantome[n].y][tabFantome[n].x] == 0 && tabFantome[n].direction == 2){
        tabFantome[n].y--
    }else if(monTableau[tabFantome[n].y][tabFantome[n].x] == 0 && tabFantome[n].direction == 3){
        tabFantome[n].x++
    }else if(monTableau[tabFantome[n].y][tabFantome[n].x] == 0 && tabFantome[n].direction == 4){
        tabFantome[n].y++
    }
}


// ::::::::::.....FANTOME MANGE PACMAN TABLEAU.....::::::::::

function mangePacman2(){
    if(tabFantome[n].y == myPac.y && tabFantome[n].x == myPac.x){
        stopTimer()
        setTimeout(looseAlert, 10)
    }
}

function looseAlert(){
    alert('Vous avez perdu')
}

///////////////////////////////   TOUCHES DEPLACEMENT /////////////////////////////

function appuisTouche(e){
    // console.log(e.key)

    if(e.key=="z"){
        myPac.direction = 4
    }else if(e.key=="d"){
        myPac.direction = 1
    }else if(e.key=="q"){
        myPac.direction = 3
    }else if(e.key=="s"){
        myPac.direction = 2
    }
}


// ::::::::::.....WIN.....::::::::::

function winAlert(){
    alert('Vous avez gagné !')
}


///////////////////////////////   TOUR DE JEU /////////////////////////////////////////

function tourJeu(){

//INTERVAL DU TOUR DE JEU
    timer()

        //DEPLACEMENT - COLLISION - FANTOME MANGE PACMAN
    
    fantome1.moveFantome(monTableau)
    fantome1.mangePacman()
    fantome1.murFantome(monTableau)
    
    // for (n = 0; n < tabFantome.length; n++){
    //     moveFantomes(numFan)
    //     mangePacman2(numFan)
    //     murFantomes(numFan)
    // } 

    myPac.movePacman(monTableau)
    fantome1.mangePacman()
    myPac.murPacman(monTableau)

    // for (n = 0; n < tabFantome.length; n++){
    //     mangePacman2(numFan)
    // }

        //CHANGEMENT DES BONBONS EN SOL + SCORE

    let obj = myPac.bonbonPacman(score, monTableau)
    monTableau = obj.tableau
    score = obj.score

        // AFFICHAGE

    grille.afficheGrille(monTableau)
    
    myPac.affichePacMan(monTableau)
    fantome1.afficheFantome1(monTableau)

    // for (n = 0; n < tabFantome.length; n++){
    //     afficheFantomes(numFan) 
    // }    

    grille.win(monTableau)
}
///////////////////////////////   TOUR DE JEU /////////////////////////////////////////


//:::::::::::-----TIMER-----:::::::::::

let vitesse=500

function timer(){
    stopTimer()
    monTimer = setInterval(tourJeu, vitesse)
}

document.querySelector("#vitessePlus").onclick = function difficultePlus(){vitesse = vitesse - 100}
document.querySelector("#vitesseMoins").onclick = function difficulteMoins(){vitesse = vitesse + 100}

document.querySelector("#pause").onclick = stopTimer
document.querySelector("#play").onclick = timer


//STOPPER LE JEU
function stopTimer() {
    clearInterval(monTimer)
}

//:::::::::::-----TIMER-----:::::::::::



////////////////// RELANCER UNE PARTIE / REINITIALISATION PLATEAU DE JEU ////////////////

document.querySelector("#relancer").onclick = demarreTimer


function demarreTimer(){

    stopTimer()

///////// REINITIALISER LE TABLEAU //////////

    monTableau = []

    for (let i in monTableauOrigine) {

        monTableau.push(monTableauOrigine[i].slice())

    }

///////// REINITIALISER LES POSITIONS DES FANTOMES ET DU PACMAN //////////
    myPac = new Pacman(0,1,1)

    //Reinitialiser avec les fantomes ajoutés

    for(let num in tabFantome){
        tabFantome[num].y=10
        tabFantome[num].x=10
    }

    fantome1 = new Fantome(8,10,1) 

        score = 0

///////// RELANCER LE JEU //////////

    monTimer = setInterval(tourJeu, 500)
}



//:::::::::::-----LANCER LE PREMIER TOUR-----:::::::::::
tourJeu()
//:::::::::::-----LANCER LE PREMIER TOUR-----:::::::::::