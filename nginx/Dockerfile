FROM --platform=linux/amd64 nginx:alpine

COPY certificates/cloudflare.pem /etc/ssl/certs/

COPY certificates/cloudflare.key /etc/ssl/private/

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]