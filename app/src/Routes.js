import React from 'react';
import { Route, Router } from 'react-router';
import { Header } from './components/Header';
import { pages } from './constants/url';
import CreateUser from './components/CreateUser'
import FindUser from './components/FindUser'

class Routes extends React.Component {

    render() {
        return (
            <div className="App">
                <Header></Header>
                <div className="container mrgnbtm">
                    <div className="row">
                        <div className="col-lg-8">
                            <Router {...this.props}>
                                <Route exact path={pages.home} component={CreateUser} />
                                <Route path={pages.userDetails} component={FindUser} />
                            </Router>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Routes;