# S3 deploy

С помощью aws cli реализуйте загрузку собранных ассетов на s3 в gitlab ci отдельной джобой.

Ассеты будут лежать внутри этой папки монорепозитория, для сборки вызовите таску `build:assets`

Для загрузки используйте образ amazon/aws-cli.

Основная информация необходимая для загрузки:

region: `ru-central1`
endpoint: `https://storage.yandexcloud.net`
bucket: `infra-2`
папка внутри бакета: ваше имя пользователя на gitlab, переменная `$GITLAB_USER_LOGIN`

Для авторизации используйте переменные `$AWS_ACCESS_KEY_ID` и `$AWS_SECRET_ACCESS_KEY` (доступны на весь gitlab).
