# WeatherApp

To achieve the purpose of creating *clean and reusable*(maintainable) code i decided to apply the next points:
- Abstractions Between Application Layers,
- Unidirectional Data Flow,
- Reactive State Management,
- Modular Design,
- Smart And Dumb Components Pattern.

I have used the next layers: 
- **Presentation layer**
It presents the UI and delegates user's actions to the core layer, through the abstraction layer. 

- **Abstraction layer**
It exposes the streams of state in the presentation layer(components), playing the role of the *facade*.

- **Core layer**
It responsible for data manipulation and outside world communication

![](https://sketch.io/render/sk-a5399ba1b3188a6f088d25a46776a6b4.jpeg)

### State management
For state management, I could use NgRx, @ngrx/component-store, or NGXS. But for such a tiny project(and to make the development a bit faster) I decided to use a custom implementation of the store, based on BehaviorSubject. 
Basic requirements were:
- define a state interface and set the initial state
- update state
- select state (selected stated should be returned as an Observable)

*The abstraction layer makes all components independent of the state management solution. So, if the project becomes very big and complex it'll be easy to replace the solution.*

### Loading data into smart components
For loading data, I could use Angular resolvers.
As official documentation says: "A data provider class can be used with the router to resolve data during navigation. The router waits for the data to be resolved before the route is finally activated."
It means that the page won't be shown before the data is loaded. That is not what I want.
I decided to load data with the help of guards because of a couple of reasons:
1) it is easy to reuse and combine guards
2) I could redirect to the aimed page and show default data or preloader, so it'll look like more naturally for the user.
3) I need to cache data and load it only once because free APIs have restrictions for calls per minute.


### Testing
I've decided to use Jest+Spectator for unit testing instead of Jest+Karma.
The main reasons were:
Jest is an all-in-one testing framework, it's fast, does not require a browser.
Spectator reduces boilerplate required to set up an Angular test suite.

### Modular design

![](https://sketch.io/render/sk-08b490657328b5a06e18ea25a0a645cc.jpeg)

### Module directory structure

![](http://dl4.joxi.net/drive/2020/10/22/0028/0728/1864408/08/f3a9ff4381.jpg)



## Installation

### NPM
`npm install`

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests 
