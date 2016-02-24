module.exports = {
  getAll,
  getOne
};

function* getAll() {
  this.body = [{
    id: 1,
    foo: 'bar'
  }];
};

function* getOne() {
  this.body = {
    id: 1,
    foo: 'bar'
  };
};
