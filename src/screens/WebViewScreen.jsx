import { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { getAuthObject } from "../utils/HelperFun";

export default function WebViewScreen() {
  const DASHBOARD_URL = "https://nexus.techchefz.com/";
  const LOGIN_URL = "https://nexus-uat.techchefz.com/auth/login";

  const webViewRef = useRef(null);

  const [url, setUrl] = useState(LOGIN_URL);
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState(null);

  console.log("Component Rendered");
  console.log("Current URL:", url);
  console.log("Current Tokens:", tokens);

  //load authData
  useEffect(() => {
    console.log("useEffect triggered");

    const loadData = async () => {
      console.log("Loading auth data from storage...");

      const auth = await getAuthObject();
      console.log("Auth object received:", auth);

      if (auth?.authToken && auth?.refreshToken) {
        console.log("Tokens found, user already logged in");

        const tokenObj = {
          accessToken: auth.authToken,
          refreshToken: auth.refreshToken,
          visitorID: auth.deviceId,
          guid: auth.guid,
        };

        console.log("Setting tokens:", tokenObj);
        setTokens(tokenObj);

        console.log("Redirecting to DASHBOARD");
        setUrl(DASHBOARD_URL);
      } else {
        console.log("No tokens found, redirecting to LOGIN");
        setUrl(LOGIN_URL);
      }

      console.log("Loading finished");
      setLoading(false);
    };

    loadData();
  }, []);

  ////Bridge function
  const injectedJavaScript = `
    console.log("Bridge function injected");

    window.getAuthTokens = function () {
      console.log("Web requested tokens");

      window.ReactNativeWebView.postMessage("GET_TOKENS");

      return new Promise((resolve) => {
        window._resolveTokens = resolve;
      });
    };
    true;
  `;

  ////send token to web app
  const handleMessage = (event) => {
    console.log("Message received from WebView:", event.nativeEvent.data);

    if (!tokens) {
      console.log("Tokens not ready yet");
      return;
    }

    console.log("Sending tokens to Web");

    const script = `
      console.log("Tokens received in Web");
      if (window._resolveTokens) {
        window._resolveTokens(${JSON.stringify(tokens)});
        window._resolveTokens = null;
      }
      true;
    `;

    webViewRef.current?.injectJavaScript(script);
  };

  //loader
  if (loading) {
    console.log("Showing loader");
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0A58CA" />
      </View>
    );
  }

  //WebView
  console.log("Loading WebView with URL:", url);

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: url }}
      javaScriptEnabled
      injectedJavaScript={injectedJavaScript}
      onMessage={handleMessage}
      startInLoadingState
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
