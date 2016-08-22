class User {
  constructor (obj) {
    Object.keys(obj).forEach(prop => {
      this[prop] = obj[prop];
    }, this);
  }

  travel (dir) {
    let output;
    if (this.location[dir]) {
      this.location = this.location[dir];
    } else {
      return 'You cannot go that way.';
    }

    if (this.location.enemy || this.location.visited === 0) {
      output = this.location.initial;
      this.location.visited++;
    } else if (!this.location.enemy && !this.location.noEnemy) {
      this.location.visited > 0 ? (
        output = this.location.beenHere,
        this.location.visited++
      ) : (
        output = this.location.initial,
        this.location.visited++
      );
    } else {
      output = this.location.noEnemy;
      this.location.visited++;
    }
    return output;
  }

}

export {User};
