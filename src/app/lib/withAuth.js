import React from 'react';
import { loadFirebase } from '../lib/firebase';

const withAuth = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.user = undefined;
      this.state = {
        status: 'LOADING',
      }
    }

    async componentDidMount() {
      let firebase = await loadFirebase();
      firebase.auth().onAuthStateChanged(authUser => {
        //console.log(authUser);
        this.user = authUser;
        if(authUser) {
          this.setState({
            status: 'SIGNED_IN'
          });
        } else {
          // router.push('/');
          this.setState({
            status: 'SIGNED_OUT'
          });
        }
      });
    }

    renderContent() {
      const { status } = this.state;
      return <Component user={this.user} { ...this.props } />
    }

    render() {
      return (
        <React.Fragment>
          {this.renderContent()}
        </React.Fragment>
      );
    }
  };
}

export default withAuth;
