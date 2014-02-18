(function(){

function fetchResource(uri) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', uri, false);
    xhr.send();

    if(xhr.readyState !== 4) {
        return null;
    }

    if(xhr.responseText === '') {
        return null;
    }

    return xhr.responseText;
}

SlinkResources = (function(){
    var resources = {};

    var certificateElement = document.querySelector('[data-slink-certificate]');
    if(certificateElement === null) {
        return resources;
    }

    var x509 = new X509();
    x509.readCertPEM(certificateElement.innerHTML);
    var publicKey = x509.subjectPublicKeyRSA;

    var slinks = document.querySelectorAll('[data-slink]');
    for(var i = 0; i < slinks.length; ++i) {

        var resourceURI = slinks[i].getAttribute('data-slink');
        var signatureURI = resourceURI+'.sig';

        var resource = fetchResource(resourceURI);
        var signature = fetchResource(signatureURI);
        if(resource === null || signature === null) {
            continue;
        }

        var isValid = publicKey.verifyString(resource, signature); 

        if(isValid) {
            if(slinks[i].hasAttribute('data-slink-javascript')) {
                var scriptElement = document.createElement('script');
                scriptElement.innerHTML = resource;
                document.head.appendChild(scriptElement);
            }

            if(slinks[i].hasAttribute('data-slink-store')) {
                resources[slinks[i].getAttribute('data-slink-store')] = resource;
            }
        }

    }

    return resources;
})();

})();
