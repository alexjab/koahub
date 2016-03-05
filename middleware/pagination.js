'use strict';

const uri = require('urijs');

module.exports = function* pagination(next) {
  yield next;

  if (this.pagination) {
    const _pagination = this.pagination;

    const firstPage = uri(this.url).setQuery({ page: 1 });
    this.set('Link', `<${firstPage}>; rel="first"`);

    if (_pagination.page && _pagination.page > 1) {
      const previousPage = uri(this.url).setQuery({ page: _pagination.page - 1 });
      this.append('Link', `<${previousPage}>; rel="previous"`);
    }

    if (_pagination.total && _pagination.page && _pagination.perPage && _pagination.page * _pagination.perPage < _pagination.total) {
      const nextPage = uri(this.url).setQuery({ page: _pagination.page + 1 });
      this.append('Link', `<${nextPage}>; rel="next"`);
    }

    if (_pagination.total && _pagination.perPage) {
      const lastPage = uri(this.url).setQuery({ page: Math.ceil(_pagination.total / _pagination.perPage) });
      this.append('Link', `<${lastPage}>; rel="last"`);
    }
  }
};
