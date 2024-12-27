# CHANGELOG

## v0.4.1 - Architecture Update
- [x] Converted to fully client-side processing
  - Removed server dependencies
  - Implemented browser-based WAV to MP3 conversion using lamejs
  - Added client-side PNG optimization using Canvas API
- [x] Added Cloudflare Pages support
  - Added build configuration
  - Created static deployment setup
- [x] Improved file processing
  - Added progress tracking
  - Enhanced error handling
  - Added file size comparison display
- [x] Removed ffmpeg dependency
- [x] Added drag-and-drop file upload support
- [x] Implement ffmpeg wasm to run client side (reduce server requirements)
- [x] Bug fixes for ffmpeg js module

## v0.3.1 - Feature Improvements & Bug Fixes
- [x] Add Option tooltips (initial)
- [x] Move downloads to "downloads/" folder
- [x] Clear/cleanup Uploads folder (initial: extracted project folder)
- [x] Fixed: some images load in as question marks (conversion issue, project.json, etc.?)

## v0.2.2 - Cleanup and Debugging
- [x] Initial working version with base features.
- [x] Include basic file size details (before and after optimizations)
- [x] Split up files (css, js, etc.)
- [x] Added favicon and shortcut graphics
- [x] Add granular options for greater control (as placeholder for now)
- [x] Add option to clean-up or remove comments (and/or truncate messages > 8000 characters)
- [x] Add placeholders to main page for options
- [x] Add Light/Dark Mode (top right corner toggle)
- [x] Add info/documentation to landing page.
- [x] Theme download button.
- [x] Fix issue where download button was not reflecting filename.
- [x] Resolved various bugs and debugging.

## v0.1.0 - Initial Setup
- [x] Created basic interface with options to upload
- [x] Created folder structure and initial documentation.
- [x] Versioning: Major.Minor.Bug
