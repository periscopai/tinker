.PHONY: help

CARGO_MANIFEST=--manifest-path pai-gst-sequencer/Cargo.toml
doc-dir?=
show-doc?=

ifneq ($(doc-dir),)
	_target-dir = --target-dir $(doc-dir)
endif

ifeq ($(show-doc),yes)
	_show-doc = "--open"
endif

help:
	@echo Build system for the periscopai proto
	@echo Targets
	@echo -------
	@echo "setup   - installs the required dependencies"
	@echo "build   - builds the code"
	@echo "run     - builds and runs"
	@echo "doc     - builds documentation and show the output doc-dir=$(doc-dir)"
	@echo "          options:"
	@echo "              doc-dir=<path>    optional - location to store the doc"
	@echo "              show-doc=yes      optional - open doc in browser"
	@echo "test    - runs the test"
	@echo "clean   - cleans the build targets"

.PHONY: setup
setup:
	sudo apt-get install libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev \
	gstreamer1.0-plugins-base gstreamer1.0-plugins-good \
	gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly \
	gstreamer1.0-libav libgstrtspserver-1.0-dev libges-1.0-dev

.PHONY: build
build:
	cargo $@  --verbose ${CARGO_MANIFEST}

.PHONY: run
run:
	cargo $@  --verbose ${CARGO_MANIFEST}

.PHONY: doc
doc:
	cargo  --verbose $@ ${CARGO_MANIFEST} $(_target-dir) $(_show-doc)

.PHONY: test
test:
	cargo  --verbose $@ ${CARGO_MANIFEST}

.PHONY: clean
clean:
	cargo $@ ${CARGO_MANIFEST}	