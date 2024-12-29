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