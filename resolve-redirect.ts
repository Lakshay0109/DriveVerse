import https from 'https';

const getRedirectUrl = (url: string) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.headers.location);
    }).on('error', console.error);
  });
};

const run = async () => {
    const urls = [
      "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGjeYCyPB5fuAkcpO9SK2wFxGVSmKBnErZOP1RIZI8LzdSQwh2B8Iq182jk65c5aoCMyp2YgCO4jKI_pi-bUth9IBev0s-ZjdW-qZfjfnlK4MUArdjppoUkr2HKcw_2hlp9TwGpxZTuhw=="
    ];
    for (const url of urls) {
        console.log(await getRedirectUrl(url));
    }
}
run();
