class Fantome {
    x
    y
    direction

    constructor(x,y,direction){
        this.x = x
        this.y = y
        this.direction = direction
    }

    moveFantome(tab){

        this.direction = fantomeDirection(0,9);
        if (this.direction == 5){this.direction=1}
        if (this.direction == 6){this.direction=2}
        if (this.direction == 7){this.direction=3}
        if (this.direction == 8){this.direction=4}
        if (this.direction == 9){this.direction=1}
        if (this.direction == 0){this.direction=2}
        //1=droite 2=bas 3=gauche 4=haut
    
        if (this.direction == 1){
            this.x ++
            if (this.x > (tab[0].length - 1)) {
                this.x = 0
            }
        }else if(this.direction == 2){
            this.y ++
            if (this.y > (tab.length - 1)) {
                this.y = 0
            }
        }else if(this.direction == 3){
            this.x --
            if (this.x < 0) {
                this.x = tab[0].length - 1
            }
        }else if(this.direction == 4){
            this.y --
            if (this.y < 0) {
                this.y = tab.length - 1
            }
        }
    }

    murFantome(collision){
        // console.log(monTableau[fantome1.y][fantome1.x])
        if(collision[this.y][this.x] == 0 && this.direction == 1){
            this.x--
        }else if(collision[this.y][this.x] == 0 && this.direction == 2){
            this.y--
        }else if(collision[this.y][this.x] == 0 && this.direction == 3){
            this.x++
        }else if(collision[this.y][this.x] == 0 && this.direction == 4){
            this.y++
        }
    }

    afficheFantome1() {
        //On attrape le contener avec le getElement
        let contener = document.getElementById('contener')
    
        let monElem = document.createElement('div');
        monElem.classList.add("fantome1")
    
        monElem.style.gridRow = (this.y +1)
        monElem.style.gridColumn = (this.x + 1)
    
    
        //on ajoute l'element div dans la page
        contener.appendChild(monElem)
    }



    mangePacman(){
        if(this.y == myPac.y && this.x == myPac.x){
            stopTimer()
            setTimeout(looseAlert, 10)
        }
    }
        
    looseAlert(){
        alert('Vous avez perdu')
    }
}
