FROM node:21-alpine
RUN mkdir /journey-finder-back
COPY . ./journey-finder-back
WORKDIR /journey-finder-back
RUN npm i
EXPOSE 3000
CMD ["npm","run","start"]