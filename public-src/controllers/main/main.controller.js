class main {
  constructor($http) {
    this.name = 'main';
    console.log('hey');

    $http.get('/gif').then(res => {
      this.list = res.data
      console.log(res.data);
    })
  }

}

export default main;
