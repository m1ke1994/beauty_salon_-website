FROM node:20-bullseye

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund \
    && mkdir -p /opt/node_modules \
    && cp -a node_modules/. /opt/node_modules/

ENV CHOKIDAR_USEPOLLING=true
ENV NODE_ENV=development

CMD ["sh", "-lc", "if [ ! -f node_modules/.bin/vite ]; then mkdir -p node_modules; cp -a /opt/node_modules/. node_modules/; fi; npm run dev -- --host 0.0.0.0 --port 5173"]
