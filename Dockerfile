FROM node

# Create app directory
WORKDIR /usr/src/

# Install app dependencies
COPY . .
EXPOSE 5000
RUN chmod +x run-script.sh
RUN npm i
RUN npm run build
CMD ["./run-script.sh"]