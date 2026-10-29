# Sito Biberon – Santa Lucia di Serino (AV)

Sito vetrina statico (HTML + CSS + un po' di JavaScript), pronto per GitHub Pages.
Non serve nessun programma da installare né database.

## Struttura

```
index.html            la home (tutte le sezioni)
privacy.html          informativa privacy
robots.txt            permesso ai motori di ricerca
assets/css/style.css  grafica (colori in alto, in :root)
assets/js/main.js     menu smartphone + stato "Aperto / Chiuso"
assets/img/           foto, logo, icone
```

## Prima di pubblicare

1. Apri `index.html` e `privacy.html`, cerca `[DA INSERIRE]` e scrivi la **partita IVA**.

## Pubblicare su GitHub Pages

### Dal browser (più semplice)
1. Su github.com → **New repository** → nome per esempio `biberon` → **Public** → *Create repository*.
2. Nella pagina del repository: **Add file → Upload files**.
3. Trascina **il contenuto** della cartella `biberon-sito` (cioè `index.html`, `privacy.html`, `robots.txt` e la cartella `assets`), non la cartella stessa.
4. In basso **Commit changes**.
5. **Settings → Pages** → *Source*: **Deploy from a branch** → Branch **main**, cartella **/ (root)** → **Save**.
6. Dopo 1–2 minuti il sito è online su `https://TUO-UTENTE.github.io/biberon/`.

### Da terminale (git)
```bash
cd biberon-sito
git init
git add .
git commit -m "Primo caricamento sito Biberon"
git branch -M main
git remote add origin https://github.com/TUO-UTENTE/biberon.git
git push -u origin main
```
Poi attiva Pages come al punto 5.

## Collegare il dominio (es. www.biberon.it)

1. **Settings → Pages → Custom domain**: scrivi `www.tuodominio.it` → **Save**
   (GitHub crea da solo il file `CNAME` nel repository).
2. Dal pannello del registrar del dominio (Aruba, Register, ecc.) imposta i DNS:
   - record **CNAME**: `www` → `TUO-UTENTE.github.io`
   - record **A** per il dominio senza www (`@`):
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Aspetta la propagazione (da pochi minuti a qualche ora), poi in **Settings → Pages** spunta **Enforce HTTPS**.
4. Quando il dominio è attivo, in `index.html` cambia
   `<meta property="og:image" content="assets/img/og-image.jpg">`
   in `content="https://www.tuodominio.it/assets/img/og-image.jpg"`
   (serve per l'anteprima quando il link si condivide su WhatsApp e Facebook).

## Modifiche frequenti

| Cosa | Dove |
|---|---|
| Orari | tabella "Orari" in `index.html` **e** `FASCE` in `assets/js/main.js` |
| Giorni di chiusura (es. patrono) | `FESTIVI` in `assets/js/main.js`, formato `"giorno-mese"` |
| Domande frequenti | blocchi `<details>` nella sezione "DOMANDE FREQUENTI" di `index.html` |
| Recensioni | blocchi `<figure class="rec">` in `index.html` |
| Marche | blocchi `<span class="chip">` nella sezione "MARCHE" |
| Numero di telefono / WhatsApp | cerca `393517109887` e `351 710 9887` in `index.html` |
| Foto | sostituisci il file in `assets/img/` tenendo lo stesso nome (`.jpg` **e** `.webp`) |

Ogni modifica caricata su GitHub (anche dal browser con l'icona della matita) va online da sola in 1–2 minuti.
