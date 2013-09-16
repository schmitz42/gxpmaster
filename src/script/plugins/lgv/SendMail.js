/*
 * Dieses Modul erzeugt eine Aktion, um eine Mail an die Geoportal-Hilfe zu senden
 * Es wird ein Betreff und ein Beispiel-Text mit Fragen in der Mail vorgegeben
 * das in mailtoActionCSS definierte Icon wird in der Toolbar angezeigt
 *  
 */

Ext.ns("lgv.plugins");

lgv.plugins.SendMail = Ext.extend(gxp.plugins.Tool, {

    ptype : "lgv_sendmail",
    
    /** api: config[tooltip]
     *  ``String``
     *  Tooltip to specify.
     */
    tooltip: "Email senden",
    
    /** api: config[emailAdress]
     *  ``String``
     *  URL of the EmailAdress to specify.
     */
    emailAdress: null,
    
    /** api: config[tooltip]
     *  ``String``
     *  Tooltip to specify.
     */
    subject: "Fragen zur Anwendung",

    addActions: function() {
    	
    var tooltip = this.tooltip;
    var email = this.emailAdress;	
    var subject = this.subject;
    
	var action = new Ext.Action({
        tooltip: 'Email senden an LGVGeoPortal-Hilfe',
		iconCls: 'mailtoActionCSS',
	    handler: function(){
           var mail = "mailto:" + email +"?";
		   mail += "subject=Frage%20zu%20Geo-Online&";
		   mail += "body=Zur%20weiteren%20Bearbeitung%20bitten%20wir%20Sie%20die%20nachstehenden%20Angaben%20zu%20machen.";
		   mail += "%20Bei%20Bedarf%20fuegen%20Sie%20bitte%20noch%20einen%20Screenshot%20hinzu.%20Vielen%20Dank!";
		   mail += "%0A%0A1.%20Name:";
		   mail += "%0A2.%20Telefon:";
		   mail += "%0A3.%20Anliegen:";
		   
		   location.href=mail;
        }
    });
    
    
    /*
     * Diese Funktion fügt eine CSS-Klasse für die zu erstellen Aktion hinzu, in der das Bild für die Toolbar definiert wird
     * 
     * Es wird erst ein neuer Dokumenten-Style erzeugt und dieser dem DOM hinzugefügt.
     * im try...catch-Block wird eine Browser-Weiche abgefragt.
     * cssRules und "insertRule" für Firefox, rules und "addRule" für IE
     * leider kann Firefox die cssRules nicht sofort nach Erzeugung erreichen, deswegen der Timeout im Catch-Block
     * 
     * Parameter firstTime, damit keine Endlosschleife entsteht, falls Probleme beim Erzeugen der neuen Styles auftreten.
     * 
     */
    function _addCSS_Class(firstTime){
    	
		if( document.styleSheets ) {
		    var myStyle = document.createElement("style");
		    myStyle.setAttribute( "type", "text/css" );
		    document.getElementsByTagName("head")[0].appendChild(myStyle);
		 
		    var styles = document.styleSheets.length;
		    myStyle = document.styleSheets[styles-1];
		    
		    try{
		 		// cssRules wird von Firefox verwendet, rules vom IE
		 	    if( document.styleSheets[0].cssRules ) {
			        myStyle.insertRule(".mailtoActionCSS { background-image: url(img/email.png); }", 0);
			    }
			    else if ( document.styleSheets[0].rules ) {
					myStyle.addRule(".mailtoActionCSS", "background-image: url(img/email.png);");
				}
			}
			catch(ex){
				if(firstTime){
					window.setTimeout(_addCSS_Class, 1000);
				}					
			}	
		}
	}
    
    // DOM-ready-Event
	//Ext.onReady(_addCSS_Class(true));
    
    return lgv.plugins.SendMail.superclass.addActions.call(this, [action]);

  }

});

Ext.preg(lgv.plugins.SendMail.prototype.ptype, lgv.plugins.SendMail);