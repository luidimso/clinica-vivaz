const { remote } = require('electron');
const app = remote.app;

app.relaunch();
app.exit();