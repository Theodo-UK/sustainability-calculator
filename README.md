
## Getting started
1. `npm install` to install dependencies
2. `npm run dev` to get webpack to listen for code changes build dist/ folder
3. Open Chrome
4. Go to manage extensions
5. Enable developer mode
6. Click load unpacked extension
7. Select the `dist` folder

## Architecture
![archi](https://github.com/Theodo-UK/sustainability-calculator/assets/57725347/388ddfab-c458-4063-8373-d02cf86dfa71)

The codebase is structured into 3 layers:
- View Layer, e.g. `Foo.tsx`

- View Model Layer, e.g. `useFoo.ts`
- Data Layer, e.g. `FooRepository.ts`
  - Accesses data from external data sources, e.g. chrome.local.storage

It should be noted that there are 2 environments:
- Popup environment
  - popup.tsx is the entry point for what is displayed in the extension, and runs in this environment
    - when the chrome extension is closed, the popup.tsx environment is destroyed
- Background environment
  - background.ts is the entry point for the background processes, and runs in this environment
    - when the chrome extension is closed, the background.ts environment persists
    - BytesRepository, which records the amount of data transferred, is only accessed from background.ts so that it can record data transferred even when the extension is closed. 
      - BytesRepository should not be accessed from the popup environment

Communication between the popup and background environment should only be done through chrome.runtime.sendMessage

### Repository Pattern
The [repository pattern](https://developer.android.com/topic/architecture/data-layer#architecture) is used in the data layer of this project, and acts as the [Single Source of Truth](https://developer.android.com/topic/architecture/data-layer#source-of-truth) 

Repositories
- are singletons
- do not hold state
- interface with external data sources

- StorageRepository 
  - is used as the interface between the Chrome local storage (chrome.local.storage) 
  - prevents concurrency through an underlying mutex function (in StorageRemoteDataSource)

- All the other Repositories access StorageRepository, and provide runtime type safety before data is used by the View Model and View layers of the app 


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

## Dev Notes
### Monitoring background processes
1. Go to Manage Extensions
2. Look for the Sustainability Calculator extension card
3. Click on “Inspect views service worker”

### Clearing chrome.local.storage
- When improperly formatted data has been written to storage, the extension will not work properly. 
- To fix this, remove the extension and reinstall it
