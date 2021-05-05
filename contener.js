class Contener{
    afficheGrille(tab) {

        let contener = document.getElementById('contener')
        contener.innerHTML = ""
    
        for (let i in tab) {
            for (let j in tab[i]) {
    

                let monElem = document.createElement('div');
    
                if (tab[i][j] == 0) {
                    monElem.classList.add("mur")
                } else if (tab[i][j] == 1) {
                    monElem.classList.add("sol")
                } else if (tab[i][j] == 2) {
                    monElem.classList.add("bonbon")
                }
                monElem.style.gridRow = (+i + 1)
                monElem.style.gridColumn = (+j + 1)
    
                contener.appendChild(monElem)    
            }
        }
    }

    win(tab){
        let resteBonbon = false
        for (let i in tab) {
            for (let j in tab[i]) {
                if (tab[i][j] == 2){
                    resteBonbon = true
                }
            }
        }
        if(resteBonbon==false){
            stopTimer()
            setTimeout(winAlert, 10)
        }
    }
}