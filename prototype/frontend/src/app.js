console.log('App.js is running')

// JSX - Javascript XML provided by React for templating
// The JSX code below can not be rendered by the browse and therefore needs
// to be cross-compiled to JS ES5 using https://babeljs.io/
// Click on Try out and type the following
//var template = <p>This is JSX from app.js</p>;
// whch should render to
// var template = /*#__PURE__*/React.createElement("p", {
//     id: "someid"
//   }, "Fakayou");
//
// A Tempate must have a single root.

// Only render sub stitle exists
// if options.len() > Here are your options

const application = {
  title: "Periscopai",
  sub_title: "Machine Learning User Interface Test System",
  options: ["One", "Two"],
};


const template = (
<div>
  <h1>{application.title}</h1>
  {application.sub_title && <p>application.sub_title</p>}
  <p>{application.options.length > 0 ? "You have options" : null}</p>
  <ol>
    <li>one</li>
    <li>two</li>
  </ol>
</div>
);



const app_root = document.getElementById('app')
// Redenring the template
ReactDOM.render(template, app_root);