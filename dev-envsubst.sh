#!/bin/bash
set -e

# .env.development.local içindeki değişkenleri export et
set -a
source .env.development.local
set +a

# Dönüştürülecek template dosyalarının listesi
templates=(
  "./nginx/dev.nginx.conf.template"
)

# Mevcut ortam değişkenlerinden sadece ${VAR} formatında değiştirilecekleri hazırla
vars=$(env | awk -F= '{printf " ${%s}", $1}')

# Her template dosyasını işleyip .template uzantısını kaldırarak çıktı oluştur
for file in "${templates[@]}"; do
  output="${file%.template}"
  echo "Generating: $output"
  envsubst "$vars" < "$file" > "$output"
done

echo "✅ All config files generated successfully."
