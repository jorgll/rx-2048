/*
* This file demonstrates a basic ReactXP app.
*/
import RX = require('reactxp');

import MainPanel = require('./MainPanel');

const styles = {
};

class App extends RX.Component<{}, null> {

    componentDidMount() {
    }

    render() {
        return (
            <MainPanel />
        );
    }

}

export = App;
