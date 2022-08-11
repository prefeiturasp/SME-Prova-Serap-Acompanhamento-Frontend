#!/bin/sh

cd /usr/share/nginx/html/assets
files=$(ls)
for file in $files
do
  cp $file /tmp/$file
  rm $file
  envsubst < /tmp/$file > $file
done

nginx -g 'daemon off;'
