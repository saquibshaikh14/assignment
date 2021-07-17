/*
 * Created on Fri Jul 16 2021
 * Author: Saquib Shaikh
 * Github: https://github.com/saquibshaikh14
 * Email: mdsqb0786@gmail.com
 *
 */

import React from 'react';
import {NavLink} from 'react-router-dom';

function Sidebar(props){


  return(
    <div className="p-3 bg-dark text-white sidebar">
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/video" className="nav-link" activeClassName="active">
            Video
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/pdf" className="nav-link" activeClassName="active">
            PDF
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/ppt" className="nav-link" activeClassName="active">
            PPT
          </NavLink>
        </li>
      </ul>
    </div>
  )
}



export default Sidebar;