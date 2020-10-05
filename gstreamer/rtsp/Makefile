debug?=false
SOURCE=gst-rtsp.c
GCC_DEBUG_FLAG=
ifeq ($(strip $(debug)),true)
	TARGET_DIR=target/debug
	GCC_DEBUG_FLAG=-g
else
	TARGET_DIR=target/rls
endif

TARGET=$(TARGET_DIR)/$(basename $(SOURCE))


.PHONY: build
build: env
	@echo type make debug=true to build in debug mode
	gcc $(GCC_DEBUG_FLAG) $(SOURCE) -o $(TARGET) `pkg-config --cflags --libs gstreamer-1.0`

.PHONY: run
run: build
	@echo running $(TARGET)
	$(TARGET)

.PHONY: env
env:
	- mkdir -p $(TARGET_DIR)

.PHONY: clean
clean:
	- rm -rf $(TARGET_DIR)

.PHONY: dump
dump:
	@echo All Make Variables
	$(foreach v, $(.VARIABLES), $(info $(v) = $($(v))))
