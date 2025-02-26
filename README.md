    git clone https://github.com/trafik8787/api-jwt.git

    cd ./app
    npm install

>cd ./laradock

>docker-compose build nginx node php-fpm mysql redis

>docker-compose up -d nginx node php-fpm mysql redis

    docker-compose exec --user=laradock workspace bash

    cd api-jwt
    composer install
    artisan migrate
    artisan db:seed

    created user
    email: john@example.com
    pass: 123123
   
>cd ./frontend/UI-API

    npm install
    npm run dev

