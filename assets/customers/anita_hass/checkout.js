/**
 * 
 * var script_tag=document.createElement("script");
 * script_tag.type="text/javascript";
 * script_tag.src="https://jumplink.eu/themes/jumplink/assets/customers/anita_hass/checkout.js";
 * document.body.appendChild(script_tag);
 * 
 */
 

var jumplink = window.jumplink || {} ;
jumplink.checkout = window.jumplink.checkout || {} ;

jumplink.checkout.urls = {
    privacyPolicy: '/pages/it-recht-datenschutz',
    TermsOfService: '/pages/it-recht-agb',
    contact: '/pages/kontakt',
    serviceMail: 'mailto:talk@onlyanita.com'
};

jumplink.checkout.texts = {};
jumplink.checkout.texts.suppliers = "United Parcel Service Deutschland Inc. & Co. OHG, Görlitzer Straße 1, 41460 Neuss / DHL Express Germany GmbH, Heinrich-Brüning-Str. 5, 53113, Bonn";
jumplink.checkout.texts.dataTransfer = "Ich bin damit einverstanden, dass meine E-Mail-Adresse bzw. meine Telefonnummer an <em>" + jumplink.checkout.texts.suppliers + "</em> weitergegeben wird, damit der Paketdienstleister vor der Zustellung der Ware zum Zwecke der Abstimmung eines Liefertermins per E-Mail oder Telefon Kontakt mit mir aufnehmen bzw. Statusinformationen zur Sendungszustellung übermitteln kann. Meine diesbezüglich erteilte Einwilligung kann ich jederzeit widerrufen.",
jumplink.checkout.texts.legals = 'Hiermit akzeptiere ich Ihre <a href="'+jumplink.checkout.urls.TermsOfService+'" target="_blank" title="AGB">AGB</a> sowie Ihre <a href="'+jumplink.checkout.urls.privacyPolicy+'" target="_blank" title="Datenschutzerklärung">Datenschutzerklärung</a>.';

jumplink.checkout.errors = {};
jumplink.checkout.errors.acceptLegals = 'Bitte akzeptieren Sie unsere <a href="'+jumplink.checkout.urls.TermsOfService+'" target="_blank" title="AGB">AGB</a> und <a href="'+jumplink.checkout.urls.privacyPolicy+'" target="_blank" title="Datenschutzerklärung">Datenschutzerklärung</a>.<br><br>Bei Fragen zu unseren Kaufbedingungen kontaktieren Sie bitte unseren <a href="'+jumplink.checkout.urls.contact+'" target="_blank" title="Kundenservice">Kundenservice</a>.';
jumplink.checkout.errors.acceptDataTransfer = 'Bitte akzeptieren Sie unsere Nachrichtenübermittlung an den Paketdienstleister.<br><br>Bei Fragen zu unseren Kaufbedingungen kontaktieren Sie bitte unseren <a href="'+jumplink.checkout.urls.contact+'" target="_blank" title="Kundenservice">Kundenservice</a>.';


jumplink.checkout.templates = {
    notes:
        '<div class="content-box">'+
          '<div class="content-box__row">'+
            '<div class="content-box__header">'+
              '<div class="content-box__header__title">'+
                '<h3>Kaufbedingungen</h3>'+
              '</div>'+
            '</div>'+
            '<p class="content-legals">'+  
              
            '</p>'+
            '<div class="checkbox-wrapper">'+
              '<div class="checkbox__input">'+
                '<input class="input-checkbox" aria-expanded="false" type="checkbox" name="data transfer" id="checkout_legals">'+
              '</div>'+ 
              '<label class="checkbox__label" for="checkout_legals">'+
                  jumplink.checkout.texts.legals+
                  '<p class="field__message field__message--error" id="error-for-legals">'+jumplink.checkout.errors.acceptLegals+'</p>'+
              '</label>'+
            '</div>'+
            '<div class="checkbox-wrapper">'+
              '<div class="checkbox__input">'+
                '<input class="input-checkbox" aria-expanded="false" type="checkbox" name="data transfer" id="checkout_data_transfer_true">'+
              '</div>'+ 
              '<label class="checkbox__label" for="checkout_data_transfer_true">'+
                  jumplink.checkout.texts.dataTransfer+
                  '<p class="field__message field__message--error" id="error-for-data-transfer">'+jumplink.checkout.errors.acceptDataTransfer+'</p>'+
              '</label>'+
            '</div>'+
          '</div>'+
        '</div>'
};


jumplink.checkout.loadJquery = function (cb) {
    
    // console.log(window);
    
    
    if($) {
        console.log("jQUery found", $);
        
        $( document ).ready(function() {
          cb(null, $);
        });
        
    } else if(jQuery) {
        console.log("jQUery found", jQuery);
        
        jQuery( document ).ready(function() {
          cb(null, jQuery);
        });
            
    } else {
        // load custon jQuery
        var script_tag=document.createElement("script");
        script_tag.type="text/javascript",
        script_tag.src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js",
        script_tag.onload = function() {
            window.jQuery( document ).ready(function() {
              cb(null, window.jQuery);
            });
        };
        
        document.body.appendChild(script_tag);
    }
};

jumplink.checkout.loadCss = function (cb) {
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://jumplink.eu/themes/jumplink/assets/customers/anita_hass/checkout.css';
    link.media = 'all';
    
    link.onload = function() {
        cb(null, link);
    };
    
    head.appendChild(link);
};

jumplink.checkout.timeout = function (duration, timer, cb) {
    setTimeout(function () {
        if(timer >= 0) {
            cb(timer--);
            jumplink.checkout.timeout(duration, timer, cb);
        }
    }, duration);
};

jumplink.checkout.init = function (cb) {
    
    jumplink.checkout.loadCss(function(error, link) {
        // console.log("css loaded");
    });
    
    jumplink.checkout.loadJquery(cb);
};

jumplink.checkout.validate = function ($) {
    
    var appendOn = $('.step__sections:last');
    console.log(appendOn);
    appendOn.append(jumplink.checkout.templates.notes);
    
    $('.step__footer__continue-btn:last').click(function(event) {
        console.log("clicked");
        
        if(!$('#checkout_legals').is(":checked")) {
            event.preventDefault();
            $('#error-for-legals').show();
        } else {
            $('#error-for-legals').hide();
        }
        
        if(!$('#checkout_data_transfer_true').is(":checked")) {
            event.preventDefault();
            $('#error-for-data-transfer').show();
        } else {
            $('#error-for-data-transfer').hide();
        }
        
        if($('#checkout_legals').is(":checked") && $('#checkout_data_transfer_true').is(":checked")) {
             event.stopPropagation();
        }
        
    });
};


jumplink.checkout.customContactInformation = function () {

};



jumplink.checkout.customShippingMethod = function () {

};

jumplink.checkout.customPaymentMethod = function () {
    jumplink.checkout.init(function(error, $) {
        jumplink.checkout.validate($);
        // $('.content-box__row--tight-spacing-vertical').parent().hide();
    });
};

jumplink.checkout.customThankYou = function () {

};


// console.log(window.Shopify.Checkout);
jumplink.checkout.step = '';
if(window && window.Shopify && window.Shopify.Checkout && window.Shopify.Checkout.step) {
  jumplink.checkout.step = window.Shopify.Checkout.step;
}

switch(jumplink.checkout.step) {
    case 'contact_information':
        jumplink.checkout.customContactInformation();
        break;
    case 'shipping_method':
        jumplink.checkout.customShippingMethod();
        break;
    case 'payment_method':
        jumplink.checkout.customPaymentMethod();
        break;
    case 'thank_you':
        jumplink.checkout.customThankYou();
        break;
    default: // on second view thank_you is not set
        // check if we on thank you page
        var hasClass = document.querySelector('.os-order-number') !== null;
        if(hasClass === true) {
            jumplink.checkout.customThankYou();
        }
        break;
}