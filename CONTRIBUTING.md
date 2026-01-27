# Contributing

## Setup

```bash
git clone https://github.com/AslouneYahya/tcv
cd tcv
npm install
npm link
```

## Testing

```bash
tcv json2yaml test.json
tcv hash sha256 "test"
```

## Adding Features

1. Add function to `lib/converters.js`
2. Add command to `bin/tcv.js`
3. Update README
4. Test locally

## Pull Requests

- Keep changes focused
- Update documentation
- Test before submitting
