SRC = $(wildcard src/*/*.js)
HTML = $(wildcard src/*/*.html)
TEMPLATES = $(HTML:.html=.js)

build: components $(SRC) $(TEMPLATES)
	@component build

components: component.json
	@component install

%.js: %.html
	@component convert $<

clean:
	rm -fr build components $(TEMPLATES)

.PHONY: clean