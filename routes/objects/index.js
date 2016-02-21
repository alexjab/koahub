module.exports = {
  all,
  one
};

function* all() {
  this.body = [{
    foo: 'bar'
  }];
};

function* one() {
};
