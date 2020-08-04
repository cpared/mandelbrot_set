class Timer {

  constructor(){
    this.sec = 0;
    this.milsec = 0;
  }

  run(){
    this.myTime();
    this.myMilisec();
  }

  stop(){

    clearTimeout(this.sec);
    clearTimeout(this.milisec);

    console.log('S:' + this.sec + ' ' + 'M:' + this.milsec);

    this.sec = 0;
    this.milsec = 0;
  }

  myTime(){
    this.sec = setTimeout(this.myTime(), 1000);
    this.sec += 1;
  }

  myMilisec(){
    this.milsec = setTimeout(this.myMilisec(), 10);
    this.milsec += 1;
  }

}
