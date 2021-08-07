FROM buildkite/puppeteer

WORKDIR /app
COPY . .

RUN yarn install --production

EXPOSE 8000

VOLUME [ "/app/static" ]

CMD [ "yarn", "start" ]
