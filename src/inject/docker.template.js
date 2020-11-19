module.exports = () => `
FROM node:14.4-alpine
RUN apk update
RUN apk upgrade
RUN apk add bash
RUN npm i tyfon -g
RUN mkdir -p /home/code
WORKDIR /home/code
COPY . .
RUN rm -fr node_modules dist
RUN npm i --only=prod
RUN tyfon build
EXPOSE 8000
CMD tyfon serve --mode prod
`;
