#!/bin/bash

cd /usr/share/nginx/html/assets
files=$(ls)
for file in $files
do
  envsubst < $file | tee $file
done
cd
nginx -g 'daemon off;'
