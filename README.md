# Scratch Optimizer
SB3 Optimizer Webapp for Scratch.

## TODO
- Add Console-looking Progress Bar (with percentage loading bar)
- Improve PNG optimization for "web"
- Provide summary with stats on completion
- Theme download button
- Add graphics and improve UI
- Optimize code base and refactor
- Add option to cleanup or remove comments (and/or truncate messages > 8000 characters)
  Note: this can resolve conflicts between legacy SB2 and SB3 formats.
  
## TBD
- Add granular options for greater control
  - [ ] Optimize Code Blocks
  - [ ] Optimize Assets & Graphics
  - [ ] Convert WAV to MP3
  - [ ] Cleanup Project Files
  - [ ] Truncate Comments > 8000 characters.
- Cleanup Project files is optional and would include get rid of hash filenames and 
  use the actual asset names (this may cause side-effects).
- Remove dead code blocks
- Convert to JS, refactor (AI), and convert back to blockly format (Scratch).
  The purpose for this would be to optimize the code (reduce redundant blocks and optimize logic).
- Create analysis report (using Dr. Scratch check + own)
- Show report (analysis summary with stats)
- TBD: Convert sprites to sprite sheets?
- Add placeholders to main page for options
- Add info/documentation to landing page

## Done
- Split up files (css, js, etc.)
- Added favicon and shortcut graphics

## Future Scope
- Create Progressive Web Application (PWA)
- Impliment ffmpeg wasm to run client side (reduce server requirements)
  npm install @ffmpeg/ffmpeg @ffmpeg/util
- Make it so that this app can be deployed with GitHub/Cloudflare Pages (as client side PWA)
- Use sb3fix under the hood:
  https://github.com/TurboWarp/sb3fix
- Dr. Scratch under the hood (or equiv. for analysis & reporting)
  https://www.drscratch.org/
  https://github.com/jemole/drScratch

## Bug
- Remove instances in project.json where either images or sound do not exist.

## Usage
- `npm install`
- `node server.js`

## Troubleshooting
If you get an error `SELF_SIGNED_CERT_IN_CHAIN`, you are missing a signed certificate. For development, you can workaround this by disabling Authentication checks:

- Disable certificate validation (for dev purposes only)
  `set NODE_TLS_REJECT_UNAUTHORIZED=0`

- Clean npm cache to avoid reusing any faulty cache
  `npm cache clean --force`

- Set npm registry to HTTP (in case HTTPS is causing issues)
  `npm config set registry http://registry.npmjs.org/`

- Disable strict SSL checks
  `npm config set strict-ssl false`

- Install Yarn (if not already installed)
  `npm install -g yarn`

- Change Yarn registry to npm's official registry
  `yarn config set registry https://registry.npmjs.org/`

- Run Yarn install
  `yarn install`

## Alternative Method
- Go through the steps to generating a certificate and assigning it to npm.
- Set the certificate path (replace with your actual path):
  `npm config set cafile "path/to/your/certificate.pem"`