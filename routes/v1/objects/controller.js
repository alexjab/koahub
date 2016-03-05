function* getAll(next) {
  this.body = [{
    id: 1,
    foo: 'bar',
  }];
}

function* getOne() {
  this.body = {
    id: 1,
    foo: 'bar',
  };
}

module.exports = {
  getAll,
  getOne,
};
