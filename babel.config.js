module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver', 
        {
          root: ['./src'],
          alias: {
            '@routes': './src/routes',
            '@pages': './src/pages',
            '@components': './src/components',
            '@assets': './src/assets',
            '@storage': './src/storage',
            '@utils': './src/utils',
            '@services': './src/services',
            '@global': './src/global',
            '@contexts': './src/contexts',
            '@hooks': './src/hooks',
            '@dtos': './src/dtos',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
