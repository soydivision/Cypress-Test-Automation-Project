FROM cypress/included:13.6.1
WORKDIR /e2e
COPY ./package.json .
COPY ./cypress.config.js . 
COPY ./cypress ./cypress 
RUN npm install &&\
    npx cypress info    
ENTRYPOINT ["npx", "cypress", "run", "--browser","chrome", "--headless"]


