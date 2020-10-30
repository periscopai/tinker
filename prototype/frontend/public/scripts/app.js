console.log('App.js is running')

// JSX - Javascript XML provided by React for templating
// The JSX code below can not be rendered by the browse and therefore needs
// to be cross-compiled to JS ES5 using https://babeljs.io/
// Click on Try out and type the following
//var template = <p>This is JSX from app.js</p>;
// whch should render to
var template = /*#__PURE__*/React.createElement("p", {
    id: "someid"
  }, "Fakayou");
var app_root = document.getElementById('app')
// Redenring the template
ReactDOM.render(template, app_root);