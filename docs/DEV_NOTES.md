# Setup

- Referred https://facebook.github.io/react-native/docs/getting-started

```
$ npx react-native init JohnnyClientRn --template typescript
$ cd ./JohnnyClientRn
$ npm install
$ npx react-native run-android
```

- Update `watchman` to the latest version (`$ brew upgrade watchman`), otherwise metro server accidentary crashes.

## Enable typescript

- Referred https://facebook.github.io/react-native/docs/typescript
- May need to change file name from `App.js` to `App.tsx`
- If build error happens, you may solve it by copying `App.tsx` from [template repository](https://github.com/react-native-community/react-native-template-typescript)

## Enable firebase

### iOS

- Before building app, copy `Config/GoogleService-Info-XXX.plist` to `GoogleService-Info.plist`

## Protobuf

## Twitter login

- Using https://github.com/GoldenOwlAsia/react-native-twitter-signin
- NOTE : for iOS, `twitterkit-<AuthToken>://` has to be set as callback URL (see [the screen shot in README.md](https://raw.githubusercontent.com/GoldenOwlAsia/react-native-twitter-signin/master/Example/img/callbacks.png))
