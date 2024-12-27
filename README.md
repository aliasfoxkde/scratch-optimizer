# Scratch Optimizer
![Scratch Optimizer Banner Image](./public/img/banner.png)

<a href="https://scratch-optimizer.cyopsys.com" target="_blank">Scratch Optimizer (WebApp Link)</a>
is a tool designed to clean, refactor, and enhance Scratch (.sb3) projects. It streamlines 
project files by optimizing assets, improving code structure, and removing redundancy, all 
while maintaining compatibility with Scratch’s native environment. This tool is designed to 
enhance your Scratch projects, particularly for use with the 
<a href="https://packager.turbowarp.org" target="_blank">TurboWarp Packager</a>. 
This tool is especially useful if you're preparing your project for publishing as a game 
or for advanced packaging needs.

You are welcome to contribute, make suggestions, provide feedback, or simply use the tool for free. 
The code is licensed under the permissive [MIT License](https://mit-license.org).

## Usage

### Development
1. Clone the repository:
   ```bash
   git clone https://github.com/aliasfoxkde/scratch-optimizer.git
   ```
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
This project is configured for deployment on 
[Cloudflare Pages with Git Integration](https://developers.cloudflare.com/pages/get-started/git-integration):

1. **Log in** to GitHub and Fork [this](https://github.com/aliasfoxkde/scratch-optimizer) repository.
2. **Log in** to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
3. In the **Account Home**, navigate to `Workers & Pages`.
4. **Create a new application**:
   - Click `Create application` → `Pages` → `Connect to Git`.
   - Select your GitHub repository.
5. **Configure your deployment**:
   - Set the `Output build directory` to `public`.
   - Click `Save and Deploy`
6. **Environment variables** (optional):
   - Define any required environment variables for your project under the settings page.
   - This is currently not used but will be in future releases.

## Features
- Fully client-side processing (no server required)
- WAV to MP3 conversion using LameJS
- PNG optimization using Canvas API
- Drag-and-drop file upload
- Dark/light theme support
- Progress tracking and file size comparison
- Support for Cloudflare Pages

## TODO
- [ ] Add Console-looking Progress Bar (with percentage loading bar)
- [ ] Add support for .Sprite files (same structure as SB3 files)
- [ ] Add support for bulk uploads (multiple files)
- [ ] Add ability to fine-tune optimizations (image settings, etc.)
- [ ] Improve PNG optimization for "web"
- [ ] Provide summary with stats on completion
- [ ] Add graphics and improve UI
- [ ] Optimize code base and refactor
- [ ] Debugging and Testing
  - [ ] Add logging wrapper to assist in resolving issues.
  - [ ] Confirm that a vanilla deployment works
- [ ] Options
  - [ ] Add Option tooltips
  - [ ] Add expand/collapse select for options
- [ ] Extensive Testing Needed.
  
## TASKS
- [ ] Implement logic for the various optimizations: 
  - [ ] Optimize Code Blocks
  - [ ] Use AI to Comment Blocks
  - [x] Optimize Assets & Graphics
  - [x] Convert WAV files to MP3
  - [x] Cleanup Project Files
  - [ ] Truncate Comments > 8000 characters
  - [ ] Remove Original Comments 
- [ ] `Cleanup Project files` optional step and would include getting rid of 
      hash filenames and use the actual asset names (this may cause side-effects).
- [ ] Remove dead code blocks
- [ ] Remove instances in project.json where either images or sound do not exist.

## Future Scope
- [ ] Additional Optimizations
  - [ ] Asset Optimization
  - [ ] Advanced Image Optimization (webp support)
  - [ ] Advanced Block Optimization
  - [ ] ID Optimizations (hashes, etc.)
  - [ ] Mutations Optimizations
  - [ ] Optimize SVG Images
  - [ ] Remove Metadata
  - [ ] Remove Redundancy (monitor-value, etc.)
- [ ] Add ability to provide AI API Key (for comments and refactoring)
- [ ] Use Sb3Fix under the hood: https://github.com/TurboWarp/sb3fix
- [ ] Impliment optimizations done in `sb3o` project (and validate)
- [ ] Create analysis report (using Dr. Scratch check + own)
- [ ] Show report (analysis summary with stats)
- [ ] Dr. Scratch under the hood (or equiv. for analysis & reporting)
  - https://www.drscratch.org/
  - https://github.com/jemole/drScratch
- [ ] Convert to JS, refactor (AI), and convert back to blockly format (Scratch).
      The purpose for this would be to optimize the code (reduce redundant blocks and optimize logic).
- [ ] Integrate with CORETEX project (Ultra-small & fast offline AI LLM PWA)

## Q&A:
- [ ] Would it be useful to convert sprites to referenced sprite sheets?

## Bug
- [ ] Error: Cannot read properties of undefined (reading 'async')
- [ ] Error: Can't find end of central directory : is this a zip file ?

## CHANGELOG
- See [CHANGELOG.md](CHANGELOG.md)
