# PLANNING
This is simply a list of brainstormed items to consider implementing in future releases. None of these are
actually being actively developed. As they are, they will be moved to TODO. And many ideas will likely be 
removed or abandoned.

## Project Code and Logic Optimizations
- Merge Similar Scripts: Combine scripts triggered by the same event (e.g., when green flag clicked) into one, 
  ensuring there's no duplicate logic.
- Optimize Nested Loops and Conditions: Flatten deeply nested loops or conditions where possible, and simplify 
  complex logic.
- Consolidate Repeated Code into Custom Blocks: Identify repeated sequences of blocks and convert them into 
  reusable custom blocks to reduce file size and improve maintainability.
- Minimize Broadcasts and Waits: Replace multiple broadcast or wait blocks with a single consolidated trigger 
  where applicable.
- Remove Redundant or Unused Variables: Detect and delete variables that are defined but not used in any script.
- Optimize Large Variables/Lists: Truncate or simplify variables & lists that store unnecessarily large amounts of data.
- Streamline Asset References: Remove unused sprite references or sound file links in scripts to keep the 
  project.json cleaner (and smaller).
- Use AI to Predict Logical Errors: Incorporate basic AI/ML models to detect and suggest fixes for logical errors 
  or inefficiencies in the Scratch project.

## File and Data Optimization
- Compress Large Lists: Replace redundant list data with compact, algorithmically generated equivalents where 
  feasible (e.g., numeric ranges).
- Compress JSON: Minify the project.json file to reduce size (optional for Scratch compatibility, as it can 
  handle unminified files).
- Normalize File Names: Rename files (e.g., images, sounds) to standardized names to improve organization 
  and reduce file path issues.
- Remove Hidden/Deleted Sprites: Detect sprites marked as hidden or unused in the UI and remove them if 
  they're not referenced in any scripts.
- Validate References: Ensure all assets referenced in project.json are available in the project files.

## User Experience Enhancements
- Standardize Comments: Replace long or unclear comments with standardized and concise explanations. 
  Optionally truncate long comments and provide a warning log.
- Auto-Comment Code: Use AI to add meaningful comments to block sequences to make code more readable.
- Generate Documentation: Export an overview of the project’s logic, variables, and assets as a separate 
  documentation file for educational or sharing purposes.
- Visualize Block Flow: Create a block flowchart from the project.json to help users visualize the 
  structure of their scripts.

## Asset Improvements
- Optimize Sprite Size: Detect sprites with excessive resolution and resize them while preserving quality (e.g., 
  reduce unnecessary transparency).
- Convert Vector Graphics: Compress or clean up vector graphics to reduce file size without affecting visual quality.
- Batch Process Similar Sounds: Identify similar or identical sound files across sprites and remove duplicates.
- Remove Empty Costumes and Sounds: Clean up costumes and sound files that contain no data or are placeholders.

## Miscellaneous Improvements
- Compatibility Fixes: Ensure compatibility with Scratch’s latest version and warn about any unsupported 
  features or customizations.
- Performance Benchmarking: Provide an estimated performance improvement summary for users after optimization 
  (e.g., reduction in file size, asset count).
- Backup Project Before Optimization: Create a .bak file for the original project to avoid accidental 
  loss of data during optimization.

## Support Advanced Features
- Add support for converting advanced features (e.g., cloud variables) into, common game features, simplified 
  equivalents for offline compatibility.
- Handle documentation outside of Scratch project (such as in Wiki, GitHub, etc.)

## Additional Suggestions
- Incorporate User Feedback: Allow users to customize which optimization steps to apply through a configuration 
  file or interactive interface.
- Integration with Git or Version Control: Track changes made to projects for easier rollbacks or collaboration.
- Logging Changes: Generate a summary report listing all optimizations performed for transparency.