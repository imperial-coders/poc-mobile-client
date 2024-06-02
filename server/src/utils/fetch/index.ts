export const get = async ({ url }: { url: string }) => {
  try {
    const result = await fetch(url, {
      method: "GET",
    });
    return await result.json();
  } catch (err) {
    console.error(`Fetch error - ${err}`);
  }
};

export const post = async ({ url, body }: { url: string; body: any }) => {
  try {
    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return await result.json();
  } catch (err) {
    console.error(`${err}`);
  }
};
