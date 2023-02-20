let log = new Log (document.querySelector('.log'))

let char = new Knight('Catarina'); 
let monster = new BigMonster();

const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    document.querySelector('.fighter1'),
    document.querySelector('.fighter2'),
    log,
    


    

);

stage.start();