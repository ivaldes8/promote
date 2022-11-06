import { boot } from "quasar/wrappers";

export default boot(async ({ app }) => {
  app.config.globalProperties.$filters = {
    max25(value) {
      if (value) {
        if (value.length > 25) {
          let result = "";

          for (let i = 0; i < value.length; i++) {
            if (i < 25) {
              result = result + value[i];
            }
          }
          return result + " ...";
        } else {
          return value;
        }
      }
    },
  };
});
