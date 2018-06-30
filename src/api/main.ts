import * as express from 'express';
import { argv } from 'yargs';

const app = express();
const port = argv.port || 8081;
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.info(`Listening on port ${port}`);
    if (argv.publicDist) {
        app.use(express.static(argv.publicDist));
    }
});
