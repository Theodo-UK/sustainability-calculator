/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./src/background.jsx ***!
  \****************************/
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.command === "getTransferSize") {
    var tabId = message.tabId;
    chrome.webRequest.onCompleted.addListener(function (details) {
      if (details.tabId === tabId) {
        var headers = details.responseHeaders;
        var transferSizeHeader = headers.find(function (header) {
          return header.name.toLowerCase() === "content-length";
        });
        if (transferSizeHeader) {
          var transferSize = parseInt(transferSizeHeader.value, 10);
          chrome.runtime.sendMessage({
            transferSize: transferSize
          });
        }
      }
    }, {
      urls: ["<all_urls>"],
      tabId: tabId
    }, ["responseHeaders"]);
  }
  return true;
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBQSxNQUFNLENBQUNDLE9BQU8sQ0FBQ0MsU0FBUyxDQUFDQyxXQUFXLENBQUMsVUFBQ0MsT0FBTyxFQUFFQyxNQUFNLEVBQUVDLFlBQVksRUFBSztFQUN0RSxJQUFJRixPQUFPLENBQUNHLE9BQU8sS0FBSyxpQkFBaUIsRUFBRTtJQUN6QyxJQUFRQyxLQUFLLEdBQUtKLE9BQU8sQ0FBakJJLEtBQUs7SUFDYlIsTUFBTSxDQUFDUyxVQUFVLENBQUNDLFdBQVcsQ0FBQ1AsV0FBVyxDQUN2QyxVQUFDUSxPQUFPLEVBQUs7TUFDWCxJQUFJQSxPQUFPLENBQUNILEtBQUssS0FBS0EsS0FBSyxFQUFFO1FBQzNCLElBQU1JLE9BQU8sR0FBR0QsT0FBTyxDQUFDRSxlQUFlO1FBQ3ZDLElBQU1DLGtCQUFrQixHQUFHRixPQUFPLENBQUNHLElBQUksQ0FDckMsVUFBQ0MsTUFBTTtVQUFBLE9BQUtBLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxLQUFLLGdCQUFnQjtRQUFBLENBQzVELENBQUM7UUFFRCxJQUFJSixrQkFBa0IsRUFBRTtVQUN0QixJQUFNSyxZQUFZLEdBQUdDLFFBQVEsQ0FBQ04sa0JBQWtCLENBQUNPLEtBQUssRUFBRSxFQUFFLENBQUM7VUFDM0RyQixNQUFNLENBQUNDLE9BQU8sQ0FBQ3FCLFdBQVcsQ0FBQztZQUFFSCxZQUFZLEVBQVpBO1VBQWEsQ0FBQyxDQUFDO1FBQzlDO01BQ0Y7SUFDRixDQUFDLEVBQ0Q7TUFBRUksSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDO01BQUVmLEtBQUssRUFBTEE7SUFBTSxDQUFDLEVBQy9CLENBQUMsaUJBQWlCLENBQ3BCLENBQUM7RUFDSDtFQUVBLE9BQU8sSUFBSTtBQUNiLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3VzdGFpbmFiaWxpdHktY2FsY3VsYXRvci8uL3NyYy9iYWNrZ3JvdW5kLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09IFwiZ2V0VHJhbnNmZXJTaXplXCIpIHtcbiAgICBjb25zdCB7IHRhYklkIH0gPSBtZXNzYWdlO1xuICAgIGNocm9tZS53ZWJSZXF1ZXN0Lm9uQ29tcGxldGVkLmFkZExpc3RlbmVyKFxuICAgICAgKGRldGFpbHMpID0+IHtcbiAgICAgICAgaWYgKGRldGFpbHMudGFiSWQgPT09IHRhYklkKSB7XG4gICAgICAgICAgY29uc3QgaGVhZGVycyA9IGRldGFpbHMucmVzcG9uc2VIZWFkZXJzO1xuICAgICAgICAgIGNvbnN0IHRyYW5zZmVyU2l6ZUhlYWRlciA9IGhlYWRlcnMuZmluZChcbiAgICAgICAgICAgIChoZWFkZXIpID0+IGhlYWRlci5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiY29udGVudC1sZW5ndGhcIlxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAodHJhbnNmZXJTaXplSGVhZGVyKSB7XG4gICAgICAgICAgICBjb25zdCB0cmFuc2ZlclNpemUgPSBwYXJzZUludCh0cmFuc2ZlclNpemVIZWFkZXIudmFsdWUsIDEwKTtcbiAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHJhbnNmZXJTaXplIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHsgdXJsczogW1wiPGFsbF91cmxzPlwiXSwgdGFiSWQgfSxcbiAgICAgIFtcInJlc3BvbnNlSGVhZGVyc1wiXVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn0pO1xuIl0sIm5hbWVzIjpbImNocm9tZSIsInJ1bnRpbWUiLCJvbk1lc3NhZ2UiLCJhZGRMaXN0ZW5lciIsIm1lc3NhZ2UiLCJzZW5kZXIiLCJzZW5kUmVzcG9uc2UiLCJjb21tYW5kIiwidGFiSWQiLCJ3ZWJSZXF1ZXN0Iiwib25Db21wbGV0ZWQiLCJkZXRhaWxzIiwiaGVhZGVycyIsInJlc3BvbnNlSGVhZGVycyIsInRyYW5zZmVyU2l6ZUhlYWRlciIsImZpbmQiLCJoZWFkZXIiLCJuYW1lIiwidG9Mb3dlckNhc2UiLCJ0cmFuc2ZlclNpemUiLCJwYXJzZUludCIsInZhbHVlIiwic2VuZE1lc3NhZ2UiLCJ1cmxzIl0sInNvdXJjZVJvb3QiOiIifQ==