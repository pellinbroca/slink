#! /usr/bin/env sh
# Private key generated with:
openssl genrsa -out key.pem 4096

# Public certificate generated with:
openssl req -nodes -new -x509 -key key.pem -out cert.pem -days 365

# Signature generated with (currently only sha1 is supported):
openssl dgst -sign key.pem -sha1 server/main.js | xxd -p > server/main.js.sig

# See local/example.html
