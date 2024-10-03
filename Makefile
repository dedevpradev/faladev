run:
	@go run cmd/api/main.go

test:
	@go test -v ./...

testCover:
	@go test -v ./... -cover

dockerUp:
	@docker-compose up -d

dockerDown:
	@docker-compose down --rmi all

dockerPrune:
	@docker system prune -a --volumes
swag:
	@go install github.com/swaggo/swag/cmd/swag@latest
