
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

## Architecture
![image](https://github.com/Theodo-UK/sustainability-calculator/assets/57725347/08e13bb7-7a71-48d5-81df-e64b3a07a2e6)

## Known Bugs
### Inaccurate recording of data transferred on some websites
```
Github super accurate
Stack overflow super accurate
Theodo -4% error 
Youtube pretty accurate
Trello -13% error
```
- The image below shows logic used by Chrome DevTools to mutate the amount of bytes transferred (transferSize).
- The current implementation only uses onLoadingFinished to add to the number of bytes.
- The actual implementation in [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) tracks a list of requests, and sometimes adds or sets transferSize depending on the event.
- To fix this bug, need to first replicate logic from Chrome DevTools (start from this [commit](https://github.com/Theodo-UK/sustainability-calculator/pull/44/commits/a1da0aac31f95621b8fd49ca1f56d25d894633f7))


![image](https://github.com/Theodo-UK/sustainability-calculator/assets/57725347/5cecef6c-67b7-4d44-983a-0be79c765ece)

## Note
- background has a different environment from popup, scope is not shared
