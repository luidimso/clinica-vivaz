const fs = require("fs");
const path = require('path');
const printJS = require('print-js');

const dbPath = DEV ?
               path.resolve(__dirname, '..', '..', 'db', 'teste1', 'db-') :
               path.resolve(process.resourcesPath, '..', 'db', 'teste1', 'db-');


var id_count;


$(document).ready(function(){

  try {
    var data = fs.readFileSync(dbPath+'players.json', 'utf8');
  } catch(err) {
    fs.writeFileSync(dbPath+'players.json', '[]');
  }

  try {
    var data = fs.readFileSync(dbPath+'env.json', 'utf8');
    var env = JSON.parse(data);
    id_count = env.id_count;
  } catch(err) {
    var env = {
      id_count: 1
    }
    fs.writeFileSync(dbPath+'env.json', JSON.stringify(env));
    id_count = env.id_count;
  }
});




function savePlayer() {
  var player = {
    id: id_count,
    nome: $('#input-nome').val(),
    idade: $('#input-idade').val(),
    sexo: $('#input-sexo').val(),
    escolaridade: $('#input-escolaridade').val(),
    estudo: $('#input-estudo').val(),
    mao_dominante: $('#input-mao').val(),
    usa_oculos: $('#input-oculos').val(),
    dificuldade_visual: $('#input-dificuldade').val(),
    grau_od: $('#input-od').val(),
    grau_oe: $('#input-oe').val(),
    resultados: []
  }

  try {
    var data = fs.readFileSync(dbPath+'players.json', 'utf8');
    var players = JSON.parse(data);
    players.push(player);

    try {
      var data2 = fs.writeFileSync(dbPath+'players.json', JSON.stringify(players));
      playerId = player.id;
      id_count++;

      try {
        var data3 = fs.writeFileSync(dbPath+'env.json', JSON.stringify({id_count: id_count}));
        $('#form').toggle();
        $('#test').toggle();
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }

  return false;
}
