const setRemoteData = async () => {
  try {
    console.log(`Fetching image from: ${picPath}`);
    let res = await axios.get(picPath, {
      responseType: "arraybuffer",
    });
    console.log(`Image fetched successfully`);
    const pic = res.data;

    let markup = "";
    if (msgPath) {
      const article = msgPath.split("/").pop();
      console.log(`Fetching content from: https://api.telegra.ph/getPage/${article}?return_content=true`);
      res = await axios.get(
        `https://api.telegra.ph/getPage/${article}?return_content=true`
      );
      const { content } = res.data.result;
      markup = content.reduce(
        (string, node) => string + generateMarkupRemote(node),
        ""
      );
      console.log(`Content fetched and markup generated`);
    }

    await setPic(pic);
    genIndex(markup);
  } catch (e) {
    console.error('Error:', e.message);
    throw new Error(e.message);
  }
};
