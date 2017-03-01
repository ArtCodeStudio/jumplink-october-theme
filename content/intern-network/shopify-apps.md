# Shopify Apps

Unsere Shopify Apps bestehen aus mehreren Microservices für die API und der Authentifizierung.

## Microservices

### Ports

**auth**
* **3010** - dev.auth.api.jumplink.eu
* **3011** - v0-1.auth.api.jumplink.eu
* **3012** - v0-2.auth.api.jumplink.eu

**shopify**
* **3040** - dev.shopify.api.jumplink.eu
* **3041** - v0-1.shopify.api.jumplink.eu
* **3042** - v0-2.shopify.api.jumplink.eu

**instagram**
* **3050** - dev.instagram.api.jumplink.eu
* **3051** - dev.instagram.api.jumplink.eu

**video**
* **3070** - dev.video.api.jumplink.eu
* **3071** - v0-1.video.api.jumplink.eu
* **3072** - v0-2.video.api.jumplink.eu

**playground**
* **3999** - playground.api.jumplink.eu

### Reverse Proxy
 * [reverse-proxy](https://git.mediamor.de/jumplink.eu/microservice-reverse-proxy) - Dient als Reverse Proxy um alle anderen Microservices über eigene Subdomnains verfügbar zu machen.

### Auth
 * [auth](https://git.mediamor.de/jumplink.eu/microservice-auth) - Hilft bei der Shopify Authentifizierung über OAuth sowie Firebase. Speichert den Shopify Token in Firebase ab.

### Shopify
 * [shopify](https://git.mediamor.de/jumplink.eu/microservice-shopify) - REST Shopify API

### OctoberCMS
 * [OctoberCMS](https://octobercms.com/) - Zur Darstellung der HTML-Seiten der App-Backends

### Server api@api.jumplink.eu (SSH / SFTP)

Die Microservices laufen auf einem eigenen Server `api.jumplink.eu`.

### Forever

Die Microservices werden durch [forever](https://github.com/foreverjs/forever) am leben erhalten, die laufenden Microservices können mit `forever list` aufgelistet werden.
Die Log eines Microservices kann dann z.B. mit `forever logs [#]` ausgegeben werden.

Hat man ein Microservice modifiziert kann dieser durch `forever restart [#]` neu gestartet werden.

## Server shopify@jumplink.eu (SSH / SFTP)

Die Backends der Apps laufen über OctoberCMS auf dem jumplink.eu Server:

* Host: jumplink.eu
* Benutzer: shopify
* Passwort: Tonic-False

## Shopify Client Framework

* Repo: [shopify-client](https://git.mediamor.de/jumplink.eu/shopify-client)

Für die Kommunikation mit den Microservices und für die initialisierung des [Shopify Embedded App SDK](https://help.shopify.com/api/sdks/embedded-app-sdk) steht ein eigenes Framework bereit, welches von allen mit der Zeit verbessert und ergänzt werden sollte.

Das Shopify Client Framework vereinfacht unter anderem die Authentifizierung, der JavaScript Code welcher innerhalb des Iframes ausgeführt wird könnte wie folgt aussehen: 

```js
// Hole URL Parameter wie Subdomain z.B. tagged-images-demo.myshopify.com
query = shopifyApp.getQueryParams(document.location.search);

if(query.shop) {
    // Subdomain in der globalen Config speichern 
    shopifyApp.setShop(query.shop);
    
    // Shopify Client Framework initialisieren
    shopifyApp.initShopify(window.config.shopifyApp.protocol, window.config.shopifyApp.shop, window.config.shopifyApp.shopName, function (error, initApiRes) {
        
        if(error) {
            return console.error(new Error(error));
        }
        
        
        // Embedded App SDK verwenden und eine Navbar über dem Iframe erzeugen
        ShopifyApp.Bar.initialize({
          title: 'Tagged Images',
          buttons: {
            primary: {
              label: 'foobar',
              message: 'foobar',
              callback: function(){
                ShopifyApp.Bar.loadingOn();
              }
            }
          }
        });
        
        // Shopify API über den Shopify Microservice verwenden
        shopifyApp.api('blog','list', {}, function(error, articles) {
            console.log('articles', articles);
        });    
    });
} else  {
    console.error("No Shopify found, please open this site in Shopify, not directly!");
}

```

Befindet man sich nicht in einem Iframe leitet die funktion `initShopify` den Benutzer direkt auf seinen Shop weiter um die Installation einzuleiten oder die App zu verwalten:

```js
shopifyApp.initShopify(protocol='https://', shop='https://tagged-images-demo.myshopify.com', shopName='tagged-images-demo');
```

### Authentifizierung
Die Authentifizierung ist etwas kompiziert, da sie einerseits über [OAuth 2.0](https://entwickler.de/online/agile/so-funktioniert-oauth2-134316.html) statt findet und zudem in einem iframe unter Shopify geladen wird, was einige Einschränkungen mit sich bringt.
Wir haben dafür im Shopify Client Framework bereits eine funktionierende Lösung deren Ablauf ich im folgendem versuche zu beschreiben.

#### Authentifizierung ohne Iframe

* Wenn die App nicht in einem Iframe geladen wurde leite direkt auf den "Auth Microservice" weiter
* Der "Auth Microservice" merkt sich die aktuelle Session, erzeugt eine URL  und leitet den Benutzer auf seinen Shopify-Shop zur direkten Authentifizierung weiter
* Hat der Benutzer die App Autorisiert (oder dies bereits vorher getan) leitet Shopify den Benutzer wieder zum "Auth Microservice" zurück
* Dort wird aus den Übergebenen Parametern der Shopify Access Token entschlüsselt, außerdem wird durch [createCustomToken()](https://firebase.google.com/docs/auth/server/create-custom-tokens) ein Token für Firebase erzeugt. Beide Tokens werden in der Session gespeichert.
* Anschließend wird dem Benutzer eine HTML-Seite angezeigt welche den Benutzer Clientseitig bei Firebase anmeldet und den Shopify-Token für diesen Benutzer in der Firebase Datenbank abspeichert.
* Nun wird der Benutzer wieder auf Shopify weitergeleitet, sodass dieser direkt bei der App mit dem Iframe landet.

#### Authentifizierung mit Iframe

Fall A

* Wurde die App in einem Iframe geladen, initialisiere das Shopify Embedded App SDK
* Ist das Shopify Embedded App SDK bereit, hole dir deinen Firebase-Token von dem "Auth Microservice"
* Ist der Token vorhanden, logge dich mit diesem bei Firebase ein und hole dir deinen in der Datenbank gespeicherten Shopify Token
* Initialisiere mit dem Shopify Token das API über den "Shopify Microservice"
* Mache deine Abfragen..

Fall B

* Wurde die App in einem Iframe geladen, initialisiere das Shopify Embedded App SDK
* Ist das Shopify Embedded App SDK bereit, hole dir deinen Firebase-Token von dem "Auth Microservice"
* Ist der Token *nicht* vorhanden, fahre wie oben bei "Authentifizierung ohne Iframe" fort


## Entwicklung

Von Shopify's eigenen Apps lernen. Shopify bietet selbher Apps für Shopify an und diese dienen gleichzeitig als Referenz-Apps aber auch andere App Entwickler haben gute Lösungen gefunden wie man am besten Apps für Shopify entwickeln kann. Daher lautet die Devise "von anderen lernen". Daher meine Empfehlung, die [Shopifyeigenen](https://apps.shopify.com/partners/shopify) und andere Apps installieren, einrichten, ausoprobieren und testen.



### Iframe

Shopify Apps werden in Shopify in einem Iframe geladen, über das Embedded App SDK ist es möglich mit dem Backend von Shopify zu kommunizieren und z.B. eine Navbar außerhalb des Iframes zu initialisieren:

![Shopify Iframe](/storage/app/media/intern-network/shopify/shopify-iframe-and-esdk.png)


## Apps

Das Backend der Apps wird mit OctoberCMS als Theme entwickelt

### Tagged Images

 * [App Site / Backend](https://tagged-images.jumplink.eu/) ([Admin](https://tagged-images.jumplink.eu/backend)) damit der App Benutzer ein Backend für die App hat.
 * [Shopify Demo Store](https://tagged-images-demo.myshopify.com) ([Admin](https://tagged-images-demo.myshopify.com/admin)) zum präsentieren und um die App zu testen.
 * October Theme Repo: [tagged-images-october-theme](https://git.mediamor.de/jumplink.eu/tagged-images-october-theme)
 * Firebase [tagged-images.firebaseio.com](https://console.firebase.google.com/project/tagged-images/database/data~2F)

**App Settings**
* Handle: tagged-images

**Shopify App Settings**
* App name: Tagged Images
* App / Callback URL: https://tagged-images.jumplink.eu/shopify
* Preferences URL: https://tagged-images.jumplink.eu/preferences
* Support URL: https://tagged-images.jumplink.eu/help
* Redirection URL: https://auth.api.jumplink.eu/shopify-callback/tagged-images
* API key: 08267a137ead223d3dedfc4fe9f6c466

### Reports Plus

 * [App Site / Backend](https://reports-plus.jumplink.eu/) ([Admin](https://reports-plus.jumplink.eu/backend)) damit der App Benutzer ein Backend für die App hat.
 * [Shopify Demo Store](https://anita-hass-2.myshopify.com) ([Admin](https://anita-hass-2.myshopify.com/admin)) um die App zu testen.
 * October Theme Repo: [reports-plus-october-theme](https://git.mediamor.de/jumplink.eu/reports-plus-october-theme)
 * Firebase [reports-plus.firebaseio.com](https://console.firebase.google.com/project/reports-plus/)

**App Settings**
* Handle: reports-plus

**Shopify App Settings**
* App name: Reports Plus
* App / Callback URL: https://reports-plus.jumplink.eu/shopify
* Preferences URL: https://reports-plus.jumplink.eu/preferences
* Support URL: https://reports-plus.jumplink.eu/help
* Redirection URL: https://auth.api.jumplink.eu/shopify-callback/reports-plus
* API key: 33aa83f12622f14dbd8839f685888dfc

**Firebase App Settings**
* apiKey: AIzaSyBygClTIUALH6cQT5WRR8BVUO_g0J6yUyQ
* authDomain: reports-plus.firebaseapp.com
* databaseURL: https://reports-plus.firebaseio.com
* storageBucket: reports-plus.appspot.com
* messagingSenderId: 71871191395

### Exclusive Collections

 * [App Site / Backend](https://exclusive-collections.jumplink.eu/) ([Admin](https://exclusive-collections.jumplink.eu/backend)) damit der App Benutzer ein Backend für die App hat.
 * [Shopify Demo Store](https://tagged-images-demo.myshopify.com) ([Admin](https://tagged-images-demo.myshopify.com/admin)) zum präsentieren und um die App zu testen.
 * October Theme Repo: [exclusive-collections-october-theme](https://git.mediamor.de/jumplink.eu/exclusive-collections-october-theme)
 * Firebase [exclusive-collections.firebaseio.com](https://console.firebase.google.com/project/exclusive-collections/)

**App Settings**
* Handle: exclusive-collections

**Shopify App Settings**
* App name: Exclusive Collections
* App / Callback URL: https://exclusive-collections.jumplink.eu/shopify
* Preferences URL: https://exclusive-collections.jumplink.eu/preferences
* Support URL: https://exclusive-collections.jumplink.eu/help
* Redirection URL: https://auth.api.jumplink.eu/shopify-callback/exclusive-collections
* API key: 2c5d5cc9b577587cc15bc0dad718e5ea


**Firebase App Settings**
* apiKey: AIzaSyBj2Q7-EDcK-gh2NGyGB4Ij_9LqXSFOFkI
* authDomain: exclusive-collections.firebaseapp.com
* databaseURL: https://exclusive-collections.firebaseio.com
* storageBucket: exclusive-collections.appspot.com
* messagingSenderId: 93783703056

### Blog Snippets

 * [App Site / Backend](https://blog-snippets.jumplink.eu/) ([Admin](https://blog-snippets.jumplink.eu/backend)) damit der App Benutzer ein Backend für die App hat.
 * [Shopify Demo Store](https://tagged-images-demo.myshopify.com) ([Admin](https://tagged-images-demo.myshopify.com/admin)) zum präsentieren und um die App zu testen.
 * October Theme Repo: [blog-snippets-october-theme](https://git.mediamor.de/jumplink.eu/blog-snippets-october-theme)
 * Firebase [blog-snippets.firebaseio.com](https://console.firebase.google.com/project/blog-snippets/)

**App Settings**
* Handle: blog-snippets

**Shopify App Settings**
* App name: Blog Snippets
* App / Callback URL: https://blog-snippets.jumplink.eu/shopify
* Preferences URL: https://blog-snippets.jumplink.eu/preferences
* Support URL: https://blog-snippets.jumplink.eu/help
* Redirection URL: https://auth.api.jumplink.eu/shopify-callback/blog-snippets
* API key: abf78514bc638551cc9f43dc136a2631

**Firebase App Settings**
* apiKey: AIzaSyCvF2uYNIVxvisUcghmfp2kGQZY6aQmANY
* authDomain: blog-snippets.firebaseapp.com
* databaseURL: https://blog-snippets.firebaseio.com
* storageBucket: blog-snippets.appspot.com
* messagingSenderId: 1086142122428

### Product Videos

 * [App Site / Backend](https://product-videos.jumplink.eu/) ([Admin](https://product-videos.jumplink.eu/backend)) damit der App Benutzer ein Backend für die App hat.
 * [Shopify Demo Store](https://anita-hass-2.myshopify.com) ([Admin](https://anita-hass-2.myshopify.com/admin)) um die App zu testen.
 * October Theme Repo: [product-videos-october-theme](https://git.mediamor.de/jumplink.eu/product-videos-october-theme)
 * Firebase [product-videos.firebaseio.com](https://console.firebase.google.com/project/product-videos/)

**App Settings**
* Handle: product-videos

**Shopify App Settings**
* App name: Product Videos
* App / Callback URL: https://product-videos.jumplink.eu/shopify
* Preferences URL: https://product-videos.jumplink.eu/preferences
* Support URL: https://product-videos.jumplink.eu/help
* Redirection URL: https://auth.api.jumplink.eu/shopify-callback/product-videos
* API key: 58fa9edaf1ac9c2fa8c62c89d44a52de

**Firebase App Settings**
* apiKey: AIzaSyC9uwWhqxj-8-VYyVUmtjCQR7m_08WycRA
* authDomain: product-videos-3c793.firebaseapp.com
* databaseURL: https://product-videos-3c793.firebaseio.com
* storageBucket: product-videos-3c793.appspot.com
* messagingSenderId: 364570973683