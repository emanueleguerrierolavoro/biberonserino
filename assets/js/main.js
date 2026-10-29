/* ============================================================
   Biberon – script del sito
   1. Menu a tendina su smartphone
   2. Stato "Aperto ora / Chiuso" calcolato sull'ora italiana,
      con domeniche e festività nazionali
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. Menu smartphone ---------- */
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (btn && menu) {
    var chiudi = function () {
      menu.classList.remove('aperto');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Apri il menu');
    };
    btn.addEventListener('click', function () {
      var aperto = menu.classList.toggle('aperto');
      btn.setAttribute('aria-expanded', aperto ? 'true' : 'false');
      btn.setAttribute('aria-label', aperto ? 'Chiudi il menu' : 'Apri il menu');
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) chiudi(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') chiudi(); });
  }

  /* ---------- 2. Orari ----------
     Fasce orarie in minuti dalla mezzanotte: 9:00–13:00 e 16:00–20:00.
     Per cambiare gli orari modifica FASCE; per aggiungere un giorno di
     chiusura (es. il patrono) aggiungi "giorno-mese" a FESTIVI. */
  var FASCE = [[9 * 60, 13 * 60], [16 * 60, 20 * 60]];
  var FESTIVI = ['1-1', '6-1', '25-4', '1-5', '2-6', '15-8', '1-11', '8-12', '25-12', '26-12'];
  var GIORNI = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];

  function oraItaliana() {
    try {
      return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' }));
    } catch (e) {
      return new Date();
    }
  }

  function pasqua(anno) { // algoritmo di Meeus/Jones/Butcher
    var a = anno % 19, b = Math.floor(anno / 100), c = anno % 100;
    var d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var mese = Math.floor((h + l - 7 * m + 114) / 31);
    var giorno = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(anno, mese - 1, giorno);
  }

  function festivo(data) {
    if (FESTIVI.indexOf(data.getDate() + '-' + (data.getMonth() + 1)) >= 0) return true;
    var pasquetta = pasqua(data.getFullYear());
    pasquetta.setDate(pasquetta.getDate() + 1);
    return data.getDate() === pasquetta.getDate() && data.getMonth() === pasquetta.getMonth();
  }

  function giornoApertura(data) { return data.getDay() !== 0 && !festivo(data); }

  function hhmm(min) { return Math.floor(min / 60) + ':' + ('0' + (min % 60)).slice(-2); }

  function calcolaStato() {
    var ora = oraItaliana();
    var min = ora.getHours() * 60 + ora.getMinutes();
    var oggiAperto = giornoApertura(ora);
    var i;

    if (oggiAperto) {
      for (i = 0; i < FASCE.length; i++) {
        if (min >= FASCE[i][0] && min < FASCE[i][1]) {
          return { aperto: true, testo: 'Aperto ora · chiude alle ' + hhmm(FASCE[i][1]) };
        }
      }
      for (i = 0; i < FASCE.length; i++) {
        if (min < FASCE[i][0]) {
          return { aperto: false, testo: 'Chiuso ora · ' + (i === 0 ? 'apre' : 'riapre') + ' alle ' + hhmm(FASCE[i][0]) };
        }
      }
    }
    var n = 1, prossimo;
    do {
      prossimo = new Date(ora.getFullYear(), ora.getMonth(), ora.getDate() + n);
      n++;
    } while (!giornoApertura(prossimo) && n < 12);
    var quando = (n - 1 === 1) ? 'domani' : GIORNI[prossimo.getDay()];
    var prefisso = festivo(ora) ? 'Chiuso per festività' : 'Chiuso ora';
    return { aperto: false, testo: prefisso + ' · riapre ' + quando + ' alle ' + hhmm(FASCE[0][0]) };
  }

  function aggiorna() {
    var s = calcolaStato();
    var nodi = document.querySelectorAll('[data-stato]');
    for (var i = 0; i < nodi.length; i++) {
      nodi[i].classList.toggle('aperto', s.aperto);
      var t = nodi[i].querySelector('[data-stato-testo]');
      if (t) t.textContent = s.testo;
    }
    var oggi = oraItaliana();
    var righe = document.querySelectorAll('.orari tr');
    for (var j = 0; j < righe.length; j++) {
      righe[j].classList.toggle('oggi', String(oggi.getDay()) === righe[j].getAttribute('data-giorno'));
    }
  }

  aggiorna();
  setInterval(aggiorna, 60 * 1000);
})();
