GOCMD=go
GOTEST=$(GOCMD) test
GOCLEAN=$(GOCMD) clean
GOMOD=$(GOCMD) mod
GOLINT_CMD=golangci-lint
GOLINT_BASE_RUN=$(GOLINT_CMD) run
GOLINT_RUN=$(GOLINT_BASE_RUN)
BINARY_DIR=bin
DEADCODE_RUN=deadcode ./...

.PHONY: deps
deps:
	$(GOMOD) tidy
	$(GOMOD) vendor
.PHONY: lint
lint:
	make -f tools/Makefile install-golangci
	$(GOLINT_RUN)

.PHONY: lint-fix
lint-fix:
	$(GOLINT_RUN) --fix
.PHONY: clean
clean:
	rm -rf $(BINARY_DIR)
	$(GOCLEAN) -cache -modcache # optional
.PHONY: tools
tools:
	make -f tools/Makefile
.PHONY: format
format:
	make -f tools/Makefile install-gofumpt
	gofumpt -l -w .

.PHONY: mock
mock:
	make -f tools/Makefile install-mockery
	go generate
.PHONY: deadcode
deadcode:
	make -f tools/Makefile install-deadcode
	$(DEADCODE_RUN)