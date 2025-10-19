#!/bin/bash
set -e

# .env.production.local içindeki değişkenleri export et
set -a
source .env.production.local
set +a

# Dönüştürülecek template dosyalarının listesi
templates=(
  "./dns/config/apikeys.pass.template"
  "./dns/config/named.conf.local.template"
  "./dns/config/rndc.key.template"
  "./dns/zones/db.webdiaries.online.template"
  "./nginx/prod.nginx.conf.template"
  "./nginx/rfc2136.ini.template"
)

# Her template dosyasını işleyip .template uzantısını kaldırarak çıktı oluştur
for file in "${templates[@]}"; do
  output="${file%.template}"
  echo "Generating: $output"
  envsubst < "$file" > "$output"
done

echo "✅ All config files generated successfully."
