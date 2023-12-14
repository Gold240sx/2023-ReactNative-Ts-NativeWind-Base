const { getDefaultConfig } = require("expo/metro-config")

const config = getDefaultConfig(__dirname)

config.resolver.assetExts.push(
	//adds support for '.lottie' files
	"lottie"
)

module.exports = config
