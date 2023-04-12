FROM nginx
EXPOSE 80
RUN rm -v /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/
COPY ./dist /usr/share/nginx/html