
## Getting started
1. `npm install` to install dependencies
2. `npm run dev` to get webpack to listen for code changes build dist/ folder
3. Open Chrome
4. Go to manage extensions
5. Enable developer mode
6. Click load unpacked extension
7. Select the `dist` folder

### Monitoring background processes
1. Go to Manage Extensions
2. Look for the Sustainability Calculator extension card
3. Click on “Inspect views service worker”


## Known Bugs
### Inaccurate recording of data transferred when on website with streaming data (e.g. Youtube with Live Chat)

Partially fixed by the following [PR](https://github.com/Theodo-UK/sustainability-calculator/pull/22).