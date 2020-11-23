module.exports = () => `
import dts from 'rollup-plugin-dts';

const config = [{
  input: 'dist/index.d.ts',
  output: [{ file: 'dist/__spec.d.ts', format: 'es' }],
  plugins: [dts({
    respectExternal: true
  })],
}];

export default config;
`;