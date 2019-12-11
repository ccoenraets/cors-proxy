import { Server } from './server-ts';

const bodyLimit: string = typeof (process.argv[2]) != 'undefined' ? process.argv[2] : '100kb';
export const app = Server.bootstrap(bodyLimit).app;
app.listen(3000, function (err) {
    if (!err)
        console.log("cors proxy listening at 3000")
    else {
        console.error(err)
    }
})