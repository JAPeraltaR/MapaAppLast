const { writeFileSync, mkdirSync } = require('fs');
const dotenv = require('dotenv').config();

const envsApp = Object.entries(dotenv.parsed).map( ([key , value]) => `  ${key}: '${value}',`).join('\n')

const target='./src/app/environments'
const contentenv=`
export const environments = {
${envsApp}
}
`;

mkdirSync(target,{recursive: true});
writeFileSync(`${target}/environments.ts`, contentenv);

const env_template = Object.keys(dotenv.parsed).map( key => `${key}=` ).join('\n');
writeFileSync('./.env.template', env_template);
