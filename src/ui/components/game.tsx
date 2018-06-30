import * as pixi from 'pixi.js';
import * as React from 'react';

import { Engine } from '../game';

export interface GameApi {
    restart(): void;
}

interface Props { getApi?: (api: GameApi) => any; width?: number; height?: number; }

export class Game extends React.Component<Props> {

    private gameApp: pixi.Application;

    constructor(props: Props) {
        super(props);
        if (props.getApi) {
            props.getApi({
                restart: () => this.forceUpdate(),
            });
        }
    }

    public render() {
        const width = this.props.width || 800;
        const height = this.props.width || 600;
        return (
            <div style={{ width, height, display: 'inline-block' }} ref={(container) => {
                if (this.gameApp) {
                    this.gameApp.destroy(true);
                    this.gameApp = null;
                }
                if (container) {
                    this.gameApp = new pixi.Application({ width, height });
                    new Engine().start(this.gameApp);
                    container.appendChild(this.gameApp.view);
                }
            }}/>);
    }
}
