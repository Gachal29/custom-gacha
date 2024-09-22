FROM node:20.9.0

RUN npm install -g npm@10.8.3

RUN mkdir /root/workspace
WORKDIR /root/workspace

CMD ["npm", "run", "dev"]
