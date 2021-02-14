export let locale = "es";

if (process.browser && navigator.language) {
  const userLang = navigator.language;

  if (!userLang.startsWith("es")) {
    if (userLang.startsWith("en")) locale = "en";
    else if (userLang.startsWith("ca")) locale = "ca";
  }
}
