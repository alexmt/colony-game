import * as React from 'react';
import { Game, GameApi } from './components';

require('./app.scss');

export class App extends React.Component {

    private gameApi: GameApi;

    public render() {
        return (
            <div className='app'>
                <div>
                    <div>
                        <button onClick={() => this.gameApi.restart()}>Restart</button>
                    </div>
                    <div className='app__container'>
                        <Game getApi={(api) => this.gameApi = api} />
                    </div>
                </div>
            </div>
        );
    }
}
