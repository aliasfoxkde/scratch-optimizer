# CHANGELOG

## v0.6.0 - Cleanup
- [x] Improved app for mobile responsiveness
- [x] Split up CSS into separate files
- [x] Cleaned up documentation and tasks
- [x] Cleaned up folder and project structure
- [x] Move CSS and JS files to own directories 
- [x] N/A: Add graphics and improve UI
- [x] Clear/cleanup Uploads folder

## v0.5.4 - Refactoring, PWA, and Bug Fixes
- [x] Cleaned up docs
- [x] Added initial progress bar for file optimization
- [x] Added Progressive Web Application (PWA) Support
- [x] Confirm that a vanilla deployment works
- [x] N/A Due to Cloudflare Pages rework: Clear/cleanup Uploads folder
- [x] Fixed various console bugs (wrong meta tags, icon paths, etc.)
- [x] Fixed "Error: lamejs is not loaded!" in console log resulting in 0kb MP3 files
- [x] Fixed Error: Cannot read properties of undefined (reading 'async')
- [x] Fixed Error: Can't find end of central directory : is this a zip file ?

## v0.4.1 - Architecture Update
- [x] Converted to fully client-side processing
  - [x] Removed server dependencies
  - [x] Implemented browser-based WAV to MP3 conversion using lamejs
  - [x] Added client-side PNG optimization using Canvas API
- [x] Added Cloudflare Pages support
  - [x] Added build configuration
  - [x] Created static deployment setup
- [x] Improved file processing
  - [x] Added progress tracking
  - [x] Enhanced error handling
  - [x] Added file size comparison display
- [x] Removed ffmpeg dependency
- [x] Added drag-and-drop file upload support
- [x] Implement ffmpeg wasm to run client side (reduce server requirements)
- [x] Bug fixes for ffmpeg js module

## v0.3.1 - Feature Improvements & Bug Fixes
- [x] Clear/cleanup Uploads folder (initial: extracted project folder)
- [x] Added Option tooltips (initial)
- [x] Moved downloads to "downloads/" folder
- [x] Fixed some images load in as question marks (conversion issue, project.json, etc.?)

## v0.2.2 - Cleanup and Debugging
- [x] Initial working version with base features.
- [x] Include basic file size details (before and after optimizations)
- [x] Split up files (css, js, etc.)
- [x] Added favicon and shortcut graphics
- [x] Added granular options for greater control (as placeholder for now)
- [x] Added option to clean-up or remove comments (and/or truncate messages > 8000 characters)
- [x] Added placeholders to main page for options
- [x] Added Light/Dark Mode (top right corner toggle)
- [x] Added info/documentation to landing page.
- [x] Added Theme download button.
- [x] Fixed issue where download button was not reflecting filename.
- [x] Fixed various bugs and debugging.

## v0.1.0 - Initial Setup
- [x] Created basic interface with options to upload
- [x] Created folder structure and initial documentation.
- [x] Versioning: Major.Minor.Bug
