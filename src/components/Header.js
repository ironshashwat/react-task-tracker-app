import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import {useLocation} from "react-router-dom";

// const Header = (props) => {
  const Header = ({title,onAdd,showAdd}) => {
  // const onClick = () => {
  //   console.log("Click");        
  // }
const location = useLocation()
  return <header className='header'>
      {/* <h1>{props.title}</h1>  */}
      <h1>{title}</h1>
      {location.pathname === '/' && <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close':'Add'} onClick={onAdd}/>}
      {/* <Button color='green' text='Add' onClick={onClick}/> */}
      
  </header>;
};

Header.defaultProps = {
    title:"Task Tracker",
}

Header.propTypes = {
  title:PropTypes.string.isRequired,
}

export default Header;
