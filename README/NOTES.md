*****************************************************************************************
# NOTES
*****************************************************************************************

NOTA:
    Ogni appunto fa riferimento all'elemento direttamente sotto di esso.
    Il nome della nota è composto da [ nome file + NOTES + variabile ]:
        variabile (1)
            FIND (testo da cercare nel file per localizzare la riga)
        variabile (2)
            num.num.num (ID univoco della nota in quel file)



## package.json_NOTES_FIND ("scripts": / "watch")
Per leggere le variabili ambientali da ".env" senza installare il pacchetto ("npm i dotenv") aggiungere al "watch" questa stringa: "node --env-file=.env --watch app.js".

## app.js_NOTES_1.1.1
In mancanza del file ".env" con le variabili quali HOST ad esempio, fornisco comunque un "default" così che se scaricata da altri, la repository funzioni comunque.

## app.js_NOTES_1.1.2
E' bene accorpare il Router ed il suo "use" insieme per ciascuna risorsa.
Buona pratica anche impostare la rotta con il nome della risorsa (Es. "/movies" in questo caso).

## app.js_NOTES_1.1.3
Un dettaglio importante per questioni di leggibilità, è mettere "/api/risorsa" nel ROUTER, così so che sto facendo una richiesta tramite API.

## app.js_NOTES_2.1.1
Tra i MIDDLEWARES fondamentali, troviamo la funzione di Express che traduce le risposte in JSON, senza cui nessuna CRUD può essere eseguita correttamente.
A seguire la dichiarazione della cartella PUBLIC.

## app.js_NOTES_3.1.1
Gli ERROR HANDLERS (che sono MIDDLEWARE) sono fondamentali. Parliamo del "404 NOT FOUND" e di "NO RESULTS".
Questi MIDDLEWARE vanno sempre registrati prima del LISTENING.

## moviesRouter_NOTES_1.1.1
Si potrebbe anche importare l'inter Router, ma usando il DESTRUCTURING come in questo caso, può risultare più comodo perchè posso cambiare risorsa semplicemente cambiando il REQUIRE del CONTROLLER. In altri termini un "copia-incolla" più rapido e pulito senza cambiare a uno a uno as esempio "moviesController.index", etc.

## moviesController_NOTES_1.1.1
E' fondamentale gestire l'errore nel caso di una Query errata (Es. "SELEC ...").

## moviesController_NOTES_1.1.2
Avrei potuto dichiarare questa funzione anche DOPO le CRUD. Questo perchè al caricamento dell'App, viene importato l'intero Controller, comprese le eventuali funzioni messe alla fine. Siccome l'azione CRUD viene sicuramente effettuata dopo il caricamento del Controller, siamo sicuro che le funzioni (anche se dichiarate nelle ultime righe), funzionino correttamente.

## moviesController_NOTES_1.1.3
Nella CRUD SHOW (per come è scritta ora), per ottenere le REVIEWS dei film bisogna creare una QUERy "nested" all'intero della QUERY per la SHOW.
A sua volta, essendo le due funzioni asincrone, è necessario "nestare" anche la POSITIVE RESPONSE.