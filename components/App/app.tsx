import * as React from 'react';
import Header from "../Header/header";

export interface IAppProps {
}

export default class App extends React.Component<IAppProps, any> {
  public render() {
    return (
      <div>
          <Header />
          Hello world!
          {this.props.children}
      </div>
    );
  }
}
