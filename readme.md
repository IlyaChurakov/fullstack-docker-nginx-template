## Описание структуры сборки

### nginx - обратный прокси, который проксирует запросы на client и server

- Dockerfile использует собственный конфигурационный файл nginx

### client - react приложение использующее для сборки vite, написанно на typescript, при контейнеризации собирается билд, который в дальнейшем и раздается статическим сервером nginx

- nginx - После проксирования запроса на client он обрабатывается статическим сервером nginx, который отдает html файл, сборка образа статического nginx описана в Dockerfile, в конечном итоге попадает в контейнер client

### server - сервер на express, также написан на typescript

- Dockerfile сервера использует многоступенчатую сборку для уменьшения веса образа, а также билдит проект в папку dist, файлы которой потом попадают в контейнер

- Используются следующие переменные окружения (задаются через директиву environments в docker-compose.yml):

  - db - адрес базы данных
  - port - порт запуска сервера
  - clientUrl - адрес клиентской части, используется для cors
  - staticPath - адрес папки со статическими файлами
  - isProduction - если === 'production', то отключается логирование запросов

  Для локальной разработки без использования docker требуется создание файла ./server/.env и указание переменных в нем

### В docker-compose.yml указаны сервисы client, server и nginx

- сервис client представляет собой nginx обслуживающий статические файлы фронтенда

- сервис server представляет собой nodejs сервер отдающий данные по конечным точкам. Данная сборка не предусматривает использование какой-либо базы данных, для этого требуется дополнительная настройка, которая не входит в цели этой сборки.

- сервис nginx представляет собой обратный прокси

Для запуска сервисов: docker-compose up -d
