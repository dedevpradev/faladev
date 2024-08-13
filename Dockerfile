FROM golang:1.21-alpine

RUN go install github.com/cespare/reflex@latest
RUN go install github.com/go-delve/delve/cmd/dlv@latest

WORKDIR /app

COPY ./backend/go.mod ./backend/go.sum ./
RUN go mod download
COPY ./backend .

COPY entrypoint.sh .

RUN chmod +x entrypoint.sh && rm -rf /var/cache/apk/*

ENTRYPOINT ["/app/entrypoint.sh"]