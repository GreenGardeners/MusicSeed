import React from "react";
import "../../styles/RightDiv.css";
import {SidePlayer, Login, Register, UploadAlbum} from '../';
import { Route, Switch } from 'react-router-dom';

class RightDiv extends React.Component {
  render() {
    return (
      <div className={'rightsidediv'}>
        <Switch>
          <Route exact path={'/'} component={SidePlayer}/>
          <Route path={'/login'} component={Login}/>
          <Route path={'/register'} component={Register}/>
          <Route path={'/uploadAlbum'} component={UploadAlbum}/>
        </Switch>
      </div>
    )
  }
}

export default RightDiv;