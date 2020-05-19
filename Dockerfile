FROM node:13-alpine AS build_typescript
WORKDIR /usr/src/app
# Copy over dependency list
COPY package*.json ./
# Install dependencies need to buid app
RUN npm ci
# Copy source to container
COPY . .
# Build app (Convert typescript to javascript)
RUN npm run build


FROM node:13-alpine as build_runner
WORKDIR /usr/src/app
# Copy over dependencies
COPY package*.json ./
# Install non-build dependencies
RUN npm ci --only=production
# Copy over javascript code
COPY --from=build_typescript /usr/src/app/dist ./dist


FROM node:13-alpine as runner
WORKDIR /usr/src/app
COPY --from=build_runner /usr/src/app .
EXPOSE 3000
CMD ["node", "dist/main"]
