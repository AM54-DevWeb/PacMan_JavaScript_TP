class Pacman {
    x
    y
    direction

    constructor(x,y,direction){
        this.x = x
        this.y = y
        this.direction = direction
    }



    affichePacMan() {
        //On attrape le contener avec le getElement
        let contener = document.getElementById('contener')
    
        let monElem = document.createElement('div');
        monElem.classList.add("pacman")
    
        monElem.style.gridRow = (this.y +1)
        monElem.style.gridColumn = (this.x + 1)
    
    
        //on ajoute l'element div dans la page
        contener.appendChild(monElem)
    }

    movePacman(tab) {

        //1=droite 2=bas 3=gauche 4=haut
        
            if (this.direction == 1) {
                this.x++
                if (this.x > (tab[0].length - 1)) {
                    this.x = 0
                }
            }
        
            else if (this.direction == 2) {
                this.y++
                if (this.y > (tab.length - 1)) {
                    this.y = 0
                }
            }
        
            else if (this.direction == 3) {
                this.x--
                if (this.x < 0) {
                    this.x = tab[0].length - 1
                }
            }
        
            else if (this.direction == 4) {
                this.y--
                if (this.y < 0) {
                    this.y = tab.length - 1
                }
            }
        }

        murPacman(collision){
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

        bonbonPacman(s, tab){
            if(tab[this.y][this.x] == 2){
                tab[this.y][this.x] = 1;
        
                s += 10;
                document.getElementById('score').innerHTML = "Score : " + s
            }
            return {tableau: tab, score: s}
        }
}
