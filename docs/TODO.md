## TODO
- [ ] Improve summary block to include better progress bar
- [ ] Provide verbose console logging (files optimized, progress, etc.)
- [ ] Add Console-looking Progress Bar (with percentage loading bar)
- [ ] Add support for .Sprite files (same structure as SB3 files)
- [ ] Add support for bulk uploads (multiple files)
- [ ] Add ability to fine-tune optimizations (image settings, etc.)
- [ ] Improve PNG optimization for "web"
- [ ] Provide summary with stats on completion
- [ ] Optimize code base and refactor
- [ ] Debugging and Testing
  - [ ] Add logging wrapper to assist in resolving issues.
  - [ ] Add verbose processing of files in progress bar
  - [ ] Added verbose console logging (files optimized, progress, etc.)
- [ ] Options
  - [ ] Add Option tooltips
  - [ ] Add expand/collapse select for options
- [ ] Extensive Testing Needed.
  
## TASKS
- [ ] Implement logic for the various optimizations: 
  - [ ] Auto Comment Blocks (uses AI) 
  - [x] Optimize Assets & Graphics
  - [x] Convert WAV files to MP3
  - [x] Cleanup Project Files
  - [ ] Truncate Comments > 8000 characters
  - [ ] Optimize Code Blocks (Beta)
  - [ ] Remove All Comments (Beta) 
- [ ] `Cleanup Project files` optional step and would include getting rid of hash filenames and 
      use the actual asset names (this may cause side-effects).
- [ ] Remove dead code blocks
- [ ] Remove instances in project.json where either images or sound do not exist.

## Future Scope
- [ ] Additional Optimizations
  - [ ] Asset Optimization
  - [ ] Advanced Image Optimization (WebP support)
  - [ ] Advanced Block Optimization
  - [ ] ID Optimizations (hashes, etc.)
  - [ ] Mutations Optimizations
  - [ ] Optimize SVG Images
  - [ ] Remove Metadata
  - [ ] Remove Redundancy (monitor-value, etc.)
- [ ] Production Improvements
  - [ ] Split up main.js logic into smaller libraries
  - [ ] Create build step to compile/optimize into static package
  - [ ] Build in CI/CD pipeline (auto linting, etc.)
  - [ ] Consider replacing `npm` with `pnpm`
- [ ] Add ability to provide AI API Key (for comments and refactoring)
- [ ] Use Sb3Fix under the hood: https://github.com/TurboWarp/sb3fix
- [ ] Use sb3o under the hood: https://github.com/GarboMuffin/sb3o
- [ ] Create analysis report (using Dr. Scratch check + own)
- [ ] Show report (analysis summary with stats)
- [ ] [Dr. Scratch](https://www.drscratch.org) under the hood (or equiv. for analysis & reporting)
- [ ] Convert to JS, refactor (AI), and convert back to blockly format (Scratch).
      The purpose for this would be to optimize the code (reduce redundant blocks and optimize logic).
- [ ] Integrate with CORETEX project (Ultra-small & fast offline AI LLM PWA)

## Q&A:
- [ ] Would it be useful to convert sprites to referenced sprite sheets?

## Bug
- [ ] Unchecking boxes do not appear to be affecting the output.
