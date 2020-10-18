.PHONY: help

CARGO_MANIFEST=--manifest-path pai-gst-sequencer/Cargo.toml

help:
	@echo Targets
	@echo -------
	@echo build - builds the code
	@echo run - builds and runs
	@echo doc - builds documentation and show the output
	@echo test - runs the test 
	@echo clean - cleans the build targets

.PHONY: build
build:
	cargo $@ ${CARGO_MANIFEST}

.PHONY: run
run:
	cargo $@ ${CARGO_MANIFEST}

.PHONY: doc
doc:
	cargo $@ ${CARGO_MANIFEST} --open

.PHONY: test
test:
	cargo $@ ${CARGO_MANIFEST}

.PHONY: clean
clean:
	cargo $@ ${CARGO_MANIFEST}	