GOCMD=go
GOINSTALL=$(GOCMD) install
CURL=curl

.PHONY: all
all: install
.PHONY: install
install: install-swagger install-golangci install-gofumpt install-mockery
.PHONY: install-swagger
install-swagger:
	$(GOINSTALL) github.com/swaggo/swag/cmd/swag@v1.16.3
.PHONY: install-golangci
install-golangci:
	$(CURL) -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(GOENVPATH) v1.61.0
.PHONY: install-gofumpt
install-gofumpt:
	$(GOINSTALL) mvdan.cc/gofumpt@latest
.PHONY: install-mockery
install-mockery:
	$(GOINSTALL) github.com/vektra/mockery/v2@v2.30.1
.PHONY: install-deadcode
install-deadcode:
	$(GOINSTALL) golang.org/x/tools/cmd/deadcode@latest