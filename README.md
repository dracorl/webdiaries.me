### olası problemler

sudo chown -R 100:100 ./zones // bind9 için dizin erişim izni

53. port veya varsayılan dns programı çakışabilir o durumda çakışan programları kapatıp ilk olarak dnsmaq çalıştırılabilir

bash dev-envsubst.sh
bash prod-envsubst.sh

docker compose --env-file .env.development.local -f 'dev.compose.yml' up -d --build
docker compose --env-file .env.production.local -f 'prod.compose.yml' up -d --build
