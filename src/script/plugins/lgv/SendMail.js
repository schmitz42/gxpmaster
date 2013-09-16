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
    
    return lgv.plugins.SendMail.superclass.addActions.call(this, [action]);

  }

});

Ext.preg(lgv.plugins.SendMail.prototype.ptype, lgv.plugins.SendMail);