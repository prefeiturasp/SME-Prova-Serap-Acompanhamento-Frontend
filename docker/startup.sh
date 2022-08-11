#!/bin/sh

cd /usr/share/nginx/html/assets
files=$(ls)
for file in $files
do
  cp $file /tmp/$file
  rm $file
  sed -e "s/\${VITE_SME_SERAP_ACOMPANHAMENTO_API}/${VITE_SME_SERAP_ACOMPANHAMENTO_API}/" -e "s/\${VITE_SME_SERAP}/${VITE_SME_SERAP}/" -e "s/\${VITE_CHAVE_API}/${VITE_CHAVE_API}/" /tmp/$file > $file
done

nginx -g 'daemon off;'
