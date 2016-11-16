
function tag($parse){
  return {
    restrict: 'A',
    transclude: true,
    replace: true,
    link: (scope, element, attrs) => {
      let model = $parse('gifs.tags')(scope)
      if(model.length == 0) {return}
      else {
        scope.tagString = '#'
        scope.tagString += model.join(' #')
      }
    },
    template: '<p>{{tagString}}</p>'
  }
}

export default tag;
