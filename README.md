# Scratch Optimizer
Scratch Optimizer is a tool designed to clean, refactor, and enhance Scratch (.sb3) projects. It streamlines 
project files by optimizing assets, improving code structure, and removing redundancy, all while maintaining 
compatibility with Scratch’s native environment. This tool is designed to enhance your Scratch projects, 
particularly for use with the TurboWarp Packager. It's especially useful if you're preparing your project 
for publishing as a game or for advanced packaging needs.

You are welcome to contribute, make suggestions, provide feedback, or simply use the tool for free. 
The code is licensed under the permissive MIT License.

## TODO
- [ ] Add Console-looking Progress Bar (with percentage loading bar)
- [ ] Add support for .Sprite files (same structure as SB3 files)
- [ ] Add support for bulk uploads (multiple files) 
- [ ] Improve PNG optimization for "web"
- [ ] Provide summary with stats on completion
- [ ] Add graphics and improve UI
- [ ] Optimize code base and refactor
- [ ] Clear/cleanup Uploads folder
- [ ] Debugging and Testing
  - [ ] Add logging wrapper to assist in resolving issues.
  - [ ] Confirm that a vanilla deployment works
- [ ] Options
  - [ ] Add Option tooltips
  - [ ] Add expand/collapse select for options
- [ ] Extensive Testing Needed.
  
## TBD
- [ ] Implement logic for the various optimizations: 
  - [ ] Optimize Code Blocks
  - [ ] Use AI to Comment Blocks
  - [x] Optimize Assets & Graphics
  - [x] Convert WAV files to MP3
  - [x] Cleanup Project Files
  - [ ] Truncate Comments > 8000 characters
  - [ ] Remove Original Comments 
- [ ] Cleanup Project files is optional and would include getting rid of hash filenames and 
      use the actual asset names (this may cause side-effects).
- [ ] Remove dead code blocks
- [ ] Convert to JS, refactor (AI), and convert back to blockly format (Scratch).
      The purpose for this would be to optimize the code (reduce redundant blocks and optimize logic).
- [ ] Remove instances in project.json where either images or sound do not exist.

## Future Scope
- [ ] Add logic to optimize SVG images (if applicable)
- [ ] Create Progressive Web Application (PWA)
- [ ] Implement ffmpeg wasm to run client side (reduce server requirements)
  npm install @ffmpeg/ffmpeg @ffmpeg/util
- [ ] Make it so that this app can be deployed with GitHub/Cloudflare Pages (as client side PWA)
- [ ] Use Sb3Fix under the hood:
  https://github.com/TurboWarp/sb3fix
- [ ] Create analysis report (using Dr. Scratch check + own)
- [ ] Show report (analysis summary with stats)
- [ ] Dr. Scratch under the hood (or equiv. for analysis & reporting)
  https://www.drscratch.org/
  https://github.com/jemole/drScratch
- [ ] Integrate with CORETEX project (Ultra-small & fast offline AI LLM PWA)

## Q&A:
- [ ] Would it be useful to convert sprites to referenced sprite sheets?

## Bug

## Usage
- `npm install`
- `node server.js`

## Troubleshooting
If you get an error `SELF_SIGNED_CERT_IN_CHAIN`, you are missing a signed certificate. For development, you can 
work around this by disabling Authentication checks:

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

## CHANGELOG
- See [CHANGELOG.md](CHANGELOG.md)