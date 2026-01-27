#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const converters = require('../lib/converters');

program
  .name('tcv')
  .description('TechConverter CLI - Convert JSON, YAML, Base64, Hex, and more')
  .version('1.0.0');

// Helper to read input (file or stdin)
function getInput(fileOrText) {
  if (!fileOrText) {
    // Read from stdin
    return fs.readFileSync(0, 'utf-8');
  }
  
  // Check if it's a file
  if (fs.existsSync(fileOrText)) {
    return fs.readFileSync(fileOrText, 'utf-8');
  }
  
  // Otherwise treat as direct text
  return fileOrText;
}

// Helper to write output
function writeOutput(data, options) {
  if (options.output) {
    fs.writeFileSync(options.output, data);
    console.log(`✓ Output written to ${options.output}`);
  } else {
    console.log(data);
  }
}

// JSON to YAML
program
  .command('json2yaml [input]')
  .description('Convert JSON to YAML')
  .option('-o, --output <file>', 'Output file')
  .action((input, options) => {
    try {
      const data = getInput(input);
      const result = converters.jsonToYaml(data);
      writeOutput(result, options);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// YAML to JSON
program
  .command('yaml2json [input]')
  .description('Convert YAML to JSON')
  .option('-o, --output <file>', 'Output file')
  .action((input, options) => {
    try {
      const data = getInput(input);
      const result = converters.yamlToJson(data);
      writeOutput(result, options);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// Base64
program
  .command('base64 <operation> [input]')
  .description('Base64 encode/decode')
  .option('-o, --output <file>', 'Output file')
  .action((operation, input, options) => {
    try {
      const data = getInput(input);
      const result = operation === 'encode' 
        ? converters.encodeBase64(data.trim())
        : converters.decodeBase64(data.trim());
      writeOutput(result, options);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// Hash
program
  .command('hash <algorithm> [input]')
  .description('Generate hash (md5, sha1, sha256, sha512)')
  .option('-o, --output <file>', 'Output file')
  .action(async (algorithm, input, options) => {
    try {
      const data = getInput(input);
      const result = await converters.generateHash(data.trim(), algorithm);
      writeOutput(result, options);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// Hex to Binary
program
  .command('hex2bin <hex>')
  .description('Convert Hex to Binary')
  .option('-o, --output <file>', 'Output file')
  .action((hex, options) => {
    try {
      const result = converters.hexToBinary(hex);
      writeOutput(result, options);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// Binary to Hex
program
  .command('bin2hex <binary>')
  .description('Convert Binary to Hex')
  .option('-o, --output <file>', 'Output file')
  .action((binary, options) => {
    try {
      const result = converters.binaryToHex(binary);
      writeOutput(result, options);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// Hex to C-Array
program
  .command('hex2c <hex>')
  .description('Convert Hex to C-Array')
  .option('-o, --output <file>', 'Output file')
  .action((hex, options) => {
    try {
      const result = converters.hexToCArray(hex);
      writeOutput(result, options);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// Cron
program
  .command('cron <expression>')
  .description('Decode cron expression to human readable')
  .action((expression) => {
    try {
      const result = converters.cronToHuman(expression);
      console.log(result);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// JWT
program
  .command('jwt <operation> [input]')
  .description('JWT decode/encode')
  .option('-o, --output <file>', 'Output file')
  .action((operation, input, options) => {
    try {
      const data = getInput(input);
      const result = operation === 'decode'
        ? converters.decodeJWT(data.trim())
        : converters.encodeJWT(data.trim());
      writeOutput(result, options);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// URL Encode/Decode
program
  .command('url <operation> [input]')
  .description('URL encode/decode')
  .option('-o, --output <file>', 'Output file')
  .action((operation, input, options) => {
    try {
      const data = getInput(input);
      const result = operation === 'encode'
        ? converters.encodeURL(data.trim())
        : converters.decodeURL(data.trim());
      writeOutput(result, options);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// Text transformations
program
  .command('text <operation> [input]')
  .description('Text transformations (upper, lower, camel, snake, kebab, pascal)')
  .option('-o, --output <file>', 'Output file')
  .action((operation, input, options) => {
    try {
      const data = getInput(input);
      let result;
      
      switch(operation) {
        case 'upper': result = converters.toUpperCase(data.trim()); break;
        case 'lower': result = converters.toLowerCase(data.trim()); break;
        case 'camel': result = converters.toCamelCase(data.trim()); break;
        case 'snake': result = converters.toSnakeCase(data.trim()); break;
        case 'kebab': result = converters.toKebabCase(data.trim()); break;
        case 'pascal': result = converters.toPascalCase(data.trim()); break;
        default: throw new Error(`Unknown operation: ${operation}`);
      }
      
      writeOutput(result, options);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse();
