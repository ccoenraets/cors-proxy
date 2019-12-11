import { Server } from './server-ts';

const bodyLimit: string = typeof (process.argv[2]) != 'undefined' ? process.argv[2] : '100kb';
console.log('Using limit: ',bodyLimit);
export const app = Server.bootstrap(bodyLimit).app;
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function (err) {
    if (!err)
    console.log('Proxy server listening on port ' + app.get('port'));
    else {
        console.error(err)
    }
})