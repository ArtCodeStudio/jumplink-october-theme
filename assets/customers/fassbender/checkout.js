/**
 * AGB Box V1.2
 * Copyright by Pascal Garber <pascal@jumplink.eu>
 * 
 * Copy checkout.min.js this script in the Shopify backend under Google Analytics
 * 
 */
try {
    window.jumplink = window.jumplink || {} ;
    window.jumplink.checkout = window.jumplink.checkout || {} ;
    
    window.jumplink.checkout.handle = 'fassbender';
    
    window.jumplink.checkout.agbInStep = 'payment_method'; // payment_method | review
    
    
    window.jumplink.checkout.urls = {
        privacyPolicy: '/pages/it-recht-datenschutz',
        TermsOfService: '/pages/it-recht-agb',
        contact: '/pages/help',
        serviceMail: 'info@myfassbender.com'
    };
    
    window.jumplink.checkout.texts = {};
    window.jumplink.checkout.texts.suppliers = {
        ups: 'United Parcel Service Deutschland Inc. & Co. OHG, Görlitzer Straße 1, 41460 Neuss',
        dhl: 'DHL Express Germany GmbH, Heinrich-Brüning-Str. 5, 53113, Bonn',
        other: 'weiterer Lieferanten'
    };
    window.jumplink.checkout.texts.dataTransfer = "Ich bin damit einverstanden, dass meine E-Mail-Adresse bzw. meine Telefonnummer an <em>" + window.jumplink.checkout.texts.suppliers.ups + ' und ' + window.jumplink.checkout.texts.suppliers.other+ "</em> weitergegeben wird, damit der Paketdienstleister vor der Zustellung der Ware zum Zwecke der Abstimmung eines Liefertermins per E-Mail oder Telefon Kontakt mit mir aufnehmen bzw. Statusinformationen zur Sendungszustellung übermitteln kann. Meine diesbezüglich erteilte Einwilligung kann ich jederzeit widerrufen.",
    window.window.jumplink.checkout.texts.legals = 'Hiermit akzeptiere ich Ihre <a href="'+window.jumplink.checkout.urls.TermsOfService+'" target="_blank" title="AGB">AGB</a> sowie Ihre <a href="'+window.jumplink.checkout.urls.privacyPolicy+'" target="_blank" title="Datenschutzerklärung">Datenschutzerklärung</a>.';
    
    window.jumplink.checkout.errors = {};
    window.jumplink.checkout.errors.acceptLegals = 'Bitte akzeptieren Sie unsere <a href="'+window.jumplink.checkout.urls.TermsOfService+'" target="_blank" title="AGB">AGB</a> und <a href="'+window.jumplink.checkout.urls.privacyPolicy+'" target="_blank" title="Datenschutzerklärung">Datenschutzerklärung</a>.<br><br>Bei Fragen zu unseren Kaufbedingungen kontaktieren Sie bitte unseren <a href="'+window.jumplink.checkout.urls.contact+'" target="_blank" title="Kundenservice">Kundenservice</a>.';
    window.jumplink.checkout.errors.acceptDataTransfer = 'Bitte akzeptieren Sie unsere Nachrichtenübermittlung an den Paketdienstleister.<br><br>Bei Fragen zu unseren Kaufbedingungen kontaktieren Sie bitte unseren <a href="'+window.jumplink.checkout.urls.contact+'" target="_blank" title="Kundenservice">Kundenservice</a>.';
    
    
    window.jumplink.checkout.templates = {
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
                      window.jumplink.checkout.texts.legals+
                      '<p class="field__message field__message--error" id="error-for-legals">'+window.jumplink.checkout.errors.acceptLegals+'</p>'+
                  '</label>'+
                '</div>'+
                '<div class="checkbox-wrapper">'+
                  '<div class="checkbox__input">'+
                    '<input class="input-checkbox" aria-expanded="false" type="checkbox" name="data transfer" id="checkout_data_transfer_true">'+
                  '</div>'+ 
                  '<label class="checkbox__label" for="checkout_data_transfer_true">'+
                      window.jumplink.checkout.texts.dataTransfer+
                      '<p class="field__message field__message--error" id="error-for-data-transfer">'+window.jumplink.checkout.errors.acceptDataTransfer+'</p>'+
                  '</label>'+
                '</div>'+
              '</div>'+
            '</div>'
    };
    
    
    window.jumplink.checkout.loadJquery = function (cb) {
        
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
    
    window.jumplink.checkout.loadCss = function (cb) {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://jumplink.eu/themes/jumplink/assets/customers/'+window.jumplink.checkout.handle+'/checkout.css';
        link.media = 'all';
        
        link.onload = function() {
            cb(null, link);
        };
        
        head.appendChild(link);
    };
    
    window.jumplink.checkout.timeout = function (duration, timer, cb) {
        setTimeout(function () {
            if(timer >= 0) {
                cb(timer--);
                window.jumplink.checkout.timeout(duration, timer, cb);
            }
        }, duration);
    };
    
    window.jumplink.checkout.init = function (cb) {
        
        window.jumplink.checkout.loadCss(function(error, link) {
            // console.log("css loaded");
        });
        
        window.jumplink.checkout.loadJquery(cb);
    };
    
    window.jumplink.checkout.validate = function ($) {
        
        var appendOn = $('.step__sections:last');
        console.log(appendOn);
        appendOn.append(window.jumplink.checkout.templates.notes);
        
        $('[data-trekkie-id="complete_order_button"]').on('click', function(event) {
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
    
    
    window.jumplink.checkout.customContactInformation = function () {
    
    };
    
    window.jumplink.checkout.customShippingMethod = function () {
    
    };
    
    window.jumplink.checkout.customPaymentMethod = function () {
    
    };
    
    window.jumplink.checkout.customThankYou = function () {
    
    };
    
    window.jumplink.checkout.customReview = function () {
    
    };
    
    
    // console.log(window.Shopify.Checkout);
    window.jumplink.checkout.step = '';
    if(window && window.Shopify && window.Shopify.Checkout && window.Shopify.Checkout.step) {
      window.jumplink.checkout.step = window.Shopify.Checkout.step;
      console.log('step', window.jumplink.checkout.step);
    }
    
    switch(window.jumplink.checkout.step) {
        case 'contact_information':
            window.jumplink.checkout.customContactInformation();
            break;
        case 'shipping_method':
            window.jumplink.checkout.customShippingMethod();
            break;
        case 'payment_method':
            window.jumplink.checkout.customPaymentMethod();
            break;
        case 'thank_you':
            window.jumplink.checkout.customThankYou();
            break;
        case 'review':
            window.jumplink.checkout.customReview();
            break;
        default: // on second view thank_you is not set
            // check if we on thank you page
            var hasClass = document.querySelector('.os-order-number') !== null;
            if(hasClass === true) {
                window.jumplink.checkout.step = 'thank_you'; 
                window.jumplink.checkout.customThankYou();
            }
            break;
    }
    
    console.log(window.jumplink.checkout.agbInStep, window.jumplink.checkout.step);
    
    
    if(window.jumplink.checkout.agbInStep === window.jumplink.checkout.step) {
        window.jumplink.checkout.init(function(error, $) {
            window.jumplink.checkout.validate($);
        });
    }
} catch(error) {
    console.error(error);
}