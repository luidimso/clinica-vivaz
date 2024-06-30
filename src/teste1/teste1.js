const fs = require("fs");
const path = require('path');
const printJS = require('print-js');

const dbPath = DEV ?
               path.resolve(__dirname, '..', '..', 'db', 'teste1', 'db-') :
               path.resolve(process.resourcesPath, '..', 'db', 'teste1', 'db-');


var id_count;

var currentId;
var selectedPlayer;
var selectedResult;


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
    currentId = env.id_count;
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


function saveResult() {
  var data = fs.readFileSync(dbPath+'players.json', 'utf8');
  var players = JSON.parse(data);

  var result = {
    pessoal: {
      valor_pessoal: document.getElementById("1").value,
      saude: document.getElementById("2").value,
      autocuidado: document.getElementById("3").value,
    },
    interpessoal: {
      amizade: document.getElementById("4").value,
      familia: document.getElementById("5").value,
      intimidade: document.getElementById("6").value,
    },
    ocupacional: {
      estudo: document.getElementById("7").value,
      trabalho: document.getElementById("8").value,
      conquistas: document.getElementById("9").value,
    },
    material: {
      independencia_financeira: document.getElementById("10").value,
      patrimonio: document.getElementById("11").value,
      qualidade_de_vida: document.getElementById("12").value,
    },
    recreativa: {
      lazer: document.getElementById("13").value,
      hobbies: document.getElementById("14").value,
      passatempo: document.getElementById("15").value,
    },
    existencial: {
      metas_de_vida: document.getElementById("16").value,
      espiritualidade: document.getElementById("17").value,
      ativismo_ideologico: document.getElementById("18").value,
    },
    sono: {
      dificuldade: document.getElementById("19").value,
      durmo_bem: document.getElementById("20").value,
      tenho_pesadelos: document.getElementById("21").value,
    },
    data: new Date().toLocaleDateString()
  }

  players.forEach(p => {
    if(p.id == currentId) {
      p.resultados.push(result);
    }
  });

  try {
    var data = fs.writeFileSync(dbPath+'players.json', JSON.stringify(players));
  } catch (err) {
    console.log(err);
  }

  $('#test').toggle();
  $('#saved').toggle();

  setTimeout(() => {
    window.location.href = '../../index.html';
  }, 5000)
}


function back() {
  $('#form').toggle();
  $('#results').toggle();
  $('#btn_voltar').toggle();
}

function backFromResult() {
  $('#form').toggle();
  $('#player_result').toggle();
}


function showResults() {
  $("#results").empty();
  $('#form').toggle();
  $('#results').toggle();
  $('#btn_voltar').toggle();

  var data = fs.readFileSync(dbPath+'players.json', 'utf8');
  var players = JSON.parse(data);

  players.forEach(p => {
    $('#results').append(`<p onclick='selectPlayer(${p.id})'>#${p.id} - ${p.nome}</p>`);
  });
}

function selectPlayer (id) {
  var data = fs.readFileSync(dbPath+'players.json', 'utf8');
  var players = JSON.parse(data);

  players.forEach(p => {
    if(p.id == id) {
      selectedPlayer = p;
    }
  });

  $("#results").empty();

  selectedPlayer.resultados.forEach((r, i) => {
    $('#results').append(`<p onclick='selectResult(${i})'>${r.data}</p>`);
  })
}

function selectResult(index) {
  var data = fs.readFileSync(dbPath+'players.json', 'utf8');
  var players = JSON.parse(data);

  players.forEach(p => {
    if(p.id == selectedPlayer.id) {
      selectedResult = selectedPlayer.resultados[index];
    }
  });

  $('#results').toggle();
  $('#btn_voltar').toggle();
  $('#player_result').toggle();

  $("#info").empty();
  $("#info").append(`<p>${selectedPlayer.nome}, ${selectedPlayer.idade} anos, sexo ${selectedPlayer.sexo}</p>`);
  $("#info").append(`<p>Nível de escolaridade: ${selectedPlayer.escolaridade}, ${selectedPlayer.estudo} anos de estudo</p>`);
  $("#info").append(`<p>Mão dominante: ${selectedPlayer.mao_dominante}</p>`);
  $("#info").append(`<p>Usa óculos de grau: ${selectedPlayer.usa_oculos}</p>`);
  $("#info").append(`<p>Tipo de dificuldade visual: ${selectedPlayer.dificuldade_visual}</p>`);
  $("#info").append(`<p>Grau em olho esquerdo: ${selectedPlayer.grau_oe}</p>`);
  $("#info").append(`<p>Grau em olho direito: ${selectedPlayer.grau_od}</p>`);
  $('#info').append(`<p>Realizado em <b>${selectedResult.data}</b></p>`)
}

function newTest() {
  currentId = selectedPlayer.id;
  $('#player_result').toggle();
  $('#test').toggle();
}