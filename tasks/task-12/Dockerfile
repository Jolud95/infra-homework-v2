FROM node:24
WORKDIR /app
COPY package.json ./
RUN yarn install --immutable
COPY server.js ./
RUN mkdir -p /var/static
RUN echo '{ "type": "module" }' > package.json
EXPOSE 8080
CMD ["node", "server.js"]


#docker build -t pokemon-server

#docker run --rm \
#  -p 3000:8080 \
#  -v /Users/.../tasks/task-12/static/secrets.js:/var/static/secrets.js:ro \
#  pokemon-server


