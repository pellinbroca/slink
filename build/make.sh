#! /usr/bin/env sh
DIR="../src"
PREFIX="./slink"
U_OUT="$PREFIX.js"
C_OUT="$PREFIX-min.js"

rm -fv *.js

cat $DIR/jsrsasign-4.2.1/ext/*.js > $U_OUT
cat $DIR/crypto-js-3.1.2/*.js >> $U_OUT
cat $DIR/jsrsasign-4.2.1/*.js >> $U_OUT
cat $DIR/*.js >> $U_OUT

yui-compressor --type js $U_OUT > $C_OUT
