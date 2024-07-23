FROM node:20-alpine as frontend

WORKDIR /app
COPY ./frontend .
RUN npm install
RUN npm run build

FROM golang:1.21

RUN go install github.com/cespare/reflex@latest
RUN go install github.com/go-delve/delve/cmd/dlv@latest

WORKDIR /app

COPY ./backend/go.mod ./backend/go.sum ./
RUN go mod download
COPY ./backend .

COPY --from=frontend /app/.next ./frontend/.next

COPY entrypoint.sh /app/

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]