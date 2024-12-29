## TODO
- [ ] Provide verbose console logging (files optimized, progress, etc.)
- [ ] Add Console-looking Progress Bar (with percentage loading bar)
- [ ] Add support for .Sprite files (same structure as SB3 files)
- [ ] Add support for bulk uploads (multiple files)
- [ ] Add ability to fine-tune optimizations (image settings, etc.)
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
  
## TASKS
- [ ] Implement logic for the various optimizations: 
  - [ ] Optimize Code Blocks
  - [ ] Use AI to Comment Blocks
  - [x] Optimize Assets & Graphics
  - [x] Convert WAV files to MP3
  - [x] Cleanup Project Files
  - [ ] Truncate Comments > 8000 characters
  - [ ] Remove Original Comments 
- [ ] `Cleanup Project files` optional step and would include getting rid of hash filenames and 
      use the actual asset names (this may cause side-effects).
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
- [ ] Production cleanup (split up main.js logic into smaller libraries)
- [ ] Add ability to provide AI API Key (for comments and refactoring)
- [ ] Create Progressive Web Application (PWA)
- [ ] Use Sb3Fix under the hood: https://github.com/TurboWarp/sb3fix
- [ ] Create analysis report (using Dr. Scratch check + own)
- [ ] Show report (analysis summary with stats)
- [ ] Dr. Scratch under the hood (or equiv. for analysis & reporting)
  https://www.drscratch.org/
  https://github.com/jemole/drScratch
- [ ] Convert to JS, refactor (AI), and convert back to blockly format (Scratch).
      The purpose for this would be to optimize the code (reduce redundant blocks and optimize logic).
- [ ] Integrate with CORETEX project (Ultra-small & fast offline AI LLM PWA)

## Q&A:
- [ ] Would it be useful to convert sprites to referenced sprite sheets?

## Bug
- [ ] TBD.