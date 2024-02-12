FROM nginx
COPY ./nginx.conf ./etc/nginx/nginx.conf
COPY /rtt.digital.crt /etc/ssl/rtt.digital.crt
COPY /rtt.digital.key /etc/ssl/rtt.digital.key

EXPOSE 80
EXPOSE 443