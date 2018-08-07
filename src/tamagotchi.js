export class Tamagotchi {

  constructor(name) {
    this.name = name;
    this.hunger = 200;
    this.happiness = 200;
    this.energy = 200;
    this.alive = true;
    this.decayRate = 10;
  }

  decay(status) {
    status -= this.decayRate;
    return status;
  }

  timeElapse() {

    let time = setInterval(() => {
      if (this.alive) {
        this.hunger = this.decay(this.hunger);
        this.happiness = this.decay(this.happiness);
        this.energy = this.decay(this.energy);

        if (this.hunger <= 0 || this.happiness <= 0 || this.energy <= 0) {
          this.alive = false;

          this.hunger = this.happiness = this.energy = 0;
        }
      }
      else {
        clearInterval(time);
      }
    }, 500);

  }

  feed() {
    if(this.alive) {
      this.hunger += 50;
      this.happiness += 25;
      this.energy += 25;
      this.decayRate = 10;
    }
  }

  play() {
    if(this.alive) {
      this.hunger -= 25;
      this.happiness += 50;
      this.energy -= 25;
      this.decayRate = 10;
    }
  }

  rest() {
    if(this.alive) {
      this.hunger -= 25;
      this.happiness += 25;
      this.energy += 50;
      this.decayRate = 5;
    }
  }

  res() {
    this.hunger = 200;
    this.happiness = 200;
    this.energy = 200;
    this.alive = true;
    this.timeElapse();
  }

}
