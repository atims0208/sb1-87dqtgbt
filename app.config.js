export default {
  expo: {
    name: "SoapBox Beta",
    slug: "soapboxbeta",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.soapbox.beta"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.soapbox.beta"
    },
    plugins: [
      [
        "expo-image-picker",
        {
          "photosPermission": "Allow SoapBox to access your photos for sharing content.",
          "cameraPermission": "Allow SoapBox to access your camera for live streaming."
        }
      ],
      [
        "expo-camera",
        {
          "cameraPermission": "Allow SoapBox to access your camera for live streaming."
        }
      ]
    ],
    extra: {
      firebaseConfig: {
        apiKey: "AIzaSyCbSYTwq7JXhfdan0VoO8OlCIdB4KuLqyU",
        authDomain: "soap-box-test-japvwo.firebaseapp.com",
        projectId: "soap-box-test-japvwo",
        storageBucket: "soap-box-test-japvwo.firebasestorage.app",
        messagingSenderId: "837553183336",
        appId: "1:837553183336:web:d956b98dd92012239bb9dd"
      },
      agoraAppId: "35b78db1f89a44458a76570e6d319161"
    }
  }
}