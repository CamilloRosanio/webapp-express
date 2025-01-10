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

## app.js_NOTES_2.1.1
Tra i MIDDLEWARES fondamentali, troviamo la funzione di Express che traduce le risposte in JSON, senza cui nessuna CRUD può essere eseguita correttamente.
A seguire la dichiarazione della cartella PUBLIC.

## moviesRouter_NOTES_1.1.1
Si potrebbe anche importare l'inter Router, ma usando il DESTRUCTURING come in questo caso, può risultare più comodo perchè posso cambiare risorsa semplicemente cambiando il REQUIRE del CONTROLLER. In altri termini un "copia-incolla" più rapido e pulito senza cambiare a uno a uno as esempio "moviesController.index", etc.