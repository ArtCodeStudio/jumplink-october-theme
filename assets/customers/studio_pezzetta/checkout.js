/**
 * 
 * var script_tag=document.createElement("script");
 * script_tag.type="text/javascript",
 * script_tag.src="https://jumplink.eu/themes/jumplink/assets/customers/studio_pezzetta/checkout.js",
 * document.body.appendChild(script_tag);
 * 
 */
 

var jumplink = {};

jumplink.names = {
    invoice: 'Invoice from manufacturer',
};

jumplink.texts = {
    dataTransfer: "Ich bin damit einverstanden, dass meine Daten an die Hersteller der Ware weitergegeben werden, damit diese vor der Produktion oder Zustellung der Ware zum Zwecke der Abstimmung und Rechnungsstellung Kontakt mit mir aufnehmen bzw. Statusinformationen zur Sendungszustellung übermitteln können. Meine diesbezüglich erteilte Einwilligung kann ich jederzeit widerrufen.",
    acceptDataTransfer: "Please accept the data transfer"
};

jumplink.urls = {
    privacyPolicy: 'https://studio-pezzetta.myshopify.com/pages/it-recht-datenschutz',
    TermsOfService: 'https://studio-pezzetta.myshopify.com/pages/it-recht-agb',
};

jumplink.templates = {
    notes: `
        <div class="content-box">
          <div class="content-box__row">
        
            <div class="content-box__header">
              <div class="content-box__header__title">
                <h3>Important</h3>
              </div>
            </div>
        
            <p class="content-legals">
              Bitte beachten Sie unsere <a href="${jumplink.urls.TermsOfService}" target="_blank" title="AGB">AGB</a> sowie unsere <a href="${jumplink.urls.privacyPolicy}" target="_blank" title="Datenschutzerklärung">Datenschutzerklärung</a>.
            </p>
        
            <div class="checkbox-wrapper">
              <div class="checkbox__input">
                <input class="input-checkbox" aria-expanded="false" type="checkbox" name="data transfer" id="checkout_data_transfer_true">
              </div> 
              <label class="checkbox__label" for="checkout_data_transfer_true">
                  ${jumplink.texts.dataTransfer}
                  <p class="field__message field__message--error" id="error-for-data-transfer">${jumplink.texts.acceptDataTransfer}</p>
              </label>
              
            </div>
            
            
        
          </div>
        </div>
    `,
};


jumplink.loadJquery = function (cb) {
    
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

jumplink.loadCss = function (cb) {
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://jumplink.eu/themes/jumplink/assets/customers/studio_pezzetta/checkout.css';
    link.media = 'all';
    
    link.onload = function() {
        cb(null, link);
    };
    
    head.appendChild(link);
};

jumplink.timeout = function (duration, timer, cb) {
    setTimeout(function () {
        if(timer >= 0) {
            cb(timer--);
            jumplink.timeout(duration, timer, cb);
        }
    }, duration);
};

jumplink.init = function (cb) {
    
    jumplink.loadCss(function(error, link) {
        // console.log("css loaded");
    });
    
    jumplink.loadJquery(cb);
};

jumplink.validate = function ($) {
    
    var appendOn = $('.step__sections:last');
    console.log(appendOn);
    appendOn.append(jumplink.templates.notes);
    
    $('.step__footer__continue-btn:last').click(function(event) {
        console.log("clicked");
        if($('#checkout_data_transfer_true').is(":checked")) {
            event.stopPropagation();
        } else {
            event.preventDefault();
            $('#error-for-data-transfer').show();
        }
        
    });
};


jumplink.customContactInformation = function () {
    
    jumplink.init(function(error, $) {
        
        $(".payment-method-list__item__info:contains('Bank Deposit —'):last").html(jumplink.names.invoice+"<br />");
        
        $(".step__footer__continue-btn .btn__content:contains('Bank Deposit —'):last").html(jumplink.names.invoice+"<br />");
        
        
    });
};



jumplink.customShippingMethod = function () {
    
    jumplink.init(function(error, $) {
        

        /*
        var timer = 3;
        jumplink.timeout(1000, timer, function (timer) {
            $(".step__footer__continue-btn:contains('Continue to payment method'):last").text('Continue to payment method ('+timer+')');
            if(timer <= 0) {
                $('.step__footer__continue-btn').click();
            }
        });
        */  
    });
};

jumplink.customPaymentMethod = function () {
    jumplink.init(function(error, $) {
        

        jumplink.validate($);
        
        $('.content-box__row--tight-spacing-vertical').parent().hide();

        
    });
};

jumplink.customThankYou = function () {
    
    jumplink.init(function(error, $) {
        
        $(".payment-method-list__item__info:contains('Bank Deposit —'):last").html(jumplink.names.invoice+"<br />");
        
        
        
    });
};


// console.log(window.Shopify.Checkout);
var checkoutStep = '';
if(window && window.Shopify && window.Shopify.Checkout && window.Shopify.Checkout.step) {
  checkoutStep = window.Shopify.Checkout.step;
}

switch(checkoutStep) {
    case 'contact_information':
        jumplink.customContactInformation();
        break;
    case 'shipping_method':
        jumplink.customShippingMethod();
        break;
    case 'payment_method':
        jumplink.customPaymentMethod();
        break;
    case 'thank_you':
        jumplink.customThankYou();
        break;
    default: // on second view thank_you is not set
        // check if we on thank you page
        var hasClass = document.querySelector('.os-order-number') !== null;
        if(hasClass === true) {
            jumplink.customThankYou();
        }
        break;
        
}