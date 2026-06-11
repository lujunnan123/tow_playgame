import cloudbaseSDK from "@cloudbase/js-sdk";

export const cloudbase = cloudbaseSDK.init({
  env: import.meta.env.VITE_CLOUDBASE_ENV_ID,
  region: import.meta.env.VITE_CLOUDBASE_REGION,
  accessKey: import.meta.env.VITE_CLOUDBASE_ACCESS_KEY
});


// 匿名登录（本地调试必备，控制台要开启匿名登录）
cloudbase.auth().anonymousAuthProvider().signIn()

export default cloudbase