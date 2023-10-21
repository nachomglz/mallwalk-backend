

const postMessage = async (req, res) => {
  try {
    const { message, deviceId } = req.body;

    if (!message) {
      throw new Error({ code: 400, message: "no messages provided" });
    }

    if (!deviceId) {
      throw new Error({ code: 400, message: "no deviceId provided" });
    }

    let tokenCount = 0;

    message.forEach((msg) => {
      const tokens = getTokens(msg.content);
      tokenCount += tokens;
    });

    const moderationRes = await fetch("https://api.openai.com/v1/moderations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify({
        input: message[message.length - 1].content,
      }),
    });

    const moderationData = await moderationRes.json();

    console.log(moderationData);
    const [results] = moderationData.results;

    if (results.flagged) {
      throw new Error({
        code: 433,
        message: "Por favor no uses palabras ofensivas",
      });
    }

    const { processed_data } = processStoreData(storesData);
    tokenCount += getTokens(processed_data);

    // if (tokenCount >= 4000) {
    //   throw new Error("Query too large");
    // }

    const messages = [{ role: "system", content: processed_data }, ...message];

    const chatRequestOpts = {
      model: OPENAI_CHAT_MODEL,
      messages,
      temperature: OPENAI_TEMPERATURE,
    };

    const chatResponse = await OpenAI.createChatCompletion(chatRequestOpts);

    const data = chatResponse.data.choices[0];

    return res.json({ data });
  } catch (err) {
    const { code = 500, message = "Unexpected Error" } = error;
    res.status(code).json({ code, message });
  }
};

module.exports = {
  postMessage,
};
