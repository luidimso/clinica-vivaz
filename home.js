const zip = require('zip-a-folder');
const path = require('path');
const { remote } = require('electron');
const app = remote.app;

const backupPath = DEV ?
                path.resolve(__dirname) :
                path.resolve(process.resourcesPath, '..');


$(document).ready(function () {
    setTimeout(function() {
        $("#cover").toggle();
    }, 3000)
});

async function downloadDB() {
    console.log("First")
    var date = new Date();
    var zipFileName = date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate()+" "+date.getHours()+"_"+date.getMinutes();
    await zip.zip(backupPath+'/db', backupPath+'/db-backup/'+zipFileName+".zip");

    console.log("Second")

    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = backupPath+'/db-backup/'+zipFileName+".zip";
    a.download = zipFileName+".zip";
    a.click();
    document.body.removeChild(a);
}