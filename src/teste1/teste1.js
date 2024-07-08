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

var colorGradient = [{
  value: 1,
  color: '#FF0000'
},
{
    value: 2,
    color: '#FF0000'
},
{
    value: 3,
    color: '#FF0000'
},
{
    value: 4,
    color: '#FF0000'
},
{
    value: 5,
    color: '#FF0000'
},
{
    value: 6,
    color: '#FF0000'
},
{
    value: 7,
    color: '#0000FF'
},
{
    value: 8,
    color: '#0000FF'
},
{
    value: 9,
    color: '#0000FF'
},
{
    value: 10,
    color: '#0000FF'
},
{
  value: 11,
  color: '#0000FF'
}];


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
    currentId = env.id_count; 
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
  $('#info').append(`<p>Realizado em <b>${selectedResult.data}</b></p>`);

  $('#pessoal').empty();
  $('#interpessoal').empty();
  $('#ocupacional').empty();
  $('#material').empty();
  $('#recreativa').empty();
  $('#existencial').empty();
  $('#sono').empty();

  makeGraphs();
}

function newTest() {
  currentId = selectedPlayer.id;
  $('#player_result').toggle();
  $('#test').toggle();
}

function makeGraphs() {
  Highcharts.chart('pessoal', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Pessoal',
        align: 'left'
    },
    xAxis: {
      type: 'category'
    },
    tooltip: {
      pointFormat: '<b>{point.y}</b>'
    },
    series: [{
      name: '',
      data: [
          ['Valor pessoal', Number(selectedResult.pessoal.valor_pessoal)],
          ['Saúde', Number(selectedResult.pessoal.saude)],
          ['Autocuidado', Number(selectedResult.pessoal.autocuidado)]
      ],
      dataLabels: {
          enabled: true
      },
      color: 'red',
      zonesAxis: 'y',
      zones: colorGradient
  }]
});

Highcharts.chart('interpessoal', {
  chart: {
      type: 'column'
  },
  title: {
      text: 'Interpessoal',
      align: 'left'
  },
  xAxis: {
    type: 'category'
  },
  tooltip: {
    pointFormat: '<b>{point.y}</b>'
  },
  series: [{
    name: '',
    data: [
        ['Amizade', Number(selectedResult.interpessoal.amizade)],
        ['Família', Number(selectedResult.interpessoal.familia)],
        ['Intimidade', Number(selectedResult.interpessoal.intimidade)]
    ],
    dataLabels: {
        enabled: true
    },
    color: 'red',
    zonesAxis: 'y',
    zones: colorGradient
}]
});

Highcharts.chart('ocupacional', {
  chart: {
      type: 'column'
  },
  title: {
      text: 'Ocupacional',
      align: 'left'
  },
  xAxis: {
    type: 'category'
  },
  tooltip: {
    pointFormat: '<b>{point.y}</b>'
  },
  series: [{
    name: '',
    data: [
        ['Estudo', Number(selectedResult.ocupacional.estudo)],
        ['Trabalho', Number(selectedResult.ocupacional.trabalho)],
        ['Conquistas', Number(selectedResult.ocupacional.conquistas)]
    ],
    dataLabels: {
        enabled: true
    },
    color: 'red',
    zonesAxis: 'y',
    zones: colorGradient
}]
});

Highcharts.chart('material', {
  chart: {
      type: 'column'
  },
  title: {
      text: 'Material',
      align: 'left'
  },
  xAxis: {
    type: 'category'
  },
  tooltip: {
    pointFormat: '<b>{point.y}</b>'
  },
  series: [{
    name: '',
    data: [
        ['Indepedência Financeira', Number(selectedResult.material.independencia_financeira)],
        ['Patrimônio', Number(selectedResult.material.patrimonio)],
        ['Qualidade de vida', Number(selectedResult.material.qualidade_de_vida)]
    ],
    dataLabels: {
        enabled: true
    },
    color: 'red',
    zonesAxis: 'y',
    zones: colorGradient
}]
});

Highcharts.chart('recreativa', {
  chart: {
      type: 'column'
  },
  title: {
      text: 'Recreativa',
      align: 'left'
  },
  xAxis: {
    type: 'category'
  },
  tooltip: {
    pointFormat: '<b>{point.y}</b>'
  },
  series: [{
    name: '',
    data: [
        ['Lazer', Number(selectedResult.recreativa.lazer)],
        ['Hobbies', Number(selectedResult.recreativa.hobbies)],
        ['Passatempo', Number(selectedResult.recreativa.passatempo)]
    ],
    dataLabels: {
        enabled: true
    },
    color: 'red',
    zonesAxis: 'y',
    zones: colorGradient
}]
});

Highcharts.chart('existencial', {
  chart: {
      type: 'column'
  },
  title: {
      text: 'Existencial',
      align: 'left'
  },
  xAxis: {
    type: 'category'
  },
  tooltip: {
    pointFormat: '<b>{point.y}</b>'
  },
  series: [{
    name: '',
    data: [
        ['Metas de vida', Number(selectedResult.existencial.metas_de_vida)],
        ['Espiritualidade', Number(selectedResult.existencial.espiritualidade)],
        ['Ativismo idelógico', Number(selectedResult.existencial.ativismo_ideologico)]
    ],
    dataLabels: {
        enabled: true
    },
    color: 'red',
    zonesAxis: 'y',
    zones: colorGradient
}]
});

Highcharts.chart('sono', {
  chart: {
      type: 'column'
  },
  title: {
      text: 'Sono',
      align: 'left'
  },
  xAxis: {
    type: 'category'
  },
  tooltip: {
    pointFormat: '<b>{point.y}</b>'
  },
  series: [{
    name: '',
    data: [
        ['Dificuldade', Number(selectedResult.sono.dificuldade)],
        ['Durmo bem', Number(selectedResult.sono.durmo_bem)],
        ['Tenho pesadelos', Number(selectedResult.sono.tenho_pesadelos)]
    ],
    dataLabels: {
        enabled: true
    },
    color: 'red',
    zonesAxis: 'y',
    zones: colorGradient
}]
});

  Highcharts.chart('geral', {
    chart: {
        type: 'column'
    },
    title: {
        text: '',
        align: 'left'
    },
    xAxis: {
      categories: ['Pessoal', 'Interpessoal', 'Ocupacional', 'Material', 'Recreativa', 'Existencial', 'Sono'],
      crosshair: true,
      accessibility: {
        description: ''
      }  
    },
    tooltip: {
      pointFormat: '<b>{point.y}</b>'
    },
    series: [{
      name: '',
      data: [
        ['Valor pessoal', Number(selectedResult.pessoal.valor_pessoal)],
        ['Amizade', Number(selectedResult.interpessoal.amizade)],
        ['Estudo', Number(selectedResult.ocupacional.estudo)],
        ['Indepedência Financeira', Number(selectedResult.material.independencia_financeira)],
        ['Lazer', Number(selectedResult.recreativa.lazer)],
        ['Metas de vida', Number(selectedResult.existencial.metas_de_vida)],
        ['Dificuldade', Number(selectedResult.sono.dificuldade)]        
      ],
      dataLabels: {
          enabled: true
      },
      color: 'red',
      zonesAxis: 'y',
      zones: colorGradient
    },{
      name: '',
      data: [
        ['Saúde', Number(selectedResult.pessoal.saude)],
        ['Família', Number(selectedResult.interpessoal.familia)],
        ['Trabalho', Number(selectedResult.ocupacional.trabalho)],
        ['Patrimônio', Number(selectedResult.material.patrimonio)],
        ['Hobbies', Number(selectedResult.recreativa.hobbies)],
        ['Espiritualidade', Number(selectedResult.existencial.espiritualidade)],
        ['Durmo bem', Number(selectedResult.sono.durmo_bem)], 
      ],
      dataLabels: {
          enabled: true
      },
      color: 'red',
      zonesAxis: 'y',
      zones: colorGradient
    },{
      name: '',
      data: [
        ['Autocuidado', Number(selectedResult.pessoal.autocuidado)],
        ['Intimidade', Number(selectedResult.interpessoal.intimidade)],
        ['Conquistas', Number(selectedResult.ocupacional.conquistas)],
        ['Qualidade de vida', Number(selectedResult.material.qualidade_de_vida)],
        ['Passatempo', Number(selectedResult.recreativa.passatempo)],
        ['Ativismo idelógico', Number(selectedResult.existencial.ativismo_ideologico)],
        ['Tenho pesadelos', Number(selectedResult.sono.tenho_pesadelos)]
      ],
      dataLabels: {
          enabled: true
      },
      color: 'red',
      zonesAxis: 'y',
      zones: colorGradient
    }]
});

}

function print() {
  printJS({
    printable: "player_result",
    type: "html"
  });
}