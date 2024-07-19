package utils

import (
	"encoding/base64"
)

func Base64URLEncode(src []byte) string {
	return base64.URLEncoding.EncodeToString(src)
}
