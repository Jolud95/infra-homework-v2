FROM node:18

WORKDIR /app

# Устанавливаем зависимости
COPY package.json .
RUN yarn install --frozen-lockfile

# Копируем код
COPY package.json .
# Уточнить нужно ли копировтаь папку целиком или только её содержимое
COPY service .

EXPOSE 3000

# Приложение читает env из process.env
CMD ["yarn", "start"]


#ENV_FILE=.env.development docker-compose up --build
#ENV_FILE=.env.staging docker-compose up --build
#ENV_FILE=.env.production docker-compose up --build