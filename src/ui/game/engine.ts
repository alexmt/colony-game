import 'pixi-projection';
import * as pixi from 'pixi.js';

export class Engine {
    public start(app: pixi.Application) {
        const loader = new pixi.loaders.Loader();
        loader
            .add('bunny', 'https://pixijs.io/examples/required/assets/basics/bunny.png')
            .add('surface', 'https://pixijs.io/examples/required/assets/bkg.jpg')
            .load(() => {

                const surface = new pixi.projection.Sprite2d(loader.resources.surface.texture);
                surface.anchor.set(0.5, 1.0);
                surface.width = app.screen.width;
                surface.height = app.screen.height;

                const character = new pixi.projection.Sprite2d(loader.resources.bunny.texture);

                character.anchor.set(0.5, 1.0);
                character.y = -app.screen.height / 2;
                character.proj.affine = pixi.projection.AFFINE.AXIS_X;
                character.scale.x = 2;
                character.scale.y = 2;
                character.scale.z = 2;

                const level = new pixi.projection.Container2d();
                level.position.set(app.screen.width / 2, app.screen.height);
                level.proj.setAxisY(new pixi.projection.Point3d(0, 550), -1);

                level.addChild(surface, character);

                app.stage.addChild(level);
            });
    }
}
