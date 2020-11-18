import React from 'react';

/**
 * Header stateless function 
 * This is a component which can be directly referenced in the JSX code as an HTML tag. 
 * By convention, the class must start with a capital letter. 
 */
const Header = (props) => (
      <div className="header">
        <h1 className='header__title'>{props.title}</h1>
        {props.sub_title && <h2 className='header__subtitle'>{props.sub_title}</h2>}
      </div>
      );
  
  Header.defaultProps = {
    title: "Fakayu"
  };
  
  export default Header;