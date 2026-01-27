# tcv

[![npm version](https://badge.fury.io/js/tcv.svg)](https://www.npmjs.com/package/tcv)
[![GitHub Sponsor](https://img.shields.io/badge/Sponsor-%E2%9D%A4-red?logo=github)](https://github.com/sponsors/AslouneYahya)

Command-line tool for converting between common data formats. All conversions happen locally.

## Installation

```bash
npm install -g tcv
```

## Commands

### JSON/YAML

```bash
tcv json2yaml config.json
tcv yaml2json config.yaml
echo '{"key":"value"}' | tcv json2yaml
```

### Base64

```bash
tcv base64 encode "text"
tcv base64 decode "dGV4dA=="
```

### Hashing

```bash
tcv hash md5 "text"
tcv hash sha1 "text"
tcv hash sha256 "text"
tcv hash sha512 "text"
```

### Hex/Binary

```bash
tcv hex2bin FF00
tcv bin2hex 11111111
tcv hex2c DEADBEEF
```

### Cron

```bash
tcv cron "0 9 * * 1-5"
# At 09:00 AM, Monday through Friday
```

### JWT

```bash
tcv jwt decode "eyJhbGc..."
```

### URL Encoding

```bash
tcv url encode "hello world"
tcv url decode "hello%20world"
```

### Text

```bash
tcv text upper "hello"     # HELLO
tcv text lower "HELLO"     # hello
tcv text camel "hello world"  # helloWorld
tcv text snake "helloWorld"   # hello_world
tcv text kebab "helloWorld"   # hello-world
tcv text pascal "hello world" # HelloWorld
```

## Options

- `-o, --output <file>` - Save to file
- `-h, --help` - Show help
- `-v, --version` - Show version

## Development

```bash
git clone https://github.com/AslouneYahya/tcv
cd tcv
npm install
npm link
tcv --version
```

## Support

If you find this tool useful, consider sponsoring:

[![GitHub Sponsor](https://img.shields.io/badge/Sponsor_on_GitHub-%E2%9D%A4-red?style=for-the-badge&logo=github)](https://github.com/sponsors/AslouneYahya)

Your support helps maintain and improve this project!

## License

MIT
