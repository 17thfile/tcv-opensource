const yaml = require('js-yaml');
const cronstrue = require('cronstrue');
const crypto = require('crypto');

// JSON/YAML Converters
function jsonToYaml(jsonStr) {
  const obj = JSON.parse(jsonStr);
  return yaml.dump(obj);
}

function yamlToJson(yamlStr) {
  const obj = yaml.load(yamlStr);
  return JSON.stringify(obj, null, 2);
}

// Base64
function encodeBase64(text) {
  return Buffer.from(text, 'utf-8').toString('base64');
}

function decodeBase64(base64) {
  return Buffer.from(base64, 'base64').toString('utf-8');
}

// Hash generators
async function generateHash(text, algorithm) {
  const validAlgorithms = ['md5', 'sha1', 'sha256', 'sha512'];
  const alg = algorithm.toLowerCase();
  
  if (!validAlgorithms.includes(alg)) {
    throw new Error(`Invalid algorithm. Use: ${validAlgorithms.join(', ')}`);
  }
  
  return crypto.createHash(alg).update(text).digest('hex');
}

// Hex/Binary converters
function hexToBinary(hex) {
  hex = hex.replace(/[^0-9A-Fa-f]/g, '');
  return hex.split('').map(h => parseInt(h, 16).toString(2).padStart(4, '0')).join(' ');
}

function binaryToHex(binary) {
  binary = binary.replace(/[^01]/g, '');
  let hex = '';
  for (let i = 0; i < binary.length; i += 4) {
    const chunk = binary.substr(i, 4).padEnd(4, '0');
    hex += parseInt(chunk, 2).toString(16).toUpperCase();
  }
  return hex;
}

function hexToCArray(hex) {
  hex = hex.replace(/[^0-9A-Fa-f]/g, '');
  let result = 'const unsigned char data[] = {\n  ';
  for (let i = 0; i < hex.length; i += 2) {
    if (i > 0 && i % 24 === 0) result += '\n  ';
    result += '0x' + hex.substr(i, 2).toUpperCase();
    if (i < hex.length - 2) result += ', ';
  }
  result += '\n};';
  return result;
}

// Cron
function cronToHuman(cronExpr) {
  try {
    return cronstrue.toString(cronExpr);
  } catch (e) {
    throw new Error('Invalid cron expression: ' + e.message);
  }
}

// JWT
function decodeJWT(jwt) {
  const parts = jwt.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT format');
  
  const header = JSON.parse(Buffer.from(parts[0], 'base64').toString());
  const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
  
  return JSON.stringify({
    header,
    payload,
    signature: parts[2]
  }, null, 2);
}

function encodeJWT(jsonStr) {
  try {
    const data = JSON.parse(jsonStr);
    const header = data.header || { alg: 'HS256', typ: 'JWT' };
    const payload = data.payload || data;
    
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64')
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    
    return `${encodedHeader}.${encodedPayload}.\n\nNote: This is an unsigned JWT. For production use, add a secret key.`;
  } catch (e) {
    throw new Error('Invalid JSON format: ' + e.message);
  }
}

// URL Encode/Decode
function encodeURL(text) {
  return encodeURIComponent(text);
}

function decodeURL(text) {
  return decodeURIComponent(text);
}

// Text case converters
function toUpperCase(text) {
  return text.toUpperCase();
}

function toLowerCase(text) {
  return text.toLowerCase();
}

function toCamelCase(text) {
  const words = text.split(/[\s_-]+/);
  return words[0].toLowerCase() + words.slice(1).map(w => 
    w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
  ).join('');
}

function toSnakeCase(text) {
  return text.replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

function toKebabCase(text) {
  return text.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function toPascalCase(text) {
  const words = text.split(/[\s_-]+/);
  return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

module.exports = {
  jsonToYaml,
  yamlToJson,
  encodeBase64,
  decodeBase64,
  generateHash,
  hexToBinary,
  binaryToHex,
  hexToCArray,
  cronToHuman,
  decodeJWT,
  encodeJWT,
  encodeURL,
  decodeURL,
  toUpperCase,
  toLowerCase,
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  toPascalCase
};
