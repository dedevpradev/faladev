
dockerUp:
	@docker-compose up -d

dockerDown:
	@docker-compose down --rmi all

dockerPrune:
	@docker system prune -a --volumes
