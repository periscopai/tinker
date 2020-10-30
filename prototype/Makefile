.PHONY: help

CARGO_MANIFEST=--manifest-path pai-gst-sequencer/Cargo.toml
doc-dir?=
show-doc?=
VENV_DIR=~/venv/periscopai
ACTIVATE=$(VENV_DIR)/bin/activate

ifneq ($(doc-dir),)
	_target-dir = --target-dir $(doc-dir)
endif

ifeq ($(verbose),yes)
	_verbose = "--verbose"
endif

ifeq ($(show-doc),yes)
	_show-doc = "--open"
endif

ifeq ($(CI),true)
	XUNIT_REPORT=-- -Z unstable-options --format json | cargo2junit | tee results.xml
	PIP=pip3
	MATURIN=maturin
	PYTEST=pytest
else
	PYTHON=$(VENV_DIR)/bin/python3.6
	PIP=$(PYTHON) -m pip 
	PYTEST=$(VENV_DIR)/bin/pytest
	MATURIN=$(VENV_DIR)/bin/maturin
endif

help:
	@echo BUILD SYSTEM FOR THE PERISCOPAI PROTO
	@echo
	@echo Global Options:
	@echo
	@echo "    verbose=yes - turns verbosity a notch"
	@echo
	@echo Targets
	@echo -------
	@echo "setup    - installs the required dependencies"
	@echo "precheck - format, build and test the code prior to checkin"
	@echo "pytest   - sets the library in develop mode and runs pytest against it"
	@echo "develop  - sets the library in develop mode"
	@echo "build    - builds the code"
	@echo "run      - builds and runs"
	@echo "fmt      - reformat code ... similar to Python black"
	@echo "doc      - builds documentation and show the output doc-dir=$(doc-dir)"
	@echo "           options:"
	@echo "              doc-dir=<path>    optional - location to store the doc"
	@echo "              show-doc=yes      optional - open doc in browser"
	@echo "test     - runs the test"
	@echo "clean    - cleans the build targets"
	@echo "server   - start the fastapi server"
	@echo "VENV_DIR=$(VENV_DIR)"

.PHONY: setup
setup:
	sudo apt-get install libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev \
	gstreamer1.0-plugins-base gstreamer1.0-plugins-good \
	gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly \
	gstreamer1.0-libav libgstrtspserver-1.0-dev libges-1.0-dev \
	python3-dev python-dev python3.8-dev python3-venv
ifeq ($(CI),true)	
	@echo "Skipping virtual env creation in CI"
else
	python3.6 -m venv $(VENV_DIR)
endif
	$(PIP) install -U pip setuptools
	$(PIP) install maturin pytest tox
	$(PIP) install -r requirements.txt
ifneq ($(CI),true)	
	@echo "******************** RUN THE FOLLOWING COMMAND ********************"
	@echo "source $(ACTIVATE)"
	@echo "*******************************************************************"
endif

.PHONY: build
build:
	cargo $@  $(_verbose) ${CARGO_MANIFEST}


.PHONY: fmt
fmt:
	cargo $@  $(_verbose) ${CARGO_MANIFEST}

.PHONY: run
run:
	cargo $@  $(_verbose) ${CARGO_MANIFEST}

.PHONY: doc
doc:
	cargo  $(_verbose) $@ ${CARGO_MANIFEST} $(_target-dir) $(_show-doc)

.PHONY: test
test:
	cargo  $(_verbose) $@ ${CARGO_MANIFEST} $(XUNIT_REPORT)

.PHONY: clean
clean:
	cargo $@ ${CARGO_MANIFEST}	

.PHONY: precheck
precheck: clean fmt pytest doc
	git status

.PHONY: python
python:
	maturin build --skip-auditwheel -b pyo3 -m pai-gst-sequencer/Cargo.toml

.PHONY: develop
develop:
	$(MATURIN) develop -b pyo3 --manifest-path pai-gst-sequencer/Cargo.toml

.PHONY: pytest
pytest: 
	tox

.PHONY: server
server: develop
	firefox http://127.0.0.1:8000/docs&
	$(PYTHON) backend/main.py
	


