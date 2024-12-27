# Scratch Optimizer
[Scratch Optimizer (demo)](https://scratch-optimizer.cyopsys.com) is a tool designed to clean, refactor, 
and enhance Scratch (.sb3) projects. It streamlines project files by optimizing assets, improving code 
structure, and removing redundancy, all while maintaining compatibility with Scratch’s native environment. 
This tool is designed to enhance your Scratch projects, particularly for use with the TurboWarp Packager. 
It's especially useful if you're preparing your project for publishing as a game or for advanced packaging 
needs.

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

### Development
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open http://localhost:3000 in your browser

### Production Deployment
The project is configured for deployment on Cloudflare Pages:

1. Fork this repository
2. Log in to Cloudflare Pages
3. Create a new project and connect it to your forked repository
4. Use these build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: 18 (or later)

## Features
- Fully client-side processing - no server required
- WAV to MP3 conversion using lamejs
- PNG optimization using Canvas API
- Drag-and-drop file upload
- Dark/light theme support
- Progress tracking and file size comparison
- Support for Cloudflare Pages

## CHANGELOG
- See [CHANGELOG.md](CHANGELOG.md)
