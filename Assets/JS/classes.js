class Character{    
    _life =1;
    maxLife = 1;
    attack = 0;
    defence = 0;
        constructor(name){
            this.name = name
        }
    get life(){
        return this._life;
    }
    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife;
    }
};

class Knight extends Character{
    constructor(name){
        super(name);
        this.life= 100;
        this.attack = 10;
        this.defence = 8;
        this.maxLife = this.life
    }
};

class Sorcerer extends Character{
    constructor(name){
        super(name);
        this.life= 80 ;
        this.attack= 15 ;
        this.defence= 3;
        this.maxLife =  this.life
    }
};

class LittleMonster extends Character{
    constructor(){
        super('Little Monster');
        this.life= 40;
        this.attack= 4;
        this.defence= 4;
        this.maxLife=this.life ; 
    }
}

class BigMonster extends Character{
    constructor(){
        super('Big Monster');
        this.life= 120;
        this.attack= 16;
        this.defence= 6;
        this.maxLife=this.life ; 
    }
}

class Stage{
    constructor(fighter1, fighter2,  fighter1El, fighter2El, fighter1Pos, fighter2Pos, logObject){
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    start(){
        this.update();

        this.fighter1El.querySelector('.attackButton').addEventListener('click',()=> this.doAttack(this.fighter1, this.fighter2,'1' ))
        this.fighter2El.querySelector('.attackButton').addEventListener('click',()=> this.doAttack(this.fighter2, this.fighter1,'2' ))
    }   

    update(){
        //Fighter 1
       
       this.fighter1El.querySelector('.name'). innerHTML=`${this.fighter1.name} -  HP:${this.fighter1.life.toFixed(0)} `;
       let f1Pct = (this.fighter1.life / this.fighter1.maxLife)*100
       this.fighter1El.querySelector('.bar').style.width =`${f1Pct}%`
       {f1Pct < 30 &&
            this.fighter1El.querySelector('.bar').classList.add('perigo')}

        //Fighter 2        
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} -  HP:${this.fighter2.life.toFixed(0)} `
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife)*100
        this.fighter2El.querySelector('.bar').style.width =`${f2Pct}%`
        {f2Pct < 30 &&
            this.fighter2El.querySelector('.bar').classList.add('perigo')}
    }
    doAttack(attacking, attacked, attack){
        if(attacking.life <=0 || attacked.life <=0){
            this.log.addMessage('Já ta morto, não adianta mais');
            return;
        }

        let attackFactor = (Math.random()*2).toFixed(2);
        
        let actualAttack = attacking.attack * attackFactor;
        

        let defenseFactor = (Math.random()*2).toFixed(2);
        
        let actualDefense = attacked.defence* defenseFactor;
        

        if (actualAttack > actualDefense){
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack} de danos em ${attacked.name}`)
        }else{
            this.log.addMessage(`${attacked.name} conseguiu defender`)
            if(attack === '1'){
                
                document.querySelector('.fighter2').classList.add('right');
                setTimeout(clearClass,500)
    
            }else{
                
                document.querySelector('.fighter1').classList.add('left');
                setTimeout(clearClass,500)
    
            }
        }
        
       
        if(attack === '1'){
            console.log( attack+' atacou')
            document.querySelector('.fighter1').classList.add('right');
            document.querySelector('.fighter2').classList.add('attacked');
            setTimeout(clearClass,500)

        }else{
            
            
            document.querySelector('.fighter2').classList.add('left');
            document.querySelector('.fighter1').classList.add('attacked');
            setTimeout(clearClass,500)

        }

        function clearClass(){
            console.log('clear')
            document.querySelector('.fighter1').classList.remove('right','left','attacked')
            document.querySelector('.fighter2').classList.remove('right','left','attacked')
        }

        this.update();
    }
    
}

class Log{
    list=[];

    constructor(liestEl){
        this.liestEl = liestEl;
    }

    addMessage(msg){
        this.list.push(msg);
        this.render();

    }
    render(){
        this.liestEl.innerHTML ='';
        for(let i in this.list){
            this.liestEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
        
        const logEl = document.querySelector(".log");
        logEl.scrollTop = logEl.scrollHeight;
    }
}