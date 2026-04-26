VIDEO_URL := https://www.youtube.com/watch?v=fvGYKZqks90
LANG := uk
DATE := $(shell date +%Y-%m-%d)
OUTPUT := subtitles-$(DATE)

.PHONY: subtitles clean

subtitles:
	yt-dlp \
		--skip-download \
		--write-auto-subs \
		--sub-lang $(LANG) \
		--convert-subs srt \
		-o "$(OUTPUT).%(ext)s" \
		"$(VIDEO_URL)"
	mv "$(OUTPUT).$(LANG).srt" "$(OUTPUT).srt"

clean:
	rm -f subtitles-*.srt