
function tag(){
  return {
    restrict: 'A',
    scope: {
      tag: '='
    },
    replace: true,
    link: (scope, element, attr) => {
      console.log(scope.tag)
    },
    template: '<p>some tags</p>'
    }
  }
}

export default tag;
