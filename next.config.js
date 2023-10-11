/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        config.experiments.asyncWebAssembly = true

        return config
    },
}

module.exports = nextConfig
