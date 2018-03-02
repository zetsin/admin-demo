FROM node:8-wheezy

# Create app directory
RUN mkdir -p /app

# Bundle app source
COPY . /app
WORKDIR /app
RUN npm install

VOLUME /app

ENTRYPOINT ["/bin/bash", "-l", "/app/entrypoint.bash"]
